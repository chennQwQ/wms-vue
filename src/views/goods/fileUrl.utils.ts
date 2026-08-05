export function isAbsoluteUrl(url?: string): boolean {
  return /^https?:\/\//i.test(url || '');
}

export function buildPreviewImageUrl(url?: string, baseUrl = ''): string {
  if (!url) {
    return '';
  }
  if (isAbsoluteUrl(url)) {
    return url;
  }
  if (!baseUrl) {
    return url;
  }
  return `${baseUrl.replace(/\/$/, '')}/${url.replace(/^\//, '')}`;
}
