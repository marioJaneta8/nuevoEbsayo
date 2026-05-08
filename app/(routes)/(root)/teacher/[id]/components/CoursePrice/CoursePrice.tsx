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

import { usePriceCourse } from "./usePrice";
import { Button } from "@/components/ui/button";

type CoursePriceProps = {
  id: string;
  price: number | null;
};

export const CoursePrice = ({ id, price }: CoursePriceProps) => {
  const { mutate: updatePrice, isPending } = usePriceCourse({ id });
  const [priceCourse, setPrice] = useState<number>(price ?? 0);

  // cambiar el precio del curso select
  const handlePriceChange = (value: string) => {
    const newPrice = Number(value);
    setPrice(newPrice);
  };

  // actualizar el precio del curso boton mas efectivo
  const handlePrice = () => {
    updatePrice(priceCourse);
  };
  return (
    <div className="p-6 bg-white rounded-md h-fit">
      <TitleBlock title="Precio del Curso" icon={DollarSign} />
      <Select value={priceCourse.toString()} onValueChange={handlePriceChange}>
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
            <SelectItem value="59.99">59.99 USD</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Button
        onClick={handlePrice}
        disabled={isPending || priceCourse === (price ?? 0)}
        className="mt-4"
      >
        Actualizar Precio
      </Button>
    </div>
  );
};
