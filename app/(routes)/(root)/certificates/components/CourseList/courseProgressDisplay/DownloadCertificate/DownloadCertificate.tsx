"use client";

import {  useRef } from "react";
import html2canvas from "html2canvas-pro";
import { DownloadIcon, Loader2 } from "lucide-react";

import { CertificateViewDTO } from "@/types/certificateDto";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Button } from "@/components/ui/button";
import { Certificate } from "./Certificate";



interface DownloadCertificateProps {
  certificate: CertificateViewDTO;
}



export const DownloadCertificate = ({ certificate }: DownloadCertificateProps) => {
  const certRef= useRef<HTMLDivElement>(null);
  const handleDownload = async () => {

    if(!certRef.current){
      return;
    }

    try{
      const canvas=await html2canvas(certRef.current,
        
        {
          scale:1,
          
        }
      
      );
      const link=document.createElement("a");
      link.download=`certificado-${certificate.courseTitle}.png`;
      link.href=canvas.toDataURL("image/png");
      link.click();
    }catch(error){
      console.log(error);
    }



  };

  return (

    <AlertDialog>
  <AlertDialogTrigger asChild>
    <Button>
      <DownloadIcon className="mr-2 h-4 w-4" />
      Descargar Certificado
    </Button>
  </AlertDialogTrigger>
  <AlertDialogContent className="w-[95vw] max-w-5xl">
    <AlertDialogHeader>
      <AlertDialogTitle>Descarga Tu Certificado 

      </AlertDialogTitle>
      <AlertDialogDescription>
      Revisa tu certificado antes de descargarlo.
    </AlertDialogDescription>
  </AlertDialogHeader>

  <div className="w-full overflow-x-auto">
    <Certificate
      certRef={certRef}
      certificate={certificate}
    />
  </div>
  
    <AlertDialogFooter>
      <AlertDialogCancel>Cancelar</AlertDialogCancel>
      <AlertDialogAction onClick={handleDownload}>Descargar</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
  

);
};

