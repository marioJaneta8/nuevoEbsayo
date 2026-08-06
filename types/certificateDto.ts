import { ChapterDTO } from "./chapterDto";

export interface CertificateDTO {
    id:string;
    courseId:string;
    userId:string;
    courseTitle:string
    courseImageUrl:string
    courseDescription:string
    purchaseDate: Date;
}

export interface CertificateActionResponse {
    success: boolean;
    data?: CertificateDTO[];
    error?: string;
}

//para la vista del certificado de un curso
export interface CertificateViewDTO extends CertificateDTO {
  userName: string;
  progress: number;
  chapters: ChapterDTO[];
}


//para la vista de certificates 
export interface CertificatesPageProps {
    certificates: CertificateViewDTO[];
    
}