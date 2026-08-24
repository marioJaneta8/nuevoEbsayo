"use client";

import {
  useTable,
  type ColumnDef,
  type RowData,
  type ColumnFiltersState,
  type SortingState,
} from "@tanstack/react-table";


import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { features, type DataTableFeatures } from "./data-table-features";
import { useState } from "react";

interface DataTableProps<TData extends RowData> {
  columns: ColumnDef<DataTableFeatures, TData>[];
  data: TData[];
}



export function DataTable<TData extends RowData>({
  columns,
  data,
}: DataTableProps<TData>) {
 const [sorting, setSorting] = useState<SortingState>([]);
const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useTable({
    features,
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      columnFilters,
    },
  });

  return (
    <div className="">
      <div>
        <div className="flex items-center py-4">
          <Input
            placeholder="Filter emails..."
            value={
              (table.getColumn("userEmail")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("userEmail")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>
      </div>

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : (
                      <table.FlexRender header={header} />
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    <table.FlexRender cell={cell} />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
