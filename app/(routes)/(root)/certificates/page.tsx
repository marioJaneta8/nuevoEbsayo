import { currentUser } from "@clerk/nextjs/server";
import { getPurchasesCourse } from "@/actions/getPurchasesCourse";
import { getUserProgressByCourse } from "@/actions/getUserProgressByCourse";
import { Award } from "lucide-react";
import { getChapterByCourse } from "@/actions/getChapterByCourse";
import { CourseList } from "./components/CourseList";

const CertificatePage = async () => {
  const user = await currentUser();

  if (!user) {
    return <p>No autorizado</p>;
  }

  const userName = `${user.firstName} ${user.lastName}`;

  const courses = await getPurchasesCourse(user.id);

  if (!courses) {
    return null;
  }

  const courseWithProgress = await Promise.all(
    courses.map(async (course) => {
      const progress = await getUserProgressByCourse(user.id, course.courseId);

      const chapters = await getChapterByCourse(course.courseId);

      return {
        ...course,
        userName,
        progress,
        chapters,
      };
    }),
  );



  return (
    <div className="m-6 p-6 border bg-white rounded-md">
      <div className="flex items-center gap-1 mb-4">
        <div className="p-2 rounded-full bg-violet-400">
          <Award className="w-5 h-5 text-white" />
        </div>

        <h3 className="text-xl font-semibold">Certificados de Los Cursos</h3>
      </div>

     <CourseList certificates={courseWithProgress}/>
    </div>
  );
};

export default CertificatePage;
