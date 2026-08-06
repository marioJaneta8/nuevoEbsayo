import { CertificateViewDTO } from "@/types/certificateDto";
import Image from "next/image";
import CourseProgressDisplay from "./courseProgressDisplay/CourseProgressDisplay";

interface CertificatePageProps {
  certificates: CertificateViewDTO[];
}

export function CourseList({ certificates }: CertificatePageProps) {
  return (
    <div className="grid grid-cols-1 gap-5">
      {certificates.map((certificate) => (
        <div
          key={certificate.id}
          className="border rounded-md p-4 flex gap-4 justify-between shadow-sm"
        >
          <div className="flex gap-4 ">
            <div>
              <Image
                src={certificate.courseImageUrl || "/default-image.png"}
                alt={certificate.courseTitle}
                width={100}
                height={100}
                className=" rounded-md"
              />
            </div>
            <div className="flex flex-col">
              <h2 className="font-semibold text-xl">
                {certificate.courseTitle}
              </h2>
              <p className="max-w-sm text-gray-600 text-xs line-clamp-2">
                {certificate.courseDescription}
              </p>
            </div>
          </div>
          <div>
            <CourseProgressDisplay
            certificate={certificate}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
