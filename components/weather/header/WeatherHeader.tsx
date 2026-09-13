import { MapPinPlus, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WeatherSearch } from "./WeatherSearch";
import { WeatherTabs } from "./WeatherTabs";
import { WeatherRefetch } from "./WeatherRefetch";
import Link from "next/link";
import { WeatherConfigurationDialog } from "./WeatherConfigurationDialog";

export function WeatherHeader() {
  return (
    <header className="flex flex-col shadow-sm gap-4 sm:gap-3 px-4 sm:px-3 pt-4 sm:pt-3 mt-safe">
      <div className="flex gap-4 sm:gap-2 items-center justify-between">
        <div className="hidden sm:block">
          <WeatherRefetch />
        </div>
        <span className="min-w-0 flex-1 truncate text-sky-600 font-semibold text-xl sm:hidden">
          WeatherApp
        </span>
        <div className="hidden sm:block w-full">
          <WeatherSearch />
        </div>
        <div className="flex items-center gap-2 sm:gap-1 shrink-0">
          <div className="sm:hidden">
            <WeatherRefetch />
          </div>
          <Button
            variant="ghost"
            size="icon-lg"
            nativeButton={false}
            className="active:scale-90 sm:active:scale-100 transition-transform min-h-11 min-w-11 sm:min-h-0 sm:min-w-0"
            render={<Link href="/saved-locations" />}
          >
            <MapPinPlus className="size-5" />
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
