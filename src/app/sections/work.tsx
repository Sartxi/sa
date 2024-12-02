import Image from "next/image";
import { useEffect, useState } from "react";
import { Title } from "../elements";
import { PageSections } from "../elements/header";
import { ThinkingBox, JointSoftware, SnapFinance, SimpleTire, TCSTire } from "./companies";
import { useMedia } from "../hooks/viewport";
import { Companies, Project, projects } from "./projects";
import { PageProps } from "../page";

enum Works {
  Experience = 'Experience',
  Projects = 'Projects'
}

interface CompanySelector {
  company: Companies;
  setCompany: any;
}

interface WorkProps {
  company: Companies;
}

interface ProjectProps {
  project: Project;
  open?: Project | undefined;
  setOpen?: any;
};

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

function TileCTA(props: ProjectProps) {
  const { link, link2 } = props.project;
  const [href, text] = link?.split('#') || [];
  const [href2, text2] = link2?.split('#') || [];
  const style = 'cta inverse small';
  if (!link) return (
    <button className={style}>Take a look</button>
  );
  return (
    <div className="project-buttons">
      <a href={href} target="_blank"><button className="cta inverse small">{text}</button></a>
      {link2 ? <a href={href2} target="_blank"><button className="cta inverse small">{text2}</button></a> : ''}
    </div>
  )
}

function Tile(props: ProjectProps) {
  const { project, open, setOpen } = props;
  const { mobile, tablet } = useMedia();
  const { image, title, description } = project;
  const isOpen = open === project;

  let size = 200;
  if (tablet) size = 100;
  else if (mobile) size = 130;
  else if (open !== undefined && !isOpen) size = 50;

  return (
    <div className={`example-tile${isOpen ? ' open' : ''}`}>
      <div
        className='fancy-img small linked'
        onClick={() => setOpen()}>
        <Image
          src={image}
          className="fancy-photo"
          alt={`${title} image`}
          width={size}
          height={size}
          priority
        />
      </div>
      {isOpen && (
        <div className="project-details">
          <h2>{title}</h2>
          <p>{description}</p>
          <TileCTA project={project} />
        </div>
      )}
      {!open && title}
    </div>
  );
}

function Projects({ projects }: { projects: Project[] }) {
  const [open, setOpen] = useState<Project | undefined>(undefined);

  useEffect(() => {
    setOpen(projects.length === 1 ? projects[0] : undefined);
  }, [projects]);

  return (
    <div className='examples'>
      <div className={`example-tiles${open ? ' open' : ''}`}>
        {projects.map((example, index) => (
          <Tile
            key={index}
            project={example}
            open={open}
            setOpen={() => setOpen(example)} />
        ))}
      </div>
    </div>
  )
}

function getWork(work: Works, company: Companies) {
  switch (work) {
    case Works.Projects:
      const examples: Project[] = projects.filter((p: Project) => (p.company === company));
      return <Projects projects={examples} />
    default:
      return <Experience company={company} />
  }
}

function CompanySelector({ company, setCompany }: CompanySelector) {
  const { mobile } = useMedia();
  const [open, setOpen] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    if (!mobile && open === undefined) setOpen(true);
  }, [mobile]);

  const selectCompany = (selection: string) => {
    setCompany(selection);
    if (mobile) setOpen(false);
  };

  return (
    <div id="CompanyList" className="companies">
      {mobile && (
        <div className="mobile-select" onClick={() => setOpen(!open)}>
          <span>{company}</span>
        </div>
      )}
      {open && (
        <ul>
          {Object.keys(Companies).map((key: string) => {
            const companyKey = Companies[key as keyof typeof Companies];
            const style = company === companyKey ? 'active' : '';
            return (<li key={companyKey} className={style} onClick={() => selectCompany(companyKey)}>{companyKey}</li>)
          })}
        </ul>
      )}
    </div>
  )
}

export function Work({ setActive }: PageProps) {
  const [company, setCompany] = useState(Companies.ThinkingBox);
  const [work, setWork] = useState(Works.Experience);
  return (
    <div id={PageSections.Work} className="section">
      <div className="work">
        <Title id="WorkBlock" text="My Work" activeSelect={work} selects={Works} setSelect={setWork} />
        <div className="content rows work-examples">
          <div className="company">
            {getWork(work, company)}
            <button className="cta" onClick={() => setActive(PageSections.Skills)}>See my Skills</button>
          </div>
          <CompanySelector company={company} setCompany={setCompany} />
        </div>
      </div>
    </div>
  )
}
