import { PageSections } from "../elements/header";
import { PageProps } from "../page";

export function Landing(props: PageProps) {
  return (
    <div id={PageSections.Landing} className="section">
      <div id="Intro" className="intro">
        <span id="iam">
          <h5>Hello, my name is</h5>
          <h1>Sean.</h1>
          <h2><span id="ilike">and I like</span> to build stuff</h2>
        </span>
        <p>I am a web and software engineer, focused on user experiences, and a lifelong learner with a can-do additude. I thrive on solving complex problems and collaborating with innovative professionals. Currently located in Salt Lake City, Utah focused on building accessible, human-centered products at <a href="https://thinkingbox.com/" className="inline" target="_blank">ThinkingBox</a>.</p>
        <button className="cta" onClick={() => props.setActive(PageSections.About)}>Learn more about me!</button>
      </div>
    </div>
  )
}