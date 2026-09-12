interface AirQualityIndicatorProps {
  aqi: number;
}

export function AirQualityIndicator({ aqi }: AirQualityIndicatorProps) {
  return (
    <div className="h-36 w-36 rounded-full bg-rose-600 my-2 flex flex-col items-center justify-center">
      <span className="text-4xl tracking-wide 4xm:text-xl">AQI</span>
      <h1 className="text-3xl font-bold">{aqi}</h1>
    </div>
  );
}
