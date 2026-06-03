import { getHomeCourses } from "@/actions/getHomeCourses"
import { ListCourses } from "@/components/Shared"


const  CoursePage = async() => {
const listCourse= await  getHomeCourses()
  return (
    <div>

    <ListCourses title="Todos Los Cursos" courses={listCourse} />


    </div>
  )
}

export default CoursePage