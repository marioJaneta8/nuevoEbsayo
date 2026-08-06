import { Progress } from "@/components/ui/progress";
import { CertificateViewDTO } from "@/types/certificateDto";



interface CourseProgressDisplayProps {
  certificate: CertificateViewDTO;
}


const CourseProgressDisplay = ({ certificate }: CourseProgressDisplayProps) => {
  
 
  
  const {progress,}=certificate;
  
  const showProgress = progress ===100;
 
 return showProgress  ? (
    <p>Download Certificate</p>
  )
  :(
    <>
    <Progress value={progress} className="*:bg-violet-300" />
    <p className="text-xs">{progress}% Completed</p>
   
</>
   


  )
}

export default CourseProgressDisplay