import Image from "next/image";
import { GameProps, Course, CourseProgress } from "./data";
import { MapIcon, useMapIconSize } from "../map/data";
import { MenuType } from "../menu/data";

interface SkiCourseProps extends GameProps {
  course: Course;
}

interface CoursePoint {
  id: string;
  icon: MapIcon;
  desc: string;
  click?: any;
  trail?: boolean;
  death?: boolean;
}

function Point({ id, icon, desc, click, trail, death = false }: CoursePoint) {
  const size = useMapIconSize(icon);
  const style = `point${click ? ' link' : ''}${death ? ' death' : ''}`;
  return (
    <>
      {trail && <svg id={`Trail${id}`} className="trail" />}
      <Image id={id} className={style} height={size} width={size} src={icon} alt={desc} onClick={() => click && click?.()} />
    </>
  )
}

function Deaths({ deaths }: { deaths: number[][] | undefined }) {
  if (!deaths?.length) return <span />;
  return <>{deaths.map((d, index) => <Point key={`Death${index}`} death id={`Death${index}`} icon={MapIcon.death} desc="Death" />)}</>;
}

const newProgress = (id: string) => ({
  id, active: true,
  points: [],
  deaths: [],
  pastdeaths: [],
  summit: 0,
  rally: false,
  finished: false
});

function SkiCourse({ rider, course, progress, setMenu, play, pastdeaths }: SkiCourseProps) {
  const getPointId = (point: string) => (`${course.id}${point}`);
  const courses = progress?.current ?? [];
  const active: CourseProgress | undefined = courses.find((p) => p.id === course.id);
  const points = course.points.filter((p, i) => active?.points[i]);
  const atSummit = active?.summit && active.summit >= 2;
  const isFinished = active?.finished;

  const deaths = [...active?.deaths || [], ...pastdeaths || []];
  const startCourse = () => {
    if (points.length) return;
    if (active) active.active = true;
    play(active ? active : newProgress(course.id));
    setMenu({ type: MenuType.course });
  }

  if (isFinished) return (
    <div id={course.id} className="course">
      <Point
        id={getPointId('Start')}
        icon={MapIcon.apres}
        desc="Finished Route" />
      {deaths.length && <Deaths deaths={deaths} />}
    </div>
  )

  return (
    <div id={course.id} className="course">
      <Point id={getPointId('Start')} icon={MapIcon.trailhead} desc={`${course.id} trail head`} click={startCourse} />
      <Point id="Skinner" icon={MapIcon.skinner} desc="Skinner skinning" />
      {points.map((p, i) => {
        const index = `${i + 1}`;
        const next = active?.points[i];
        const icon = points.length === (i + 1) ? next === 1 ? MapIcon.pin : MapIcon.skinner : MapIcon.point;
        return (
          <Point
            trail
            key={`point${index}`}
            id={getPointId(index)}
            icon={icon}
            desc={`Point ${index}`} />
        )
      })}
      {atSummit ? <Point id={getPointId('Finish')} icon={active.summit === 1 ? MapIcon.skinner : rider} desc="Rallying down" /> : ''}
      {deaths && <Deaths deaths={deaths} />}
    </div>
  )
}

export default function SkiCourses(game: GameProps) {
  return game.courses.map((course: Course) => <SkiCourse key={course.id} course={course} {...game} />);
}
