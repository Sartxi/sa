import Image from "next/image";
import { PageSections } from "../elements/header";
import { Buttons, Title } from "../elements";
import { useState } from "react";
import { useMedia } from "../hooks/viewport";
import { PageProps } from "../page";

enum Abouts {
  Professional = 'Professional',
  Personal = 'Personal'
}

function Professional({ setActive }: PageProps) {
  return (
    <>
      <p className="space">My tenure as a Software Engineer focuses on developing robust software solutions that enhance user experience, particularly through the lens of UI/UX design using advanced front-end technologies. My most recent efforts have been instrumental in fortifying Adobe online presence, where I play a pivotal role in deploying their design system, and amplifying their localization and publishing functionalities for adobe.com.</p>
      <p>My professional journey spans <strong>17 years</strong>, during which I have specialized in creating digital experiences that resonate with users and elevate engagement. Collaborating closely with both teams and clients, we have successfully navigated complex project landscapes, achieving streamlined processes and bespoke solutions that align with the latest industry trends and client specifications.</p>
      <Buttons buttons={[{ text: 'My Work', icon: '/work.svg', callback: () => setActive(PageSections.Work) }]} />
    </>
  )
}

function Personal({ setActive }: PageProps) {
  return (
    <>
      <p className="space">I am a mountain oriented person. Which is a big reason I love living in Salt Lake City, Utah. I spend my free time on the trails during the summer and on the slopes during the winter. My passion is moving around in the mountains and spending time enjoying adventures in the great outdoors. On the weekends you can find me recreating on trails, sliding down mountains, and kyaking white water rapids. A different passion for every season.</p>
      <p>I love challenges and solving complex problems. Which led me to endurance challenges like Ironman, century rides, and marathoning. My journey with running started with road marathons and my love of the mountains led me to long distance trail and mountain running. So far in my life I have participated and finished <strong>33 Ultra distance challenges</strong> and look forward to many more.</p>
      <Buttons buttons={[{ text: 'My Work', icon: '/work.svg', callback: () => setActive(PageSections.Work) }]} />
    </>
  )
}

function getAbout(about: Abouts, props: PageProps) {
  switch (about) {
    case Abouts.Personal:
      return <Personal {...props} />
    default:
      return <Professional {...props} />
  }
}

export function About(props: PageProps) {
  const { mobile, tablet } = useMedia();
  const [about, setAbout] = useState(Abouts.Professional);
  const src = about === Abouts.Professional ? '/profile.jpg' : '/running.png';
  const size = tablet ? 150 : 400;

  return (
    <div id={PageSections.About} className="section rows">
      <div className="about">
        <Title text="About Me" section={PageSections.About} activeSelect={about} selects={Abouts} setSelect={setAbout} />
        {getAbout(about, props)}
      </div>
      {!mobile && (
        <div id="Profile" className="profile">
          <div className="fancy-img">
            <Image
              src={src}
              className="fancy-photo"
              alt="profile photo"
              width={size}
              height={size}
              priority
            />
          </div>
        </div>
      )}
    </div>
  )
}
