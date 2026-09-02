import { MapPinPlus, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WeatherSearch } from "./WeatherSearch";
import { WeatherTabs } from "./WeatherTabs";
import { WeatherRefetch } from "./WeatherRefetch";
import Link from "next/link";
import { WeatherConfigurationDialog } from "./WeatherConfigurationDialog";

export function WeatherHeader() {
  return (
    <header className="flex flex-col shadow-md">
      <div className="flex gap-2 items-center">
        <WeatherRefetch />
        <WeatherSearch />
        <Button variant="ghost" size="icon">
          <Link href="/saved-locations">
            <MapPinPlus />
          </Link>
        </Button>
        <WeatherConfigurationDialog />
      </div>
      <div>
        <WeatherTabs />
      </div>
    </header>
  );
}
