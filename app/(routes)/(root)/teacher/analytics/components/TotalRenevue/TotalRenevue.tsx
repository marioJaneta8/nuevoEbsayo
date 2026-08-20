"use client";

import { TrendingUp } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
} from "recharts";

import { useRenevue } from "./useRenevue";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const chartConfig = {
  revenue: {
    label: "Ingresos",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export const TotalRenevue = () => {
  const {
    data = [],
    isLoading,
    isError,
  } = useRenevue();


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
    <Card>
      <CardHeader>
        <CardTitle>Ingresos</CardTitle>

        <CardDescription>
          Ingresos totales de los últimos 6 meses
        </CardDescription>
      </CardHeader>

      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="min-h-75 w-full"
        >
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
              top: 10,
              bottom: 10,
            }}
          >
            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) =>
                value.slice(0, 3)
              }
            />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  formatter={(value) =>
                    `$${Number(value).toLocaleString("es-CL")}`
                  }
                />
              }
            />

            <Line
              dataKey="revenue"
              type="natural"
              stroke="var(--color-revenue)"
              strokeWidth={3}
              dot={{
                fill: "var(--color-revenue)",
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium">
          Ingresos de los últimos 6 meses
          <TrendingUp className="h-4 w-4" />
        </div>

        <div className="leading-none text-muted-foreground">
          Datos obtenidos directamente desde las compras registradas
        </div>
      </CardFooter>
    </Card>
  );
};