import { buildPreviewImageUrl } from '../../../src/views/goods/fileUrl.utils';

describe('goods file url helpers', () => {
  it('keeps absolute image urls unchanged', () => {
    expect(buildPreviewImageUrl('http://121.40.127.13:9000/wms/splash.png', 'https://preview.example.com')).toBe(
      'http://121.40.127.13:9000/wms/splash.png'
    );
  });

  it('prefixes relative image paths with the configured base url', () => {
    expect(buildPreviewImageUrl('/upload/test/logo.png', 'https://api.example.com')).toBe('https://api.example.com/upload/test/logo.png');
  });
});
