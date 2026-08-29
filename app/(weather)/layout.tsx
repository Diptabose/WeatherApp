import { WeatherHeader } from "@/components/weather/header/WeatherHeader";
import { Weather } from "@/components/weather/Weather";
import { ReactNode } from "react";

const WeatherLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full overflow-y-auto flex flex-col">
      <Weather.Error>
        <Weather.Loading>
          <WeatherHeader />
          <div className="h-full flex-1 overflow-y-auto">{children}</div>
        </Weather.Loading>
      </Weather.Error>
    </div>
  );
};

export default WeatherLayout;
