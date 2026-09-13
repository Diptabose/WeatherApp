import { Skeleton } from "@/components/ui/skeleton";

export function WeatherHourlySkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton className="h-5 w-16" />
      <div className="flex gap-2 py-2 overflow-hidden">
        {Array.from({ length: 8 }).map((_, index) => (
          <Skeleton key={index} className="min-w-12 h-24 shrink-0 rounded" />
        ))}
      </div>
      <Skeleton className="h-[200px] w-full rounded-md" />
    </div>
  );
}
