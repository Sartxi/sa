import { useEffect, useState } from "react";
import { Blends, Themes, useBlendScheme, useColorScheme } from "../hooks/scheme";
import { useMedia } from "../hooks/viewport";
import Image from "next/image";

enum SiteThemes {
  Themes,
  Blends
}

interface ThemeMenuProps {
  open: boolean;
  setOpen: any;
  refresh: any;
  theme?: Themes;
  setTheme?: any;
}

interface ThemeSelectorProps {
  type: string;
  open: boolean;
  theme: any;
  setTheme: any;
  items: Selections[];
}

interface Selections {
  key: string;
  item: string;
}

function SchemesTool() {
  const { isDark, setIsDark } = useColorScheme();
  return (
    <Image
      src={`/${isDark ? 'dark' : 'light'}mode.svg`}
      className="scheme-toggle"
      alt="icon"
      width={45}
      height={22}
      priority
      onClick={() => setIsDark(!isDark)}
    />
  )
}

function ThemeSelector({ type, open, theme, setTheme, items }: ThemeSelectorProps) {
  return (
    <div className={`theme-selector ${type}`}>
      {open && items.map(({ key, item }: Selections) => {
        const selected = key === theme;
        return (
          <span
            key={key}
            className={`theme-item ${selected ? 'selected' : ''}`}
            onClick={() => setTheme(key)}>
            <span className="indicator">•</span>
            <span className={`color ${type}-${item}`} />
          </span>
        )
      })}
    </div>
  )
}

function ThemesTool({ open, setOpen, refresh, theme, setTheme }: ThemeMenuProps) {
  const themes: Selections[] = Object.keys(Themes).map((item) => {
    const key = Themes[item as keyof typeof Themes];
    return { key, item };
  });

  const set = (key: any) => {
    setTheme(key);
    refresh();
  }

  return (
    <span id="ThemeSelector">
      <ThemeSelector
        type="theme"
        open={open}
        theme={theme}
        setTheme={set}
        items={themes} />
      <span
        onClick={() => setOpen()}
        className={`label ${open ? 'open' : ''}`}>
        {'<Themes />'}
      </span>
    </span>
  )
}

function BlendsTool({ open, setOpen }: ThemeMenuProps) {
  const { blend, setBlend } = useBlendScheme();

  const blends: Selections[] = Object.keys(Blends).map((item) => {
    const key = Blends[item as keyof typeof Blends];
    return { key, item };
  });

  return (
    <span id="BlendSelector">
      <ThemeSelector
        type="blend"
        open={open}
        theme={blend}
        setTheme={setBlend}
        items={blends} />
      <span
        onClick={() => setOpen()}
        className={`label ${open ? 'open' : ''}`}>
        {'<Blends />'}
      </span>
    </span>
  );
}

export function Theme({ refresh, theme, setTheme }: { refresh: any, theme: any, setTheme: any }) {
  const [open, setOpen] = useState<number | undefined>();
  const { mobile } = useMedia();

  useEffect(() => {
    const onScroll = () => open && setOpen(undefined);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleOpen = (item: SiteThemes) => {
    if (item === open) setOpen(undefined);
    else setOpen(item);
  }

  if (mobile) return <span />;

  return (
    <div id="Themes">
      <SchemesTool />
      <ThemesTool
        theme={theme}
        setTheme={setTheme}
        open={open === SiteThemes.Themes}
        setOpen={() => toggleOpen(SiteThemes.Themes)}
        refresh={refresh} />
      <BlendsTool
        open={open === SiteThemes.Blends}
        setOpen={() => toggleOpen(SiteThemes.Blends)}
        refresh={refresh} />
    </div>
  )
}
