'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  type ReactNode,
} from 'react';
import { useRouter, type AppLocale } from '@/i18n/routing';

import type homeEs from '../../../content/home/es.json';

export type HomeContent = typeof homeEs;

type HomeContentContextValue = {
  locale: AppLocale;
  content: HomeContent;
  setLocale: (next: AppLocale) => void;
  t: (template: string, vars?: Record<string, string | number>) => string;
};

const HomeContentContext = createContext<HomeContentContextValue | null>(null);

export function formatTemplate(
  template: string,
  vars: Record<string, string | number> = {},
) {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key: string) =>
    vars[key] != null ? String(vars[key]) : '',
  );
}

type ProviderProps = {
  locale: AppLocale;
  content: HomeContent;
  children: ReactNode;
};

/**
 * Provides the legacy home content JSON to client sections.
 * Language switching navigates to the sibling /es|/en URL (SEO-safe).
 */
export function HomeContentProvider({
  locale,
  content,
  children,
}: ProviderProps) {
  const router = useRouter();

  const setLocale = useCallback(
    (next: AppLocale) => {
      if (next === locale) return;
      // Locale switch always lands on the localized home — matches SPA UX.
      router.replace('/', { locale: next });
    },
    [locale, router],
  );

  const t = useCallback(
    (template: string, vars?: Record<string, string | number>) =>
      formatTemplate(template, vars),
    [],
  );

  const value = useMemo(
    () => ({ locale, content, setLocale, t }),
    [locale, content, setLocale, t],
  );

  return (
    <HomeContentContext.Provider value={value}>
      {children}
    </HomeContentContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(HomeContentContext);
  if (!context) {
    throw new Error('useI18n must be used within HomeContentProvider');
  }
  return context;
}
