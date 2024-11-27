import { SectionProps, Sections } from "../page";

export function Landing({ setActive }: SectionProps) {
  return (
    <div id={Sections.Landing} className="section">
      <div className="intro">
        <h5>Hello, my name is</h5>
        <h1>Sean.</h1>
        <h2>and I like to build stuff</h2>
        <p>I'm a web and software engineer, focused on user experiences, and a lifelong learner with a can-do additude. I thrive on solving complex problems and collaborating with innovative professionals. Currently located in Salt Lake City, Utah focused on building accessible, human-centered products at <a href="https://thinkingbox.com/" target="_blank">ThinkingBox</a>.</p>
        <button className="cta" onClick={() => setActive(Sections.About)}>Learn more about me!</button>
      </div>
    </div>
  )
}