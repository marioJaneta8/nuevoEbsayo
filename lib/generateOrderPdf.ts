import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { OrderDTO } from "@/types/orderDto";
import { formatPrice } from "./formatPrice";

export const generateOrdersPDF = (purchases: OrderDTO[]) => {
  const doc = new jsPDF();
  //suma total de las compras
  const totalPrices = purchases.reduce(
    (total, purchase) => total + purchase.price,
    0,
  );
//formatear el total a moneda local
  const formatTotal = formatPrice(totalPrices);

   doc.setFontSize(18);
  doc.text("Mis Pedidos", 14, 20);

  doc.setFontSize(10);
  doc.text(
    `Fecha de generación: ${new Date().toLocaleDateString("es-ES")}`,
    14,
    28,
  );

  autoTable(doc, {
    startY: 35,

    head: [
      [
        "Fecha",
        "Curso",
        "Estado",
        "Precio",
      ],
    ],


     body: purchases.map((purchase) => [
      new Date(purchase.createdAt).toLocaleDateString(
        "es-ES",
      ),
      purchase.title,
      "Pagado",
      purchase.price === 0
        ? "Gratis"
        : `$${purchase.price}`,
    ]),

    foot: [
      [
        "",
        "",
        "Total",
        formatTotal,
      ],
    ],
  });

  doc.save("mis-pedidos.pdf");
};


 