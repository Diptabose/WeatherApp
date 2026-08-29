import { MapPin, MapPinPlus, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WeatherSearch } from "./WeatherSearch";
import { WeatherTabs } from "./WeatherTabs";

export function WeatherHeader() {

  return (
    <header className="flex flex-col shadow-md">
      <div className="flex gap-2 items-center">
        <Button variant="ghost" size="icon">
          <MapPin />
        </Button>
        <WeatherSearch />
        <Button variant="ghost" size="icon">
          <MapPinPlus />
        </Button>
        <Button variant="ghost" size="icon">
          <Menu />
        </Button>
      </div>
      <div>
        <WeatherTabs />
      </div>
    </header>
  );
}
