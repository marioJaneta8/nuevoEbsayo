import { getLastPurchases } from "@/actions/getLastPurchases";
import { DataTable } from "./Data-table";
import { columns } from "./columns";

export const Payments = async () => {
  const lastPurchases = await getLastPurchases();

  return (
    <div className="mx-auto my-10 w-full border shadow-md bg-white p-4 rounded-md">
      <DataTable columns={columns} data={lastPurchases} />
    </div>
  );
};
