import { Skeleton } from "@/components/ui/skeleton";

export function SavedLocationsSkeleton() {
  return (
    <div className="py-2 h-full flex flex-col gap-2">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(auto,200px))] gap-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-24 w-full rounded-lg" />
        ))}
      </div>
    </div>
  );
}
