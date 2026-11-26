import { enUS } from './en-US';
import { ptBR } from './pt-BR';
import type { Locale, TranslationDictionary } from './types';

export const DICTIONARIES: Record<Locale, TranslationDictionary> = {
  'en-US': enUS,
  'pt-BR': ptBR,
};
