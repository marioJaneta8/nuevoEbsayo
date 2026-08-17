"use client";
import { CertificateViewDTO } from "@/types/certificateDto";
import { Ref } from "react";

interface CertificateProps {
  certificate: CertificateViewDTO;
  certRef:Ref<HTMLDivElement>;
}

export const Certificate = ({ certificate,certRef }:CertificateProps) => {
    const { userName, courseTitle } = certificate;

    return (

    <div
  ref={certRef}
  className="relative w-full aspect-[1.414/1] bg-[url('/certificadoPrueba.jpg')] bg-cover bg-center bg-no-repeat text-black"
>
  <p className="absolute top-1/3 left-1/2 -translate-x-1/2 text-xl font-bold p-6 mx-0 ">
    {userName}
  </p>
  <p className="absolute top-3/5 left-1/2 -translate-x-1/2 text-lg text-center mr-36 mx-0 font-bold p-2 ">
    {courseTitle}
  </p>
</div>
      
    );
    
  }
