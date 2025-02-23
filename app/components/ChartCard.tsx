"use client";

import { TrendingDown, TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import useNotesInsights from "../(root)/notes/useNotesInsights";
import { useRef } from "react";
import Spinner from "./Spinner";
// const chartData = [
//   { month: "January", Notes: 4 },
//   { month: "February", Notes: 7 },
//   { month: "March", Notes: 2 },
//   { month: "April", Notes: 11 },
//   { month: "May", Notes: 6 },
//   { month: "June", Notes: 3 },
// ];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#18181b",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

//Animate the data using a loader...

export function ChartCard() {
  const { insights, trend, isFetching } = useNotesInsights();
  const currentYear = useRef(new Date().getFullYear());
  console.log(insights);
  console.log(trend);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        {!isFetching ? (
          <CardDescription>
            {insights[0]?.month}- {insights[insights.length - 1]?.month}{" "}
            {currentYear.current}
          </CardDescription>
        ) : (
          // <div className="w-full h-5 rounded-md skeleton"></div>
          <></>
        )}
      </CardHeader>
      {isFetching ? (
        <div className="flex items-center h-[317px] w-full justify-center">
          <Spinner height={20} width={20} isWhite={false} />
        </div>
      ) : (
        <>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <LineChart
                accessibilityLayer
                data={insights}
                margin={{
                  top: 6,
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  interval={0}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Line
                  dataKey="Notes"
                  type="natural"
                  stroke="var(--color-desktop)"
                  strokeWidth={2}
                  dot={{
                    fill: "var(--color-desktop)",
                  }}
                  activeDot={{
                    r: 6,
                  }}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            {trend === null || trend.status === "empty" ? (
              <div className="flex gap-2 font-medium leading-none">
                Have fun creating notes via the editor tab
              </div>
            ) : (
              <div className="flex gap-2 font-medium leading-none">
                {trend.status === "up" ? "Trending up" : "Reduced down"} by{" "}
                {trend?.percentage}% this month{" "}
                {trend.status === "up" ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
              </div>
            )}
            <div className="leading-none text-muted-foreground">
              Showing number of notes created over the past {insights.length}{" "}
              months
            </div>
          </CardFooter>
        </>
      )}
    </Card>
  );
}
