import { Skeleton } from "@/components/ui/skeleton";

const WeeklyLoading = () => {
  return (
    <div className="h-full overflow-hidden">
      <div className="flex flex-col gap-2">
        {Array.from({ length: 10 })
          .fill(0)
          .map((_, index) => {
            return <Skeleton key={index} className="h-20 w-full rounded-md" />;
          })}
      </div>
    </div>
  );
};

export default WeeklyLoading;
