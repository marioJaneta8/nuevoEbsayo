import { ListCourses } from "@/components/Shared/ListCourses";
import { ExploreCourse } from "./components";
import { getHomeCourses } from "@/actions/getHomeCourses";

export default async function Home() {
  const listCourse =  await getHomeCourses()
 
  return (
    <div>
      <ExploreCourse />
      <ListCourses 
      
      title="Top courses"
      courses={listCourse} />
    </div>
  );
}
