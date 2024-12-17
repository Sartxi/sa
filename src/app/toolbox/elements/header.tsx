import { useRouter } from 'next/navigation';
import Image from "next/image";
import { Tool, useToolIcon } from '../toolbox';

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

interface ToolBoxHeaderProps {
  active: Tool;
  setActive: (tool: Tool) => void;
}

export default function ToolBoxHeader({ active, setActive }: ToolBoxHeaderProps) {
  const router = useRouter();
  const tools: string[] = Object.keys(Tool);
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
                  <NavItem section={key} />
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
