interface WeatherTitleProps {
  name: string;
}

export function WeatherSectionTitle({ name }: WeatherTitleProps) {
  return (
    <div className="border-b-2 min-w-0">
      <span className="font-bold text-lg sm:text-xl wrap-break-word">{name}</span>
    </div>
  );
}
