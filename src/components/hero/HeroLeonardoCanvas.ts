type Point = Readonly<{ x: number; y: number }>;
type Line = Readonly<{ end: Point; start: Point }>;
type PlaneName = "ceiling" | "floor" | "left" | "right";

type WordSpec = Readonly<{
  height: number;
  horizontalFill?: number;
  id: string;
  plane: PlaneName;
  row: number;
  rows: number;
  text: string;
  verticalFill?: number;
  width: number;
}>;

type PlaneProjection = Readonly<{
  destination: readonly Point[];
  height: number;
  name: PlaneName;
  width: number;
}>;

type RenderTunnelOptions = Readonly<{
  backHeight: number;
  backWidth: number;
  canvases: readonly HTMLCanvasElement[];
  height: number;
  scope: HTMLElement;
  width: number;
}>;

export const HERO_LEONARDO_WORDS: readonly WordSpec[] = [
  { id: "happy", text: "HAPPYREELS", plane: "ceiling", row: 0, rows: 1, width: 2000, height: 300 },
  { id: "filming", text: "FILMING", plane: "left", row: 0, rows: 2, width: 1000, height: 300 },
  { id: "reels", text: "REELS", plane: "left", row: 1, rows: 2, width: 1000, height: 300 },
  { id: "edits", text: "EDITS", plane: "right", row: 0, rows: 2, width: 1000, height: 300 },
  { id: "cutting", text: "CUTTING", plane: "right", row: 1, rows: 2, width: 1000, height: 300 },
  { id: "content", text: "CONTENT", plane: "floor", row: 0, rows: 2, width: 1800, height: 300 },
  { id: "production", text: "PRODUCTION", plane: "floor", row: 1, rows: 2, width: 1800, height: 300 },
];

function solveHomography(source: readonly Point[], destination: readonly Point[]) {
  const rows: number[][] = [];

  for (let index = 0; index < 4; index += 1) {
    const { x: u, y: v } = source[index];
    const { x, y } = destination[index];

    rows.push([u, v, 1, 0, 0, 0, -x * u, -x * v, x]);
    rows.push([0, 0, 0, u, v, 1, -y * u, -y * v, y]);
  }

  for (let column = 0; column < 8; column += 1) {
    let pivot = column;

    for (let row = column + 1; row < 8; row += 1) {
      if (Math.abs(rows[row][column]) > Math.abs(rows[pivot][column])) pivot = row;
    }

    if (Math.abs(rows[pivot][column]) < 1e-9) return null;
    [rows[column], rows[pivot]] = [rows[pivot], rows[column]];

    const divisor = rows[column][column];
    for (let entry = column; entry < 9; entry += 1) rows[column][entry] /= divisor;

    for (let row = 0; row < 8; row += 1) {
      if (row === column) continue;
      const factor = rows[row][column];
      for (let entry = column; entry < 9; entry += 1) {
        rows[row][entry] -= factor * rows[column][entry];
      }
    }
  }

  return rows.map((row) => row[8]);
}

function projectPoint(matrix: readonly number[], point: Point): Point {
  const [a, b, c, d, e, f, g, h] = matrix;
  const denominator = g * point.x + h * point.y + 1;

  return {
    x: (a * point.x + b * point.y + c) / denominator,
    y: (d * point.x + e * point.y + f) / denominator,
  };
}

function intersectLines(first: Line, second: Line): Point | null {
  const firstX = first.end.x - first.start.x;
  const firstY = first.end.y - first.start.y;
  const secondX = second.end.x - second.start.x;
  const secondY = second.end.y - second.start.y;
  const divisor = firstX * secondY - firstY * secondX;

  if (Math.abs(divisor) < 1e-7) return null;

  const offsetX = second.start.x - first.start.x;
  const offsetY = second.start.y - first.start.y;
  const distance = (offsetX * secondY - offsetY * secondX) / divisor;

  return {
    x: first.start.x + firstX * distance,
    y: first.start.y + firstY * distance,
  };
}

function insetQuad(quad: readonly Point[], gaps: readonly number[]): readonly Point[] | null {
  const edges = quad.map((start, index): Line | null => {
    const end = quad[(index + 1) % quad.length];
    const length = Math.hypot(end.x - start.x, end.y - start.y);
    if (length < 1e-7) return null;

    const normalX = -(end.y - start.y) / length;
    const normalY = (end.x - start.x) / length;
    const gap = gaps[index] ?? 0;

    return {
      start: { x: start.x + normalX * gap, y: start.y + normalY * gap },
      end: { x: end.x + normalX * gap, y: end.y + normalY * gap },
    };
  });

  if (edges.some((edge) => edge === null)) return null;

  const inset = edges.map((edge, index) => {
    const previous = edges[(index + edges.length - 1) % edges.length];
    return edge && previous ? intersectLines(previous, edge) : null;
  });

  return inset.every((point) => point !== null) ? (inset as Point[]) : null;
}

function resolveCssColor(scope: HTMLElement, value: string) {
  const probe = document.createElement("span");
  probe.style.color = value;
  probe.style.position = "absolute";
  probe.style.visibility = "hidden";
  scope.appendChild(probe);
  const resolved = getComputedStyle(probe).color;
  probe.remove();
  return resolved;
}

function drawWordTexture(
  canvas: HTMLCanvasElement,
  spec: WordSpec,
  color: string,
  fontFamily: string,
  textureScale: number,
) {
  const measureCanvas = document.createElement("canvas");
  const measureContext = measureCanvas.getContext("2d");
  if (!measureContext) return false;

  const fontSize = 300;
  const letterSpacing = -0.115 * fontSize;
  const font = `900 ${fontSize}px ${fontFamily}`;
  measureContext.font = font;
  measureContext.textBaseline = "alphabetic";

  const glyphs = Array.from(spec.text).map((glyph) => ({
    glyph,
    metrics: measureContext.measureText(glyph),
  }));
  let cursor = 0;
  let left = Number.POSITIVE_INFINITY;
  let right = Number.NEGATIVE_INFINITY;
  let ascent = 0;
  let descent = 0;

  glyphs.forEach(({ metrics }, index) => {
    left = Math.min(left, cursor - metrics.actualBoundingBoxLeft);
    right = Math.max(right, cursor + metrics.actualBoundingBoxRight);
    ascent = Math.max(ascent, metrics.actualBoundingBoxAscent);
    descent = Math.max(descent, metrics.actualBoundingBoxDescent);
    cursor += metrics.width + (index < glyphs.length - 1 ? letterSpacing : 0);
  });

  const naturalWidth = Math.max(1, right - left);
  const naturalHeight = Math.max(1, ascent + descent);
  const horizontalFill = spec.horizontalFill ?? 0.98;
  const verticalFill = spec.verticalFill ?? 0.98;

  canvas.width = Math.ceil(spec.width * textureScale);
  canvas.height = Math.ceil(spec.height * textureScale);
  canvas.style.width = `${spec.width}px`;
  canvas.style.height = `${spec.height}px`;

  const context = canvas.getContext("2d");
  if (!context) return false;

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.setTransform(textureScale, 0, 0, textureScale, 0, 0);
  context.translate(
    ((1 - horizontalFill) * spec.width) / 2,
    ((1 - verticalFill) * spec.height) / 2,
  );
  context.scale(
    (spec.width * horizontalFill) / naturalWidth,
    (spec.height * verticalFill) / naturalHeight,
  );
  context.font = font;
  context.textBaseline = "alphabetic";
  context.fillStyle = color;

  cursor = 0;
  glyphs.forEach(({ glyph, metrics }, index) => {
    context.fillText(glyph, cursor - left, ascent);
    cursor += metrics.width + (index < glyphs.length - 1 ? letterSpacing : 0);
  });

  return true;
}

function toCssMatrix3d(matrix: readonly number[]) {
  const [a, b, c, d, e, f, g, h] = matrix;
  return `matrix3d(${a}, ${d}, 0, ${g}, ${b}, ${e}, 0, ${h}, 0, 0, 1, 0, ${c}, ${f}, 0, 1)`;
}

export function renderTunnelCanvas({
  backHeight,
  backWidth,
  canvases,
  height,
  scope,
  width,
}: RenderTunnelOptions) {
  if (
    !width ||
    !height ||
    !backWidth ||
    !backHeight ||
    canvases.length !== HERO_LEONARDO_WORDS.length
  ) {
    return false;
  }

  const back = {
    left: (width - backWidth) / 2,
    top: (height - backHeight) / 2,
    right: (width + backWidth) / 2,
    bottom: (height + backHeight) / 2,
  };
  const planes: readonly PlaneProjection[] = [
    {
      name: "ceiling",
      width: 2000,
      height: 300,
      destination: [
        { x: 0, y: 0 },
        { x: width, y: 0 },
        { x: back.right, y: back.top },
        { x: back.left, y: back.top },
      ],
    },
    {
      name: "left",
      width: 1000,
      height: 600,
      destination: [
        { x: 0, y: 0 },
        { x: back.left, y: back.top },
        { x: back.left, y: back.bottom },
        { x: 0, y: height },
      ],
    },
    {
      name: "right",
      width: 1000,
      height: 600,
      destination: [
        { x: back.right, y: back.top },
        { x: width, y: 0 },
        { x: width, y: height },
        { x: back.right, y: back.bottom },
      ],
    },
    {
      name: "floor",
      width: 1800,
      height: 600,
      destination: [
        { x: back.left, y: back.bottom },
        { x: back.right, y: back.bottom },
        { x: width, y: height },
        { x: 0, y: height },
      ],
    },
  ];
  const textureScale = Math.min(1.5, Math.max(1, window.devicePixelRatio));
  const fontFamily = getComputedStyle(scope).fontFamily;
  const goldColor = resolveCssColor(scope, "var(--leo-gold)");

  return HERO_LEONARDO_WORDS.every((word, index) => {
    const canvas = canvases[index];
    const plane = planes.find((candidate) => candidate.name === word.plane);
    if (!canvas || !plane) return false;

    canvas.hidden = false;
    const planeSource = [
      { x: 0, y: 0 },
      { x: plane.width, y: 0 },
      { x: plane.width, y: plane.height },
      { x: 0, y: plane.height },
    ];
    const planeMatrix = solveHomography(planeSource, plane.destination);
    if (!planeMatrix) return false;

    const rowStart = (word.row / word.rows) * plane.height;
    const rowEnd = ((word.row + 1) / word.rows) * plane.height;
    const rowQuad = [
      projectPoint(planeMatrix, { x: 0, y: rowStart }),
      projectPoint(planeMatrix, { x: plane.width, y: rowStart }),
      projectPoint(planeMatrix, { x: plane.width, y: rowEnd }),
      projectPoint(planeMatrix, { x: 0, y: rowEnd }),
    ];
    const destination = insetQuad(rowQuad, [word.plane === "ceiling" ? 84 : 0, 10, 0, 10]);
    if (!destination) return false;

    const source = [
      { x: 0, y: 0 },
      { x: word.width, y: 0 },
      { x: word.width, y: word.height },
      { x: 0, y: word.height },
    ];
    const wordMatrix = solveHomography(source, destination);
    if (!wordMatrix) return false;

    const rendered = drawWordTexture(
      canvas,
      word,
      goldColor,
      fontFamily,
      textureScale,
    );
    if (!rendered) return false;

    canvas.style.transform = toCssMatrix3d(wordMatrix);
    canvas.dataset.word = word.id;
    return true;
  });
}
