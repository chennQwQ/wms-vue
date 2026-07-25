const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.bmp', '.svg'];

export function isPreviewableImageUrl(url?: string): boolean {
  if (!url) {
    return false;
  }
  const cleanUrl = url.split(/[?#]/)[0].toLowerCase();
  return IMAGE_EXTENSIONS.some((extension) => cleanUrl.endsWith(extension));
}
