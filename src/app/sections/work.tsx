import Image from "next/image";
import { useEffect, useState } from "react";
import { Buttons, Title } from "../elements";
import { PageSections } from "../elements/header";
import { ThinkingBox, JointSoftware, SnapFinance, SimpleTire, TCSTire } from "./companies";
import { useClickOutside, useMedia } from "../hooks/viewport";
import { Companies, Project, projects } from "./projects";
import { useModal } from "../elements/modal";

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

interface WorkTypeProps {
  work: Works;
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

function ProjectButtons(props: ProjectProps) {
  const { setModal } = useModal();
  const { link, link2, image, title } = props.project;
  const [href, text] = link?.split('#') || [];
  const [href2, text2] = link2?.split('#') || [];
  const style = 'inverse small';

  if (!link) return (
    <Buttons buttons={[{ text: 'Closer look', style, callback: () => setModal({ image, title }) }]} />
  );

  const projectBtns = [{ text, style, link: href }];
  if (link2) projectBtns.push({ text: text2, link: href2, style });

  return (
    <div className="project-buttons">
      <Buttons buttons={projectBtns} />
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
  else if (mobile) size = isOpen ? 50 : 130;
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
          <ProjectButtons project={project} />
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

function WorkType({ work, company }: WorkTypeProps) {
  switch (work) {
    case Works.Projects:
      return <Projects projects={projects.filter((p: Project) => (p.company === company))} />
    default:
      return <Experience company={company} />
  }
}

function CompanySelector({ company, setCompany }: CompanySelector) {
  const { mobile } = useMedia();
  const [open, setOpen] = useState<boolean | undefined>(undefined);

  useClickOutside('CompanyList', mobile, () => setOpen(false));

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

export function Work() {
  const [company, setCompany] = useState(Companies.ThinkingBox);
  const [work, setWork] = useState(Works.Experience);
  return (
    <div id={PageSections.Work} className="section">
      <div className="work">
        <Title id="WorkBlock" section={PageSections.Work} text="My Work" activeSelect={work} selects={Works} setSelect={setWork} />
        <div className="content rows work-examples">
          <div className="company">
            <WorkType work={work} company={company} />
          </div>
          <CompanySelector company={company} setCompany={setCompany} />
        </div>
      </div>
    </div>
  )
}
