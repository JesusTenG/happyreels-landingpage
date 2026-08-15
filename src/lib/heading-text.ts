export function stripTrailingHeadingPeriod(text: string): string {
  return text.endsWith(".") ? text.slice(0, -1) : text;
}
