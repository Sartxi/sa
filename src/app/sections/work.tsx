import Image from "next/image";
import { useState } from "react";
import { Title } from "../elements";
import { Sections } from "../page";
import { ThinkingBox, JointSoftware, SnapFinance, SimpleTire, TCSTire } from "./companies";

enum Works {
  Experience = 'Experience',
  Projects = 'Projects'
}

enum Companies {
  ThinkingBox = 'ThinkingBox',
  JointSoftware = 'Joint Software',
  SnapFinance = 'Snap Finance',
  SimpleTire = 'Simple Tire',
  TCSTire = 'TCS Technology'
}

interface WorkProps {
  company: Companies;
}

interface Project {
  company: Companies;
  title: string;
  image: string;
  link?: string;
};

interface ProjectProps {
  project: Project;
};

const projects: Project[] = [
  { company: Companies.ThinkingBox, link: 'https://thinkingbox.com/work/consonant-adobe', image: '/consonant.png', title: 'Adobe Consonant' },
  { company: Companies.ThinkingBox, link: 'https://milo.adobe.com/', image: '/milo.png', title: 'Adobe Milo' },
  { company: Companies.ThinkingBox, image: '/bulkpublish.png', title: 'Milo Bulk Publishing' },
  { company: Companies.JointSoftware, link: 'https://www.loopmein.app/', image: '/loopmein.png', title: 'LoopMeIn' },
  { company: Companies.JointSoftware, link: 'https://www.loopmein.app/vinfo/', image: '/vinfo.png', title: 'Vinfo' },
  { company: Companies.SnapFinance, link: 'https://snapfinance.com/', image: '/snapfinance.png', title: 'Corporate Website' },
  { company: Companies.SimpleTire, link: 'https://simpletire.com/', image: '/simpletire.png', title: 'SimpleTire.com' },
  { company: Companies.TCSTire, link: 'https://tcstire.com/', image: '/tcs.png', title: 'Corporate Website' },
  { company: Companies.TCSTire, link: 'https://www.rockystirepros.com/', image: '/tirepros.png', title: 'Client Website' },
];

function Experience(props: WorkProps) {
  switch (props.company) {
    case Companies.JointSoftware:
      return <JointSoftware />;
    case Companies.SnapFinance:
      return <SnapFinance />;
    case Companies.SimpleTire:
      return <SimpleTire />;
    case Companies.TCSTire:
      return <TCSTire />;
    default:
      return <ThinkingBox />;
  }
}

function ProjectTile({ project }: ProjectProps) {
  const { image, title } = project;
  return (
    <div className="example-tile">
      <div className='fancy-img small linked'>
        <Image
          src={image}
          className="fancy-photo"
          alt={`${title} image`}
          width={200}
          height={200}
          priority
        />
      </div>
      {title}
    </div>
  )
}

function Project(props: ProjectProps) {
  if (props.project.link) return <a href={props.project.link} target="_blank"><ProjectTile {...props} /></a>
  return <ProjectTile {...props} />;
}

function Projects(props: WorkProps) {
  const examples: Project[] = projects.filter((ex) => (ex.company === props.company));
  return (
    <div className="examples">
      <h3>Projects:</h3>
      <div className="example-tiles">
        {examples.map((example, index) => <Project key={index} project={example} />)}
      </div>
    </div>
  )
}

function getWork(work: Works, company: Companies) {
  switch (work) {
    case Works.Projects:
      return <Projects company={company} />
    default:
      return <Experience company={company} />
  }
}

export function Work() {
  const [company, setCompany] = useState(Companies.ThinkingBox);
  const [work, setWork] = useState(Works.Experience);
  return (
    <div id={Sections.Work} className="section">
      <div className="work">
        <Title text="My Work" activeSelect={work} selects={Works} setSelect={setWork} />
        <div className="content rows">
          <div className="company">
            {getWork(work, company)}
          </div>
          <div className="companies">
            <ul>
              {Object.keys(Companies).map((key: string) => {
                const companyKey = Companies[key as keyof typeof Companies];
                const style = company === companyKey ? 'active' : '';
                return (<li key={companyKey} className={style} onClick={() => setCompany(companyKey)}>{companyKey}</li>)
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
