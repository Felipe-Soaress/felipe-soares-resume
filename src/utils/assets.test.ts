import { describe, expect, it } from 'vitest';
import { isSafeExternalUrl, resolveAssetUrl } from './assets';

describe('resolveAssetUrl & isSafeExternalUrl', () => {
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

  it('handles relative dot-slash base and preserves allowlisted external URLs', () => {
    expect(resolveAssetUrl('og-image.png', './')).toBe('./og-image.png');
    expect(resolveAssetUrl('https://example.com/img.png', '/repo/')).toBe('https://example.com/img.png');
    expect(resolveAssetUrl('mailto:dev@example.com', '/repo/')).toBe('mailto:dev@example.com');
    expect(resolveAssetUrl('data:image/png;base64,abc', '/repo/')).toBe('data:image/png;base64,abc');
  });

  it('rejects unsafe URL schemes such as javascript:, vbscript:, data:text/html, and protocol-relative URLs', () => {
    for (const unsafe of [
      'javascript:alert(1)',
      '  JAVASCRIPT:alert(1)',
      'vbscript:msgbox(1)',
      'data:text/html,<script>alert(1)</script>',
      '//evil.example/payload.js',
    ]) {
      expect(isSafeExternalUrl(unsafe)).toBe(false);
      expect(resolveAssetUrl(unsafe, '/')).toBe('');
    }
    expect(isSafeExternalUrl('https://example.com')).toBe(true);
    expect(isSafeExternalUrl('mailto:dev@example.com')).toBe(true);
  });
});
