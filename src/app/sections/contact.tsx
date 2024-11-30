import Image from "next/image";
import { Title } from "../elements";
import { PageSections } from "../elements/header";
import { useEffect, useState } from "react";

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

const greetings = ['Say Hello!', '¡Saludame!', 'Esan Kaixo!', 'Salutami!', 'Dites bonjour!'];

function useGreeting() {
  const [greeting, setActive] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      const next = (greeting + 1) === greetings.length ? 0 : greeting + 1;
      setActive(next);
    }, 3000);
    return () => clearInterval(timer);
  }, [greeting]);
  return greetings[greeting];
}

export function Contact() {
  const greeting = useGreeting();
  return (
    <div id={PageSections.Contact} className="section">
      <Title id="ContactTitle" text={greeting} hideIcon={true} />
      <div id="Socials" className="socials">
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
