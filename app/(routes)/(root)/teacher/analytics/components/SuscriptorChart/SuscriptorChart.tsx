"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

import { useSuscriptorChart } from "./useSuscriptorChart";

const chartConfig = {
  users: {
    label: "Usuarios",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function SuscriptorChart() {
  const {
    data = [],
    isLoading,
    isError,
  } = useSuscriptorChart();


 

  if (isLoading) {
    return (
      <div className="flex h-75 items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Cargando estadísticas...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-75 items-center justify-center">
        <p className="text-sm text-destructive">
          No se pudieron cargar las estadísticas.
        </p>
      </div>
    );
  }

  return (
      <div className="space-y-4">
      {/* TÍTULO */}
      <div>
        <h2 className="text-xl font-bold tracking-tight">
          Últimos suscriptores
        </h2>

        <p className="text-sm text-muted-foreground">
          Suscriptores registrados durante los últimos 6 meses
        </p>
      </div>
    <ChartContainer
      config={chartConfig}
      className="min-h-75 w-full"
    >
      <BarChart
        accessibilityLayer
        data={data}
      >
        <CartesianGrid vertical={false} />

        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
        />

        <ChartTooltip
          content={<ChartTooltipContent />}
        />

        <Bar
          dataKey="users"
          fill="var(--color-users)"
          radius={6}
        />
      </BarChart>
    </ChartContainer>
    </div>
  );
}