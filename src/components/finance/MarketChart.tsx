import { useMemo } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { generateSeries, type Range } from "@/mock/series";
import { formatAxisTime, formatPrice } from "@/lib/format";

interface MarketChartProps {
  seriesKey: string;
  price: number;
  currency?: string;
  range: Range;
  up?: boolean;
  height?: number;
}

export function MarketChart({
  seriesKey,
  price,
  currency = "USD",
  range,
  up = true,
  height = 320,
}: MarketChartProps) {
  const data = useMemo(
    () => generateSeries(seriesKey, price, range),
    [seriesKey, price, range],
  );
  const color = up ? "var(--up)" : "var(--down)";
  const gradientId = `area-${seriesKey}-${range}`;
  const compactAxis = range !== "1D";

  return (
    <div style={{ height }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.35} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="var(--border)" vertical={false} />
          <XAxis
            dataKey="t"
            tickFormatter={(v: string) =>
              compactAxis
                ? formatAxisTime(v, true)
                : new Date(v).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
            }
            minTickGap={40}
            tickLine={false}
            axisLine={false}
            tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
          />
          <YAxis
            domain={["auto", "auto"]}
            width={70}
            tickLine={false}
            axisLine={false}
            tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
            tickFormatter={(v: number) => formatPrice(v, currency)}
          />
          <Tooltip
            cursor={{ stroke: "var(--border)", strokeWidth: 1 }}
            content={({ active, payload, label }) => {
              if (!active || !payload?.length) return null;
              const value = payload[0]?.value as number;
              return (
                <div className="panel px-3 py-2 text-xs">
                  <p className="text-muted-foreground">{formatAxisTime(String(label))}</p>
                  <p className="num mt-1 text-sm font-semibold text-foreground">
                    {formatPrice(value, currency)}
                  </p>
                </div>
              );
            }}
          />
          <Area
            type="monotone"
            dataKey="v"
            stroke={color}
            strokeWidth={2}
            fill={`url(#${gradientId})`}
            activeDot={{ r: 4, fill: color, stroke: "var(--background)", strokeWidth: 2 }}
            animationDuration={550}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}