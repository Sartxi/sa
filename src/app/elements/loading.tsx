import { useEffect, useState } from "react";
import { Themes } from "../hooks/scheme";

function getRandom(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function useRandomTheme(setTheme: any) {
  const themes = Object.keys(Themes).map((theme: string) => Themes[theme as keyof typeof Themes]);
  return (finish: any) => {
    const randoms = setInterval(() => setTheme(themes[getRandom(1, themes.length) - 1]), 700);
    setTimeout(() => {
      clearInterval(randoms);
      finish(true);
    }, 2000);
  };
}

export function Loading({ complete, refresh, setTheme }: { complete: any; refresh: any, setTheme: any }) {
  const [phases] = useState([
    { loader: 'contents', progress: 'content', text: 'Loading Content' },
    { loader: 'layers', progress: 'theme', text: 'Randomizing Theme' },
  ]);

  const [active, setActive] = useState('content');
  const setRandomTheme = useRandomTheme(setTheme);

  useEffect(() => {
    switch (active) {
      case 'theme':
        const hadRandom = document.documentElement.getAttribute('data-random-theme');
        if (!hadRandom) {
          setRandomTheme(() => {
            document.documentElement.setAttribute('data-random-theme', 'true');
            complete(true);
            refresh();
          });
        } else complete(true);
        break;
      default:
        setTimeout(() => setActive('theme'), 1000);
        break;
    }
  }, [active]);

  return (
    <div className="loading-screen">
      {phases.map(({ progress, loader, text }) => {
        return (
          <div key={progress} className={`loading-pod${active === progress ? ' active' : ''}`}>
            <div className="loader-wrapper">
              <span className={`loader ${loader}`}></span>
            </div>
            {text}
          </div>
        )
      })}
    </div>
  )
}
