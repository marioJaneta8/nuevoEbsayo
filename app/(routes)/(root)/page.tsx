import { ListCourses } from "@/components/Shared/ListCourses";
import { ExploreCourse } from "./components";
import { getHomeCourses } from "@/actions/getHomeCourses";
import { auth } from "@clerk/nextjs/server";

export default async function Home() {

  const {userId}= await auth()
  
  const listCourse =  await getHomeCourses(userId ?? undefined)
  
 return (
    <div className="w-full">
      <ExploreCourse />

      <ListCourses
        title="Top courses"
        courses={listCourse}
      />
    </div>
  );
}
