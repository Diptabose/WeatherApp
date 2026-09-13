import { Skeleton } from "@/components/ui/skeleton";

const WeeklyLoading = () => {
  return (
    <div className="h-full overflow-hidden">
      <div className="flex flex-col gap-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="h-16 w-full rounded-md" />
        ))}
      </div>
    </div>
  );
};

export default WeeklyLoading;
