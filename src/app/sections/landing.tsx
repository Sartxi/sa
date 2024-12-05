import { PageSections } from "../elements/header";
import { PageProps } from "../page";
import { Buttons } from "../elements";

const myResume = 'https://docs.google.com/document/d/1Ue122_7ij4mpbCFkqnscrOdKtR8b3kWrEt8p8UVwPDI/edit?usp=sharing';

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
        <Buttons buttons={[
          { text: 'About me!', icon: '/about.svg', callback: () => props.setActive(PageSections.About) },
          { text: 'Resume PDF', icon: '/file.svg', link: myResume },
        ]} />
      </div>
    </div>
  )
}