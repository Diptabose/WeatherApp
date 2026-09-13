"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocation } from "@/hooks/useLocation";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function WeatherTabs() {
  const pathName = usePathname();
  const { geoPosition } = useLocation();
  return (
    <Tabs
      value={pathName.slice(1)}
      className="items-center-safe w-full overflow-x-auto no-scrollbar"
    >
      <TabsList
        variant="line"
        className="gap-4 sm:gap-10 justify-center-safe"
      >
        <TabsTrigger
          value="today"
          nativeButton={false}
          className="text-base sm:text-sm px-3 py-1.5 sm:px-1.5 sm:py-0.5"
          render={
            <Link
              href={`/today?lat=${geoPosition.lat}&lon=${geoPosition?.lon}`}
              prefetch={true}
            >
              Today
            </Link>
          }
        />
        <TabsTrigger
          value="tomorrow"
          nativeButton={false}
          className="text-base sm:text-sm px-3 py-1.5 sm:px-1.5 sm:py-0.5"
          render={
            <Link
              href={`/tomorrow?lat=${geoPosition?.lat}&lon=${geoPosition?.lon}`}
              prefetch={true}
            >
              Tomorrow
            </Link>
          }
        />
        <TabsTrigger
          value="weekly"
          nativeButton={false}
          className="text-base sm:text-sm px-3 py-1.5 sm:px-1.5 sm:py-0.5"
          render={
            <Link
              href={`/weekly?lat=${geoPosition?.lat}&lon=${geoPosition?.lon}`}
              prefetch={true}
            >
              Weekly (5)
            </Link>
          }
        />
      </TabsList>
    </Tabs>
  );
}
