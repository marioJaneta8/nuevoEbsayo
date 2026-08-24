"use client"

import { createColumnHelper } from "@tanstack/react-table"
import { type DataTableFeatures } from "./data-table-features"

import {LastPurchaseDto} from "@/types/lastPurchaseDto"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


// Use `accessor` for data columns and `display` for columns without one.
const columnHelper = createColumnHelper<DataTableFeatures, LastPurchaseDto>()

export const columns = columnHelper.columns([
  columnHelper.accessor("createdAt", {
    header: "Fecha de Compra",
    cell:({row})=>{

      const date= new Date(row.original.createdAt).toLocaleDateString("es-CL");
      return<div className="font-medium"> {date}</div> 

    }
    
  }),
  columnHelper.accessor("userEmail", {
    header: "cliente",
  }),

 
 
columnHelper.accessor("courseTitle", {
    header: "curso",
  }),

  columnHelper.accessor("price", {
    header: "Precio",

   cell:({row})=>{
    const amount= row.original.price
   
    return <div className="font-medium">${amount}</div>
   }
  }),


])