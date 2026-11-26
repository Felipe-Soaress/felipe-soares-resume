import { describe, expect, it } from 'vitest';
import { resolveAssetUrl } from './assets';

describe('resolveAssetUrl', () => {
  it('joins asset paths cleanly against root base', () => {
    expect(resolveAssetUrl('felipe-soares-resume-en.pdf', '/')).toBe('/felipe-soares-resume-en.pdf');
    expect(resolveAssetUrl('/felipe-soares-resume-en.pdf', '/')).toBe('/felipe-soares-resume-en.pdf');
  });

  it('preserves GitHub Pages subpath without double slashes', () => {
    expect(resolveAssetUrl('/felipe-soares-resume-en.pdf', '/felipe-soares-resume/')).toBe(
      '/felipe-soares-resume/felipe-soares-resume-en.pdf',
    );
    expect(resolveAssetUrl('images/demo.png', '/felipe-soares-resume')).toBe(
      '/felipe-soares-resume/images/demo.png',
    );
  });

  it('handles relative dot-slash base and preserves external URLs', () => {
    expect(resolveAssetUrl('og-image.png', './')).toBe('./og-image.png');
    expect(resolveAssetUrl('https://example.com/img.png', '/repo/')).toBe('https://example.com/img.png');
  });
});
