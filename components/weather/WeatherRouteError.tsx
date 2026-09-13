"use client";

import { Button } from "@/components/ui/button";
import { TriangleAlert } from "lucide-react";

interface WeatherRouteErrorProps {
  error: Error & { digest?: string };
  retry: () => void;
  description?: string;
}

export function WeatherRouteError({
  error,
  retry,
  description = "We couldn't load this page. Please try again.",
}: WeatherRouteErrorProps) {
  return (
    <div className="flex flex-col h-full items-center justify-center gap-4 px-4 text-center">
      <TriangleAlert className="size-10 text-destructive" />
      <div className="flex flex-col items-center gap-1">
        <h2 className="text-lg font-semibold">Something went wrong!</h2>
        <p className="max-w-sm text-sm text-muted-foreground">{description}</p>
        {process.env.NODE_ENV !== "production" && (
          <p className="mt-1 text-xs text-muted-foreground/70">
            {error.message}
            {error.digest ? ` (${error.digest})` : ""}
          </p>
        )}
      </div>
      <Button onClick={() => retry()}>Try again</Button>
    </div>
  );
}
