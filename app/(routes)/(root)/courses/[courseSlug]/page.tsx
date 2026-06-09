import { getCourseBySlug } from "@/actions/getCourseBySlug";
import dynamic from "next/dynamic";
//const BreadCrumbs = dynamic(() => import("./components/BreadCrumbs/BreadCrumbs"), { ssr: false });
import BreadCrumbs from "./components/BreadCrumbs/BreadCrumbs";
import { redirect } from "next/navigation";
import { getPurchaseCourse } from "@/actions/getPurchaseCourse";
import {  currentUser } from "@clerk/nextjs/server";
import { CourseContent, HeroBlockCourse } from "./components";
import { toChaptersDTO } from "@/types/mappers/chapter.mapper";


interface PageProps {
  params: Promise<{
    courseSlug: string;
  }>;
}

const page = async ({ params }: PageProps) => {
  const { courseSlug } = await params;
  const infocourse = await getCourseBySlug(courseSlug);
  const user = await currentUser();




  //si el usuario no existe redireccionar a home
if (!infocourse) {
  
      redirect("/");
  
}


const purchaseCourse=  user?.id  ? await getPurchaseCourse(user.id,infocourse.id): false



  return (
    <div className="max-w-6xl mx-auto">
      <div className="my-4 mx-6 border rounded-lg bg-white p-6">
        {/* BREADCRUMBS */}

        <BreadCrumbs title={infocourse?.title || "Curso no encontrado"} />

        {/* HEROBlocK */}

        <HeroBlockCourse
          purchaseCourse={purchaseCourse!}
          course={infocourse}
        />
      </div>

      {/* courseContent */}

{/*capitulos    */}
      <div className="my-4 mx-6 border rounded-lg bg-white p-6">
        
      <CourseContent chapters={infocourse.chapters || []} />
      </div>


    </div>
  );
};

export default page;
