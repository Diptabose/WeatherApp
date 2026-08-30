"use client";

import { Button } from "@/components/ui/button";
import { TriangleAlert } from "lucide-react";

export default function ErrorPage({
    error,
    retry,
}: {
    error: Error & { digest?: string };
    retry: () => void;
}) {
    return (
        <div className="flex flex-col h-full items-center justify-center">
            <div className="flex flex-col items-center gap-2">
                <TriangleAlert className="size-10" />
                <div className="flex flex-col items-center gap-2">
                    <h2>Something went wrong!</h2>
                    <Button onClick={() => retry()}>Try again</Button>
                </div>
            </div>
        </div>
    );
}
