"use client";
import { Button } from "@/components/ui/button";
import { useLocation } from "@/hooks/useLocation";
import { MapPin } from "lucide-react";
import { useRouter } from "next/navigation";

export function WeatherRefetch() {
  const { refetch } = useLocation();
  const router = useRouter();
  function handleRefetch() {
    refetch();
    router.push("/today");
  }
  return (
    <Button
      variant="ghost"
      size="icon-lg"
      className="active:scale-90 sm:active:scale-100 transition-transform min-h-11 min-w-11 sm:min-h-0 sm:min-w-0"
      onClick={handleRefetch}
    >
      <MapPin className="size-5" />
    </Button>
  );
}
