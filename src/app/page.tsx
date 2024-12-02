'use client'
import styles from "./page.module.css";
import { useState } from "react";
import { Header, PageSections } from "./elements/header";
import { Roamer, Trail } from "./elements";
import { Landing, About, Skills, Work, Contact } from "./sections";
import { Theme } from "./elements/theme";
import { useScrolling } from "./hooks/scrolling";
import { useTheme } from "./hooks/scheme";
import { Loading } from "./elements/loading";
import { Modal } from "./elements/modal";

export interface PageProps {
  active: PageSections;
  setActive: any;
}

export default function Page() {
  const [init, setInit] = useState(false);
  const [active, setActive] = useState(PageSections.Landing);
  const { refresh } = useScrolling(active, setActive);
  const theme = useTheme();
  const props: PageProps = { active, setActive };

  return (
    <div className={`${styles.page} ${!init ? 'is-loading' : ''}`}>
      {!init && (
        <Loading
          {...theme}
          complete={setInit}
          refresh={() => refresh(active)} />
      )}
      <Theme {...theme} refresh={() => refresh(active)} />
      <Roamer />
      <Trail {...props} />
      <Header {...props} />
      <Landing {...props} />
      <About {...props} />
      <Work />
      <Skills />
      <Contact />
      <Modal />
    </div>
  );
}
