import type { Locale } from '../i18n/types';

export interface ResumePdf {
  /** File name inside `public/`, resolved with resolveAssetUrl(). */
  file: string;
  /** Name suggested to the browser when downloading. */
  downloadName: string;
}

export const PROFILE = {
  name: 'Felipe Soares',
  fullName: 'Felipe Soares da Silva',
  email: 'felipe.2013@alunos.utfpr.edu.br',
  linkedin: 'https://www.linkedin.com/in/felipe-soares-dev/',
  github: 'https://github.com/Felipe-Soaress',
  experienceYears: 8,
  commitsCount: 2500,
  reposCount: 30,
  /**
   * To add a Portuguese CV later: drop the PDF in `public/` and point 'pt-BR' at it.
   */
  resumePdf: {
    'en-US': { file: 'felipe-soares-resume-en.pdf', downloadName: 'Felipe-Soares-Resume.pdf' },
    'pt-BR': { file: 'felipe-soares-resume-en.pdf', downloadName: 'Felipe-Soares-Resume.pdf' },
  } satisfies Record<Locale, ResumePdf>,
} as const;
