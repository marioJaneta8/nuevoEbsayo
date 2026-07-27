import { getUserReceipts } from "@/actions/getReceipStripe";
import { getUserPurchases } from "@/actions/getUserPurchases";
import { auth } from "@clerk/nextjs/server";
import { ReceiptText } from "lucide-react";
import { OrderLists } from "./Components";


const OrdersPage = async () => {
  const { userId } = await auth();

  if (!userId) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Please login to view your orders</p>
      </div>
    );
  }

  const purchases = await getUserPurchases(userId);
  const receipts = await getUserReceipts(userId);

  

  return (
    <div className="my-4 mx-6 border rounded-lg bg-white p-6">
      <div className="flex items-center mb-6 gap-1">
      <div className="p-2 rounded-full bg-violet-400">
        <ReceiptText className="w-5 h-5 text-white"/>

      </div>
      <h1 className="text-xl font-semibold">Todos Mis Pedidos</h1>

      </div>

       <OrderLists
       purchases={purchases}
       receipts={receipts}
       />

    </div> 
  );
};

export default OrdersPage;