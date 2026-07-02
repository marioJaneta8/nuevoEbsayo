"use client";
import { DollarSign } from "lucide-react";
import { TitleBlock } from "../TitleBlock";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

import { usePriceCourse } from "./usePrice";
import { Button } from "@/components/ui/button";
import { useGetCourseById } from "../CourseForm/useCourseForm";

type CoursePriceProps = {
  id: string;
  price: number | null;
};

export const CoursePrice = ({ id, price }: CoursePriceProps) => {
  const { mutate: updatePrice, isPending } = usePriceCourse({ id });

  const{data:courseData}= useGetCourseById({id});

  const currentPrice= courseData?.data?.price ?? 0
  console.log("currentPrice",currentPrice)

    const [selected, setSelected] = useState<number>(price ?? 0);

    useEffect(() => {
 
  setSelected(currentPrice)
 
}, [currentPrice])

  // cambiar el precio del curso select
 
  // actualizar el precio del curso boton mas efectivo
  const handlePrice = () => {
    updatePrice(selected);
  };
  return (
    <div className="p-6 bg-white rounded-md h-fit">
      <TitleBlock title="Precio del Curso" icon={DollarSign} />
     <Select value={selected.toString()} onValueChange={(v) => setSelected(Number(v))}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Selecciona un precio Del Curso" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Precio Del Curso</SelectLabel>
            <SelectItem value="0">Gratis</SelectItem>
            <SelectItem value="10">10.00 USD</SelectItem>
            <SelectItem value="20">20.00 USD</SelectItem>
            <SelectItem value="30">30.00 USD</SelectItem>
            <SelectItem value="40">40.00 USD</SelectItem>
            <SelectItem value="59.99">59.99 USD</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Button
        onClick={handlePrice}
        disabled={isPending || selected === currentPrice}
        className="mt-4"
      >
        Actualizar Precio
      </Button>
    </div>
  );
};
