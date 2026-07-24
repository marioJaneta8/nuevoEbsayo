import { getHomeCourses } from "@/actions/getHomeCourses";
import { auth } from "@clerk/nextjs/server";

import { ListCourses } from "@/components/Shared";

export default async function MyCoursesPage() {
  const { userId } = await auth();

  if (!userId) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Please login to view your courses</p>
      </div>
    );
  }

  const courses = await getHomeCourses(userId);

  const purchasedCourses = courses.filter((course) => course.purchased);

  return <div>

   <ListCourses

    title="Mis cursos Comprados"
    courses={purchasedCourses}
   
   
   
   />



  </div>;
}
