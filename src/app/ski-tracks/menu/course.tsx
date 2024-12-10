import { GameProps, Course } from "../game/data";
import { CourseProgress } from "../game/game";
import { CourseDetails } from ".";
import { MenuType } from "./data";
import GameController from "./controller/controller";


function useCourseMenu({ courses, progress, setMenu, play }: GameProps) {
  const current: CourseProgress | undefined = progress?.current.find((course) => course.active);
  const course: Course | undefined = courses.find((course) => course.id === current?.id);
  const quit = (menu: { type: MenuType } | null = null) => {
    if (!current) return;
    current.active = false;
    current.points = [];
    current.deaths = [];
    play(current);
    setMenu(menu);
  };
  return { course, current, quit };
}

export default function CourseMenu(game: GameProps) {
  const { course, current, quit } = useCourseMenu(game);
  if (!course || !current) return <span />;
  return (
    <div className="menu">
      <div className="course-info">
        <CourseDetails course={course} cancel={quit} />
        <div className="course-decision">
          <GameController game={game} course={course} current={current} quit={quit} />
        </div>
      </div>
    </div>
  )
}
