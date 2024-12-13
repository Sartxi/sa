import Image from "next/image";
import { CourseProgress, GameProps } from "../../game/data";
import { MapIcon } from "../../map/data";
import { Buttons } from "@/app/elements";
import { MenuType } from "../data";

export default function ToolMenu({ close, game }: { game: GameProps; close: () => void }) {
  const completes: CourseProgress[] | undefined = game.progress?.current.filter(r => r.finished);
  const startCourse = (course: CourseProgress) => {
    const courses = game.progress?.current ?? [];
    const active: CourseProgress | undefined = courses.find((p) => p.id === course.id);
    const points = course.points.filter((p, i) => active?.points[i]);
    if (points.length) return;
    if (active) {
      active.active = true;
      game.play(active);
      game.setMenu({ type: MenuType.course });
    }
  }

  return (
    <div className="tool-menu">
      {completes?.map(r => <Image key={`fin${r.id}`} className="finished-course" src={MapIcon.apres} width={25} height={25} alt="finish" onClick={() => startCourse(r)} />)}
      <Buttons buttons={[{ text: 'Quit Game', style: 'transparent', callback: () => close() }]} />
    </div>
  )
}