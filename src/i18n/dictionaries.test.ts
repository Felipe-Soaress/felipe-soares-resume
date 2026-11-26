import { describe, expect, it } from 'vitest';
import { enUS } from './en-US';
import { ptBR } from './pt-BR';
import { EXPERIENCE_ITEMS } from '../data/experience';
import { PROJECTS } from '../data/projects';
import { SKILL_CATEGORIES, SOFT_SKILL_IDS } from '../data/skills';

describe('i18n dictionaries', () => {
  it('cover all 4 roles and all 17 achievements in both locales', () => {
    expect(EXPERIENCE_ITEMS).toHaveLength(4);
    for (const dict of [enUS, ptBR]) {
      const totalBullets = EXPERIENCE_ITEMS.reduce(
        (sum, role) => sum + dict.experience.roles[role.id].achievements.length,
        0,
      );
      expect(totalBullets).toBe(17);
      expect(PROJECTS.every((p) => Boolean(dict.projects.items[p.id]?.title))).toBe(true);
    }
  });

  it('label every skill category and soft skill in both locales', () => {
    for (const dict of [enUS, ptBR]) {
      for (const category of SKILL_CATEGORIES) {
        expect(dict.skills.categories[category.id]).toBeTruthy();
      }
      for (const id of SOFT_SKILL_IDS) {
        expect(dict.skills.softSkills[id]).toBeTruthy();
      }
    }
  });

  it('features exactly 8 core skills', () => {
    const core = SKILL_CATEGORIES.find((c) => c.id === 'core');
    expect(core?.skills).toHaveLength(8);
  });
});
