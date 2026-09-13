import { Skeleton } from "@/components/ui/skeleton";

export function WeatherAqiSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="h-5 w-36" />
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-2 sm:gap-4">
        <Skeleton className="size-36 rounded-full mx-auto" />
        <Skeleton className="h-40 w-full sm:w-64 rounded-lg" />
      </div>
    </div>
  );
}
