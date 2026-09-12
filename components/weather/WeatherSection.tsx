interface WeatherTitleProps {
  name: string;
}

export function WeatherSectionTitle({ name }: WeatherTitleProps) {
  return (
    <div className="border-b-2">
      <span className="font-bold text-xl">{name}</span>
    </div>
  );
}
