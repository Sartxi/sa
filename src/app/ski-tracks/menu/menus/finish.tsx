import Image from "next/image";
import { Buttons } from "@/app/elements";
import { GameProps, Course } from "../../game/data";
import { CourseDetails } from "./";
import { MenuType } from "../data";
import { MapIcon } from "../../map/data";

export default function FinishMenu({ courses, setMenu, progress, pastdeaths, setPastDeaths, play }: GameProps) {
  const current = progress?.current.find((route) => route.active);
  const data: Course | undefined = courses.find((course) => course.id === current?.id);
  const quit = (menu: { type: MenuType } | null = null) => {
    if (!current) return;
    current.active = false;
    current.points = [];
    if (current.deaths.length) {
      setPastDeaths([...pastdeaths || [], ...current.deaths]);
      current.deaths = [];
    }
    play(current);
    setMenu(menu);
  };

  const doagain = () => {
    if (!current) return;
    current.finished = false;
    play(current);
    setMenu({ type: MenuType.course });
  }

  const buttons = [
    { text: 'Close', style: 'inverse', callback: () => quit() },
    { text: 'Do this course again', style: 'inverse', callback: () => doagain() }
  ];

  return (
    <div className="menu">
      <div className="course-info">
        <CourseDetails course={data} cancel={quit} />
        <div className="course-decision">
          <div className="action-area">
            <div className="consequence">
              <div>
                <Image src={MapIcon.apres} className={`consequence-icon`} width={200} height={200} alt="Finish Icon" />
                <h2>You finished this course!</h2>
              </div>
              <div className="choices">
                <Buttons buttons={buttons} />
              </div>
            </div >
          </div>
        </div>
      </div>
    </div>
  )
}
