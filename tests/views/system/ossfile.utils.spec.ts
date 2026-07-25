import { isPreviewableImageUrl } from '../../../src/views/system/ossfile/ossfile.utils';

describe('ossfile preview helpers', () => {
  it('detects image urls before query strings', () => {
    expect(isPreviewableImageUrl('http://121.40.127.13:9000/wms/splash.png?token=abc')).toBe(true);
  });

  it('does not treat document urls as images', () => {
    expect(isPreviewableImageUrl('http://121.40.127.13:9000/wms/report.pdf')).toBe(false);
  });
});
