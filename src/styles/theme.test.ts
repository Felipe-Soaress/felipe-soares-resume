/// <reference types="node" />
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const themeCss = readFileSync(resolve(process.cwd(), 'src/styles/theme.css'), 'utf8');

function relativeLuminance(hex: string): number {
  const clean = hex.replace('#', '');
  const [r, g, b] = [0, 2, 4].map((i) => {
    const channel = parseInt(clean.slice(i, i + 2), 16) / 255;
    return channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrastRatio(hexA: string, hexB: string): number {
  const l1 = relativeLuminance(hexA);
  const l2 = relativeLuminance(hexB);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

describe('theme.css WCAG AA contrast and print tokens', () => {
  it('ensures dark primary gradient start stop meets WCAG AA (>= 4.5:1) against white text', () => {
    const darkBlock = themeCss.match(/:root,\s*\[data-theme='dark'\]\s*\{([\s\S]*?)\n\}/)?.[1] ?? '';
    const gradientLine = darkBlock.match(/--accent-gradient-strong:\s*([^;]+);/)?.[1] ?? '';
    const hexStops = gradientLine.match(/#[0-9a-fA-F]{6}/g) ?? [];
    expect(hexStops.length).toBeGreaterThanOrEqual(3);
    for (const stop of hexStops) {
      expect(contrastRatio('#ffffff', stop)).toBeGreaterThanOrEqual(4.5);
    }
  });

  it('defines a light status text token meeting WCAG AA (>= 4.5:1) on elevated and base light surfaces', () => {
    const lightBlock = themeCss.match(/\[data-theme='light'\]\s*\{([\s\S]*?)\n\}/)?.[1] ?? '';
    const statusTextHex = lightBlock.match(/--status-text:\s*(#[0-9a-fA-F]{6});/)?.[1];
    expect(statusTextHex).toBeDefined();
    expect(contrastRatio(statusTextHex!, '#ffffff')).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio(statusTextHex!, '#f8fafc')).toBeGreaterThanOrEqual(4.5);
  });

  it('overrides dark CSS text/surface tokens inside @media print so headings stay legible on white paper', () => {
    const printBlock = themeCss.match(/@media print\s*\{([\s\S]*)\}\s*$/)?.[1] ?? '';
    expect(printBlock).toContain('--text-primary:');
    expect(printBlock).toContain('--bg-elevated:');
  });
});
