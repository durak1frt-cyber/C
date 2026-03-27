import 'server-only';
import type { Dictionary } from './types';

const dictionaries: Record<string, () => Promise<Dictionary>> = {
  en: () => import('./dictionaries/en.json').then((m) => m.default as Dictionary),
};

export const getDictionary = async (lang: string): Promise<Dictionary> => {
  const loader = dictionaries[lang] ?? dictionaries['en'];
  return loader();
};
