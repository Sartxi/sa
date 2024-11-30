import Image from "next/image";
import { PageProps } from "../page";

export enum PageSections {
  Landing = 'Landing',
  About = 'About',
  Work = 'Work',
  Skills = 'Skills',
  Contact = 'Contact'
};

const sections: string[] = Object.keys(PageSections).filter((key) => key !== PageSections.Landing);

export function Header({ active, setActive }: PageProps) {
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
                <span>
                  <Image
                    src="/element.svg"
                    alt="icon"
                    width={15}
                    height={15}
                    priority
                  />
                </span> {key}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
