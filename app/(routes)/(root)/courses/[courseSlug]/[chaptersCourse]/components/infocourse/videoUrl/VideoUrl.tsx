"use client";

import { useRef } from "react";
import { useProgressMutation } from "../useProgress";

interface VideoUrlProps {
  videoUrl?: string;
  id?: string;
  chapterId?: string;
}

const VideoUrl = ({ videoUrl, id, chapterId }: VideoUrlProps) => {
  // Inicializamos tu hook de mutación con los IDs correspondientes
  const { mutate } = useProgressMutation({
    id: id!,
    chapterId: chapterId!,
  });

  const hascompleted = useRef(false);

  const handleVideoEnd = () => {
    if (hascompleted.current) return; // si ya se marco como completado no hacemos nada
    hascompleted.current = true; // marcamos como completado
    mutate(); // llamamos al endpoint para actualizar el progreso
  };

  return (
    <video
      src={videoUrl}
      controls
      // Evita que aparezca el botón fácil de "Descargar"
      controlsList="nodownload"
      // Carga solo los metadatos (duración) iniciales para ahorrar servidor
      preload="metadata"
      // Usamos object-contain para que el video mantenga su relación de aspecto real
      // sin recortarle la cabeza o los bordes al profesor.
      className="w-full h-full object-contain bg-black rounded-md shadow-md"
     

      // cuando termina de reproducirse el video se ejecuta la funcion handleVideoEnd
      onEnded={handleVideoEnd}
    />
  );
};

export default VideoUrl;
