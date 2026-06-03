

interface PageProps {
  params: Promise<{
    courseSlug: string;
  }>;
}



const page = async ({ params }: PageProps) => {
  const { courseSlug } = await params;
  return (
    <div>CourseSlug: {courseSlug}</div>
  )
}

export default page