import { useCallback, useEffect, useState } from 'react';

const THEME_KEY = 'paola-theme';
const THEME_COLORS = {
  light: '#faf7f5',
  dark: '#12100f',
};

function getStoredTheme() {
  if (typeof window === 'undefined') {
    return 'light';
  }

  const stored = localStorage.getItem(THEME_KEY);
  return stored === 'dark' ? 'dark' : 'light';
}

function applyTheme(theme, animate = false) {
  const resolved = theme === 'dark' ? 'dark' : 'light';
  const root = document.documentElement;

  if (animate) {
    root.classList.add('theme-transition');
    window.setTimeout(() => root.classList.remove('theme-transition'), 300);
  }

  root.dataset.theme = resolved;
  root.style.colorScheme = resolved;

  const metaTheme = document.querySelector('meta[name="theme-color"]');
  if (metaTheme) {
    metaTheme.setAttribute('content', THEME_COLORS[resolved]);
  }

  localStorage.setItem(THEME_KEY, resolved);
  return resolved;
}

export function useTheme() {
  const [theme, setThemeState] = useState(getStoredTheme);

  useEffect(() => {
    const resolved = applyTheme(getStoredTheme());
    setThemeState(resolved);
  }, []);

  const setTheme = useCallback((nextTheme) => {
    const resolved = applyTheme(nextTheme, true);
    setThemeState(resolved);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [setTheme, theme]);

  return {
    theme,
    isDark: theme === 'dark',
    setTheme,
    toggleTheme,
  };
}
