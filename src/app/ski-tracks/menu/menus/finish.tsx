import { Buttons } from "@/app/elements";
import { GameProps, Course } from "../../game/data";
import { CourseDetails } from "./";

export default function FinishMenu({ courses, setMenu, progress }: GameProps) {
  const active = progress?.current.find((route) => route.active);
  const data: Course | undefined = courses.find((course) => course.id === active?.id);
  return (
    <div className="menu">
      <div className="route-info">
        <CourseDetails course={data} />
        <div className="route-decision">
          <h2>You Finished this bitch</h2>
          <p>Your skills got you to the top and then you got to shred down like a beast!</p>
          <Buttons buttons={[{ text: 'Next', callback: () => setMenu(null) }]} />
        </div>
      </div>
    </div>
  )
}
