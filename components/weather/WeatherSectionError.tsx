"use client";

import { catchError, type ErrorInfo } from "next/error";
import { Button } from "@/components/ui/button";
import { TriangleAlert } from "lucide-react";

function SectionErrorFallback(
  { title }: { title: string },
  { retry }: ErrorInfo,
) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-lg bg-surface py-6 text-center">
      <TriangleAlert className="size-6 text-destructive" />
      <p className="text-sm text-muted-foreground">
        Couldn&apos;t load {title}.
      </p>
      <Button size="sm" variant="outline" onClick={() => retry()}>
        Try again
      </Button>
    </div>
  );
}

export const WeatherSectionErrorBoundary = catchError(SectionErrorFallback);
