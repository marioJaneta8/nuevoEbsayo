import { currentUser } from "@clerk/nextjs/server";
import { Header, ListCourse } from "./components";
import { prisma } from "@/lib/prisma";
import { toCoursesDTO } from "@/types/mappers/course.mapper";
import { CourseDTO } from "@/types/course";
export default async function TeacherPage() {
  const user = await currentUser();
  if (!user) {
    return <p>Not Signed in</p>;
  }


  const course = await prisma.course.findMany({
    where:{
      userId: user.id
    }
  
  });
 
  const coursesDto: CourseDTO[] = toCoursesDTO(course);

  return <div>
    <Header />
   <ListCourse course={coursesDto} />
  </div>;
}
