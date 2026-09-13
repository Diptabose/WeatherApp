import { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";
import { Spinner } from "@/components/ui/spinner";

interface WeatherLoadingProps extends PropsWithChildren {
  isLoading: boolean;
  spinnerProps?: React.ComponentProps<"svg">;
  containerProps?: React.ComponentProps<"div">;
}

export function WeatherLoading({ children, isLoading }: WeatherLoadingProps) {
  if (isLoading) {
    return (
      <div
        className={cn("h-full flex flex-col items-center justify-center gap-2")}
      >
        <Spinner className="size-8 text-sky-600" />
        <span className="text-sm text-muted-foreground">
          Finding your location...
        </span>
      </div>
    );
  }
  return children;
}
