"use client";
import { formatDate, formatPrice } from "@/lib/formatPrice";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { OrdersPageProps, ReceiptResponse } from "@/types/orderDto";
import { generateOrdersPDF } from "@/lib/generateOrderPdf";

export const OrderLists = ({ purchases }: OrdersPageProps) => {
  //suma total de las compras
  const totalPrices = purchases.reduce(
    (acc, purchase) => acc + purchase.price,
    0,
  );

  //formatear el total a moneda local
  const formatTotal = formatPrice(totalPrices);

  const downloadReceipt = async (paymentId: string | null) => {
    if (!paymentId) {
      toast.error("No se encontro el recibo");
      return;
    }

    // llamar al api

    const response = await fetch(`/api/payment/${paymentId}`);

    const data: ReceiptResponse = await response.json();

    console.log(data);

    if (data.receiptUrl) {
      window.open(data.receiptUrl, "_blank");
    } else {
      toast.error("No se encontro el recibo");
    }
  };

  return (
    <>
    <div className="flex items-center justify-between">
      <h2 className="text-xl font-semibold">
        Mis pedidos
      </h2>

      <Button
        onClick={() => generateOrdersPDF(purchases)}
      >
        Descargar PDF
      </Button>
    </div>
    <div>
      <Table className="my-6">
        <TableCaption>Listados de Tus Ultimos Pedidos</TableCaption>
        <TableHeader className="bg-slate-100">
          <TableRow>
            <TableHead className="w-25">Fecha</TableHead>
            <TableHead>Curso</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-center">Recibo</TableHead>
            <TableHead className="text-right">Precio</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {purchases.map((purchase) => (
            <TableRow key={purchase.id}>
              {/* fecha de compra */}
              <TableCell className="font-medium">
                {formatDate(purchase.createdAt)}
              </TableCell>
              {/* curso */}

              <TableCell>{purchase.title}</TableCell>
              <TableCell>
                <span className=" bg-white px-2 py-1 text-white-700 text-sm rounded-md">
                  Pagado
                </span>
              </TableCell>

              <TableCell className="text-center">
                {purchase.price === 0 ? (
                  <span className="text-sm  text-slate-500">No aplica</span>
                ) : (
                  <Button
                    onClick={() => downloadReceipt(purchase.paymentId)}
                    variant="outline"
                  >
                    Ver Recibo
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                )}
              </TableCell>

              <TableCell className="text-right">
                {purchase.price === 0 ? "Gratis" : formatPrice(purchase.price)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4} className="text-right">
              Total Gastado
            </TableCell>
            <TableCell className="text-right">{formatTotal}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
    </>
  );
};
