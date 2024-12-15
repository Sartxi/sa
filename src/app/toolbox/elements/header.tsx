import { useMedia } from "../../hooks/viewport";
import { useRouter } from 'next/navigation';
import Image from "next/image";

export enum Tool {
  Color = 'Color',
  Flex = 'Flex',
  Grid = 'Grid',
  List = 'List'
}

const tools: string[] = Object.keys(Tool);

export function useToolIcon(tool: Tool) {
  switch (tool) {
    case Tool.Color:
      return '/about.svg';
    case Tool.Flex:
      return '/work.svg';
    case Tool.Grid:
      return '/skills.svg';
    case Tool.List:
      return '/contact.svg';
    default:
      return '/element.svg';
  }
}

function NavItem({ section }: { section: string }) {
  const icon = useToolIcon(Tool[section as keyof typeof Tool]);
  return (
    <>
      <span>
        <Image
          src={icon}
          alt={section}
          width={15}
          height={15}
        />
      </span> {section}
    </>
  )
}

function MobileNavItem({ section }: { section: string }) {
  const icon = useToolIcon(Tool[section as keyof typeof Tool]);
  return (
    <span className="mobile-nav-item">
      <Image
        src={icon}
        alt={section}
        width={25}
        height={25}
      />
    </span>
  )
}

interface ToolBoxHeaderProps {
  active: Tool;
  setActive: (tool: Tool) => void;
}

export default function ToolBoxHeader({ active, setActive }: ToolBoxHeaderProps) {
  const { mobile } = useMedia();
  const router = useRouter();
  return (
    <div id="ToolBoxHeader">
      <div className="header">
        <div className="content">
          <div className="logo-wrapper" onClick={() => router.push('/')}>
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
            {tools.map((key: string) => {
              const tool = Tool[key as keyof typeof Tool];
              return (
                <li
                  key={tool}
                  className={tool === active ? 'active' : ''}
                  onClick={() => setActive(tool)}>
                  {!mobile ? <NavItem section={key} /> : <MobileNavItem section={key} />}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
