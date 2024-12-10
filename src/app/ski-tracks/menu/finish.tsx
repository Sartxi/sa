import { GameProps, Course } from "../game/data";
import { CourseDetails } from ".";

export default function FinishMenu({ courses, setMenu, progress, play }: GameProps) {
  const active = progress?.current.find((route) => route.active);
  const data: Course | undefined = courses.find((course) => course.id === active?.id);
  const skiDown = () => {
    if (active) {
      active.finished = true;
      play(active);
      setMenu(null);
    }
  };
  return (
    <div className="menu">
      <div className="route-info">
        <CourseDetails course={data} />
        <div className="route-decision">
          <h2>Make a Decision</h2>
          <p>Using the avalanche report and judging by the slope angle move forward by choosing which direction to go.</p>
          <button className="sa-cta" onClick={skiDown}>
            Next
          </button>
        </div>
      </div>
    </div>
  )
}