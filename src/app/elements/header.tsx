import Image from "next/image";
import { PageProps } from "../page";
import { useSectionIcon } from "../hooks/scheme";
import { useMedia } from "../hooks/viewport";

export enum PageSections {
  Landing = 'Landing',
  About = 'About',
  Work = 'Work',
  Skills = 'Skills',
  Contact = 'Contact'
};

const sections: string[] = Object.keys(PageSections).filter((key) => key !== PageSections.Landing);

function NavItem({ section }: { section: string }) {
  const icon = useSectionIcon(PageSections[section as keyof typeof PageSections]);
  return (
    <>
      <span>
        <Image
          src={icon}
          alt={section}
          width={15}
          height={15}
          priority
        />
      </span> {section}
    </>
  )
}

function MobileNavItem({ section }: { section: string }) {
  const icon = useSectionIcon(PageSections[section as keyof typeof PageSections]);
  return (
    <span className="mobile-nav-item">
      <Image
        src={icon}
        alt={section}
        width={25}
        height={25}
        priority
      />
    </span>
  )
}

export function Header({ active, setActive }: PageProps) {
  const { mobile } = useMedia();
  return (
    <div className="header">
      <div className="content">
        <div className="logo-wrapper" onClick={() => setActive(PageSections.Landing)}>
          <Image
            src="/sa_icon.svg"
            alt="SA logo"
            className="logo"
            width={60}
            height={60}
            priority
          />
        </div>
        <ul>
          {sections.map((key: string) => {
            const section = PageSections[key as keyof typeof PageSections];
            return (
              <li
                key={section}
                className={section === active ? 'active' : ''}
                onClick={() => setActive(section)}>
                {!mobile ? <NavItem section={key} /> : <MobileNavItem section={key} />}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
