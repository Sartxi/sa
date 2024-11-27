import Image from "next/image";
import { Title } from "../elements";
import { Sections } from "../page";

interface SocialIcons {
  icon: string;
  link: string;
}

const socials: SocialIcons[] = [
  { icon: 'email', link: 'mailto:sean.archibeque@gmail.com' },
  { icon: 'github', link: 'https://github.com/Sartxi' },
  { icon: 'linkedIn', link: 'https://www.linkedin.com/in/seanarchibeque' },
  { icon: 'instagram', link: 'https://www.instagram.com/sean_archi' },
  { icon: 'soundcloud', link: 'https://soundcloud.com/archn' },
];

export function Contact() {
  return (
    <div id={Sections.Contact} className="section">
      <Title text="Say Hello!" />
      <div className="socials">
        {socials.map(({ icon, link }: SocialIcons) => (
          <a key={icon} href={link} target="_blank">
            <Image
              src={`/${icon}.svg`}
              alt={icon}
              width={40}
              height={40}
              priority
            />
          </a>
        ))}
      </div>
    </div>
  )
}
