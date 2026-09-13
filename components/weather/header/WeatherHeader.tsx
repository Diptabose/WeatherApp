import { MapPinPlus, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WeatherSearch } from "./WeatherSearch";
import { WeatherTabs } from "./WeatherTabs";
import { WeatherRefetch } from "./WeatherRefetch";
import Link from "next/link";
import { WeatherConfigurationDialog } from "./WeatherConfigurationDialog";

export function WeatherHeader() {
  return (
    <header className="flex flex-col shadow-md gap-2 px-2 pt-2">
      <div className="flex gap-2 items-center justify-between">
        <div className="hidden sm:block">
          <WeatherRefetch />
        </div>
        <span className="min-w-0 flex-1 truncate text-sky-600 font-semibold text-xl sm:hidden">
          WeatherApp
        </span>
        <div className="hidden sm:block w-full">
          <WeatherSearch />
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className="sm:hidden">
            <WeatherRefetch />
          </div>
          <Button variant="ghost" size="icon">
            <Link href="/saved-locations">
              <MapPinPlus className="size-5" />
            </Link>
          </Button>
          <WeatherConfigurationDialog />
        </div>
      </div>
      <div className="sm:hidden">
        <WeatherSearch />
      </div>
      <div>
        <WeatherTabs />
      </div>
    </header>
  );
}
