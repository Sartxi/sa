import { useEffect, useState } from "react";
import { PageSections } from "../elements/header";

export enum Themes {
  bear = 'bear',
  northface = 'northface',
  grand = 'grand',
  zion = 'zion',
  millcreek = 'millcreek',
  timp = 'timp'
}

export enum Blends {
  difference = 'diff',
  color = 'color',
  dodge = 'dodge',
  soft = 'soft',
  hard = 'hard',
  multiply = 'multiply'
}

export function useColorScheme() {
  const [isDark, setIsDark] = useState<any>();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-scheme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return { isDark, setIsDark };
}

export function useTheme() {
  const [theme, setTheme] = useState<Themes>(Themes.bear);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return { theme, setTheme };
}

export function useBlendScheme() {
  const [blend, setBlend] = useState<Blends>(Blends.difference);

  useEffect(() => {
    document.documentElement.setAttribute('data-blend', blend);
  }, [blend]);

  return { blend, setBlend };
}

export function useSectionIcon(section: PageSections) {
  switch (section) {
    case PageSections.About:
      return '/about.svg';
    case PageSections.Work:
      return '/work.svg';
    case PageSections.Skills:
      return '/skills.svg';
    case PageSections.Contact:
      return '/contact.svg';
    default:
      return '/element.svg';
  }
}
