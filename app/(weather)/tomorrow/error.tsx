"use client";

import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <Button onClick={() => retry()}>Try again</Button>
    </div>
  );
}
