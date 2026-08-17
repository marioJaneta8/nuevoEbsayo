import { Progress } from "@/components/ui/progress";
import { CertificateViewDTO } from "@/types/certificateDto";
import { DownloadCertificate } from "./DownloadCertificate";




interface CourseProgressDisplayProps {
  certificate: CertificateViewDTO;
}


const CourseProgressDisplay = ({ certificate }: CourseProgressDisplayProps) => {
  
 
  
  const {progress}=certificate;
  
  const showProgress = progress ===100;
 
 return showProgress  ? (
    <DownloadCertificate
    certificate={certificate}
    />
  )
  :(
    <>
    <Progress value={progress} className="*:bg-violet-300" />
    <p className="text-xs">{progress}% Completed</p>
   
</>
   


  )
}

export default CourseProgressDisplay