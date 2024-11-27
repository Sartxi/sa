'use client'

import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { Landing, About, Skills, Work, Contact } from "./sections";
import { useViewPort } from "./viewport";

export enum Sections {
  Landing = 'Landing',
  About = 'About',
  Work = 'Work',
  Skills = 'Skills',
  Contact = 'Contact'
};

export interface SectionProps {
  active: Sections,
  setActive: any
}

function getElVisibility(element: HTMLElement | null) {
  if (!element) return;
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;
  const visibleHeight = Math.max(0, Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0));
  const visibleWidth = Math.max(0, Math.min(rect.right, windowWidth) - Math.max(rect.left, 0));
  const visibleArea = visibleHeight * visibleWidth;
  const elementArea = rect.width * rect.height;
  const percentageVisible = (visibleArea / elementArea) * 100;
  return Math.trunc(percentageVisible);
}

class EnumX {
  static of<T extends object>(e: T) {
    const values = Object.values(e)
    const nextMap = new Map(values.map((k, i) => [k, values[i + 1]]));
    const prevMap = new Map(values.map((k, i) => [k, values[i - 1]]));
    return {
      prev: <K extends keyof T>(v: T[K]) => prevMap.get(v),
      next: <K extends keyof T>(v: T[K]) => nextMap.get(v),
    }
  }
}

function Header({ active, setActive }: SectionProps) {
  const [autoScrolling, setAutoScrolling] = useState(false);
  const { width } = useViewPort();

  useEffect(() => {
    const handleScroll = () => {
      const prev = EnumX.of(Sections).prev(Sections[active]);
      const next = EnumX.of(Sections).next(Sections[active]);
      const activeSection = document.getElementById(active);
      const prevSection = document.getElementById(prev);
      const nextSection = document.getElementById(next);
      const scrollActive = getElVisibility(activeSection) ?? 0;
      const scrollPrev = getElVisibility(prevSection) ?? 0;
      const scrollNext = getElVisibility(nextSection) ?? 0;
      if (!autoScrolling) {
        const [ajacent, section] = scrollPrev === 0 ? [scrollNext, next] : [scrollPrev, prev];
        if (scrollActive <= 75 && ajacent >= 25) setActive(section);
      }
    };
    if (width > 600) window.addEventListener('scroll', handleScroll);
    return () => {
      if (width > 600) window.removeEventListener('scroll', handleScroll);
    };
  }, [active, autoScrolling]);

  useEffect(() => {
    if (active) {
      const activeSection: HTMLElement | null = document.getElementById(active);
      if (activeSection) {
        setAutoScrolling(true);
        activeSection.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => setAutoScrolling(false), 1000);
      };
    }
  }, [active]);

  return (
    <div className="header">
      <div className="content">
        <Image
          onClick={() => setActive(Sections.Landing)}
          className={styles.logo}
          src="/sa_icon.svg"
          alt="SA logo"
          width={60}
          height={60}
          priority
        />
        <ul>
          {Object.keys(Sections).filter((key) => key !== Sections.Landing).map((key: string, index: number) => {
            const section = Sections[key as keyof typeof Sections];
            return (
              <li
                key={section}
                className={section === active ? 'active' : ''}
                onClick={() => setActive(section)}>
                <span>
                  <Image
                    src="/element.svg"
                    alt="icon"
                    width={15}
                    height={15}
                    priority
                  />
                </span> {key}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default function Home() {
  const [active, setActive] = useState(Sections.Landing);
  const sectionProps = { active, setActive };
  return (
    <div className={styles.page}>
      <Header {...sectionProps} />
      <Landing {...sectionProps} />
      <About {...sectionProps} />
      <Work />
      <Skills />
      <Contact />
    </div>
  );
}
