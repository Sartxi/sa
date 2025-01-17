import Image from "next/image";
import { MapIcon } from "../../map/data";
import { Difficulty, Course } from "../../game/data";
import { Buttons } from "@/app/elements";

function useDifficulty(diff: Difficulty | undefined) {
  let icon = 'circle';
  if (diff === Difficulty.blue) icon = 'square';
  if (diff === Difficulty.black) icon = 'diamond';
  return icon;
}

export default function CourseDetails({ course, cancel }: { course: Course | undefined; cancel?: any }) {
  const diff = useDifficulty(course?.difficulty);
  if (!course) return;
  const { title, description, elevation, distance } = course;
  const button = { text: 'Close', style: 'inverse small close', callback: () => cancel?.() };
  return (
    <>
      <Buttons buttons={[button]} />
      <div className="course-details">
        <h1>
          <span className="icon">
            <Image
              src={MapIcon.trailhead}
              alt="Course Details"
              width={35}
              height={35}
            />
          </span>
          {title}
        </h1>
        <p>{description}</p>
        <div className="course-stats">
          <div className="stat">
            <div className={`rating-${diff}`} /> {course.difficulty}
          </div>
          <div className="stat">
            <Image width={15} height={15} src="./distance.svg" alt="distance" />
            {distance}mi
          </div>
          <div className="stat">
            <Image width={15} height={15} src="./peak.svg" alt="distance" />
            {elevation}ft
          </div>
        </div>
      </div>
    </>
  )
}
