import { defaultData } from "../content/landing";
import { PageSections } from "../elements/header";
import { RenderText, useContent } from "../hooks/content";
import { PageProps } from "../page";

export function Landing(props: PageProps) {
  const { data } = useContent(PageSections.Landing);
  const { intro, title, subtitle, subtitle2, detail } = data ?? defaultData;

  return (
    <div id={PageSections.Landing} className="section">
      <div id="Intro" className="intro">
        <span id="iam">
          <h5>{intro}</h5>
          <h1>{title}</h1>
          <h2><span id="ilike">{subtitle}</span> {subtitle2}</h2>
        </span>
        <p><RenderText text={detail} /></p>
        <button className="cta" onClick={() => props.setActive(PageSections.About)}>Learn more about me!</button>
      </div>
    </div>
  )
}