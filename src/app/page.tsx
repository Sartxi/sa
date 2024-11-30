'use client'
import styles from "./page.module.css";
import { Landing, About, Skills, Work, Contact } from "./sections";
import { Header, PageSections } from "./elements/header";
import { useState } from "react";
import { Roamer, Trail } from "./elements";
import { Theme } from "./elements/theme";
import { useScrolling } from "./hooks/scrolling";
import { Loading } from "./elements/loading";

export interface PageProps {
  active: PageSections;
  setActive: any;
}

export default function Page() {
  const [pageInit, setPageInit] = useState(false);
  const [active, setActive] = useState(PageSections.Landing);
  const { refresh } = useScrolling(active, setActive);
  const page: PageProps = { active, setActive };

  return (
    <div className={styles.page}>
      {!pageInit && <Loading complete={setPageInit} />}
      <Roamer />
      <Theme refresh={() => refresh(active)} />
      <Trail {...page} />
      <Header {...page} />
      <Landing {...page} />
      <About {...page} />
      <Work {...page} />
      <Skills />
      <Contact />
    </div>
  );
}
