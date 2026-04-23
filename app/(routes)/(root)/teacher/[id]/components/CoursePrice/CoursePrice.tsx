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
import { useState } from "react";

type CoursePriceProps = {
  id: string;
  price: number | null;
};

export const CoursePrice = ({ id, price }: CoursePriceProps) => {
  const [priceCourse, setPrice] = useState<number>(price ?? 0);


  const handlePriceChange = (value: string) => {
    const newPrice = Number(value);
     console.log("Precio seleccionado:", newPrice);
     setPrice(newPrice);


  }
  return (
    <div className="p-6 bg-white rounded-md h-fit">
      <TitleBlock title="Precio del Curso" icon={DollarSign} />
      <Select
        value={priceCourse.toString()}
        onValueChange={handlePriceChange}
      >
      
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Selecciona un precio Del Curso" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Precio Del Curso</SelectLabel>
            <SelectItem value="0">Gratis</SelectItem>
            <SelectItem value="10">10 USD</SelectItem>
            <SelectItem value="20">20 USD</SelectItem>
            <SelectItem value="30">30 USD</SelectItem>
            <SelectItem value="40">40 USD</SelectItem>
          </SelectGroup>
        </SelectContent>

      </Select>
    </div>
  );
};
