"use client";

import {
  AreaChart,
  Area,
  Tooltip,
  XAxis,
  ResponsiveContainer,
  LabelList,
} from "recharts";

interface WeatherPlotProps {
  hourly: {
    dt: number;
    temp: number;
    weather: { icon: string }[];
  }[];
}

function formatHour(dt: number) {
  const d = new Date(dt * 1000);
  const afterTwelve = d.getHours() > 11;
  const hour = afterTwelve ? d.getHours() - 12 : d.getHours();
  return `${hour} ${afterTwelve ? "PM" : "AM"}`;
}

function WeatherPlot({ hourly }: WeatherPlotProps) {
  const recharPlot = (
    <div className="max-w-full overflow-x-auto overflow-y-hidden scrollbar-none [&_.recharts-surface]:outline-none [&_.recharts-wrapper]:outline-none">
      <div
        className="mx-auto text-foreground/70"
        style={{ width: hourly.length * 60, height: 200 }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart<WeatherPlotProps["hourly"][0]>
            data={hourly}
            margin={{ top: 20, left: 20, right: 20 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-amber-200)"
                  stopOpacity={0.7}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-amber-200)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="dt"
              tickFormatter={formatHour}
              tickLine={false}
              axisLine={{ stroke: "currentColor", strokeOpacity: 0.2 }}
              tick={{ fontSize: 11, fill: "currentColor" }}
            />
            <Tooltip
              wrapperClassName="text-sm rounded-md overflow-hidden"
              labelFormatter={(dt) => formatHour(Number(dt))}
              formatter={(value) => [`${value}°C`, "Temp"]}
              contentStyle={{
                backgroundColor: "var(--color-white)",
                border: "1px solid var(--color-gray-200)",
              }}
              labelStyle={{ color: "var(--color-gray-500)" }}
            />
            <Area
              type="monotone"
              dataKey="temp"
              stroke="var(--color-amber-400)"
              strokeWidth={2}
              activeDot={{ stroke: "var(--color-amber-400)" }}
              fillOpacity={1}
              fill="url(#colorUv)"
              isAnimationActive={true}
              animationBegin={200}
              animationDuration={1300}
            >
              <LabelList
                dataKey="temp"
                position="top"
                style={{ fontSize: 11, fill: "currentColor" }}
                formatter={(value) => `${value}°C`}
              />
            </Area>
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
  return recharPlot;
}
export default WeatherPlot;
