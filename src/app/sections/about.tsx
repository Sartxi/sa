import Image from "next/image";
import { PageSections } from "../elements/header";
import { Title } from "../elements";
import { useState } from "react";
import { useMedia } from "../hooks/viewport";
import { PageProps } from "../page";
import { useContent, RenderText } from "../hooks/content";

export enum Abouts {
  Professional = 'Professional',
  Personal = 'Personal'
}

function AboutContent({ about, setActive }: { about: Abouts, setActive: any }) {
  const { data } = useContent(PageSections.About);
  if (!data) return <span />;
  const [p1, p2] = data.find((d: any) => d.type === about)?.details;
  return (
    <>
      <p className="space"><RenderText text={p1} /></p>
      <p><RenderText text={p2} /></p>
      <button className="cta" onClick={() => setActive(PageSections.Work)}>See my work!</button>
    </>
  )
}

export function About(props: PageProps) {
  const { mobile, tablet } = useMedia();
  const [about, setAbout] = useState(Abouts.Professional);
  const src = about === Abouts.Professional ? '/profile.jpg' : '/running.png';
  const size = tablet ? 150 : 400;

  return (
    <div id={PageSections.About} className="section rows">
      <div className="about">
        <Title text="About Me" section={PageSections.About} activeSelect={about} selects={Abouts} setSelect={setAbout} />
        <AboutContent about={about} setActive={props.setActive} />
      </div>
      {!mobile && (
        <div id="Profile" className="profile">
          <div className="fancy-img">
            <Image
              src={src}
              className="fancy-photo"
              alt="profile photo"
              width={size}
              height={size}
              priority
            />
          </div>
        </div>
      )}
    </div>
  )
}
