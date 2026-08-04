export const INSTAGRAM_URL = "https://www.instagram.com/simon__saad/";
export const INSTAGRAM_HANDLE = "@simon__saad";

export const WHATSAPP_WA_ME_NUMBER = "4915757826315";
export const WHATSAPP_DISPLAY_NUMBER = "+49 1575 7826315";

export function buildWhatsAppUrl(
  number: string | null = WHATSAPP_WA_ME_NUMBER,
): string | null {
  if (!number) return null;
  return `https://wa.me/${number}`;
}

export const SITE_NAME = "HappyReels";
export const SITE_WORDMARK = "happyreels";
export const DEFAULT_OG_IMAGE_PATH = "/og/happyreels-og.png";
