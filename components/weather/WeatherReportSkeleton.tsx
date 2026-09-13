import { Skeleton } from "@/components/ui/skeleton";

export function WeatherReportSkeleton() {
  return (
    <div className="flex flex-col min-w-0 justify-center gap-2">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-7 w-40" />
      <Skeleton className="h-4 w-32" />
      <div className="flex flex-col items-center gap-2 my-4">
        <Skeleton className="size-32 rounded-full" />
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-14 w-24" />
      </div>
      <div className="flex justify-evenly gap-2 my-2 md:w-1/2 md:mx-auto">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="flex flex-col items-center gap-2">
            <Skeleton className="size-10 rounded-full" />
            <Skeleton className="h-3 w-10" />
            <Skeleton className="h-3 w-14" />
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-28 w-full rounded-lg" />
      </div>
    </div>
  );
}
