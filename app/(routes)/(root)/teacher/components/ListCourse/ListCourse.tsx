import { CourseDTO } from "@/types/course";
import { CourseCard } from "../CourseCard";

interface Props {
  course: CourseDTO[];
}

export function ListCourse({ course }: Props) {
  if (course.length === 0) {
    return (
      <p className="text-gray-500 text-center mt-10">
        No tienes cursos creados aún.
      </p>
    );
  }

  return (
   <div className="flex flex-col   my-4 mx-6 border rounded-lg bg-white divide-y">
      {course.map((course) => (

        <div key={course.id} className="p-4">
        <CourseCard course={course} />
        </div>
      ))}
     
    </div>
  );
}
