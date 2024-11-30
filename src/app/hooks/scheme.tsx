import { useEffect, useState } from "react";

export enum Themes {
  Bear = 'Bear',
  Northface = 'Northface',
  Grand = 'Grand',
  Zion = 'Zion',
  Millcreek = 'Millcreek',
  Timp = 'Timp'
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
  const [isDark, setIsDark] = useState<any>(window.matchMedia('(prefers-color-scheme: dark)').matches);

  useEffect(() => {
    document.documentElement.setAttribute('data-scheme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return { isDark, setIsDark };
}

export function useTheme() {
  const [theme, setTheme] = useState<Themes>(Themes.Bear);

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
