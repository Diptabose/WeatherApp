import { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

interface WeatherLoadingProps extends PropsWithChildren {
  isLoading: boolean;
  spinnerProps?: React.ComponentProps<"svg">;
  containerProps?: React.ComponentProps<"div">;
}

export function WeatherLoading({
  children,
  isLoading,
}: WeatherLoadingProps) {
  if (isLoading) {
    return (
      <div
        className={cn(
          "h-full flex items-center justify-center",

        )}
      >
        Loading...

      </div>
    );
  }
  return children;
}
