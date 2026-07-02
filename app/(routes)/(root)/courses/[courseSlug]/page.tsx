import { getCourseBySlug } from "@/actions/getCourseBySlug";
import BreadCrumbs from "./components/BreadCrumbs/BreadCrumbs";
import { redirect } from "next/navigation";
import { getPurchaseCourse } from "@/actions/getPurchaseCourse";
import {  auth } from "@clerk/nextjs/server";
import { CourseContent, HeroBlockCourse } from "./components";
import { Suspense } from "react";


interface PageProps {
  params: Promise<{
    courseSlug: string;
  }>;
}

const page = async ({ params }: PageProps) => {
  const { courseSlug } = await params;
  const infocourse = await getCourseBySlug(courseSlug);
  const {userId} = await auth();




  //si el usuario no existe redireccionar a home
if (!infocourse) {
  
      redirect("/");
  
}

// comprar si no se esta logueado redireccionar a login

const purchaseCourse=  userId ? await getPurchaseCourse(userId,infocourse.id): false



  return (
    <div className="max-w-6xl mx-auto">
      <div className="my-4 mx-6 border rounded-lg bg-white p-6">
        {/* BREADCRUMBS */}

        <BreadCrumbs title={infocourse?.title || "Curso no encontrado"} />

        {/* HEROBlocK */}

  <Suspense fallback={<div>Loading...</div>}>
        <HeroBlockCourse
          purchaseCourse={purchaseCourse!}
          course={infocourse}
        />
  </Suspense>
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
