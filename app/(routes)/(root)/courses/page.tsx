import { getHomeCourses } from "@/actions/getHomeCourses"
import { ListCourses } from "@/components/Shared"
import { auth } from "@clerk/nextjs/server"


const  CoursePage = async() => {

const {userId}= await auth()

  const listCourse= await  getHomeCourses(userId ?? undefined)

console.log(listCourse)

  return (
    <div>

    <ListCourses title="Todos Los Cursos" courses={listCourse}  />


    </div>
  )
}

export default CoursePage