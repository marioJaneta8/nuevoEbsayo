"use client";
import { useState ,useEffect} from "react";
import { FileImage, Pencil } from "lucide-react";
import { TitleBlock } from "../TitleBlock";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { UploadButton } from "@/utils/uploadthing";
import { toast } from "sonner";
import {useImage} from './useImage'


interface CourseImageProps {
  id: string;
  imageUrl: string | null;
}

const CourseImage = ({ id, imageUrl }: CourseImageProps) => {
 //editar Imagen del curso
  const [isEditing, setIsEditing] = useState(false);
  //imagen del curso
  const [image, setImage] = useState(imageUrl);
  
  const {mutate,isPending} = useImage({id})

  const onChangeImage = (imageUrl: string) => {
 

  mutate(imageUrl, {
    onSuccess: () => {
      setIsEditing(false);
    }
  })  ;
  }

  return (
    <div className="p-4 rounded-lg bg-white h-fit">
      <TitleBlock title="Imagen del curso" icon={FileImage} />

      {isEditing ? (
        <div className="bg-slate-300 p-4 mt-2 rounded-lg">
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res: any) => {
              onChangeImage(res[0]?.ufsUrl || "");
            }}
            onUploadError={(error: Error) => {
              toast.error("Error al subir la imagen");
              console.error("Upload error:", error);
            
            }}
          />
        </div>
      ) : (
        <Image
          src={image || "/default-image.png"}
          alt="Curso Image"
          width={500}
          height={250}
          loading="eager"
          className="w-full h-full rounded-md"
        />
      )}

      <Button
        className="w-full mt-4"
        disabled={isPending}
        variant="outline"
        size="sm"
        onClick={() => setIsEditing(!isEditing)}
      >
        <Pencil className="w-4 h-4 " />
        Editar Imagen
      </Button>
    </div>
  );
};

export default CourseImage;
