import { PropsWithChildren } from "react";
import { Spinner } from "../ui/spinner";
import { cn } from "@/lib/utils";

interface WeatherLoadingProps extends PropsWithChildren {
  isLoading: boolean;
  spinnerProps?: React.ComponentProps<"svg">;
  containerProps?: React.ComponentProps<"div">;
}

export function WeatherLoading({
  children,
  isLoading,
  spinnerProps,
  containerProps,
}: WeatherLoadingProps) {
  if (isLoading) {
    return (
      <div
        className={cn(
          "h-full flex items-center justify-center",
          containerProps?.className,
        )}
        {...containerProps}
      >
        <Spinner
          className={cn("size-12", spinnerProps?.className)}
          {...spinnerProps}
        />
      </div>
    );
  }
  return children;
}
