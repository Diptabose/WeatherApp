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
    <Button variant="ghost" size="icon" onClick={handleRefetch}>
      <MapPin className="size-5" />
    </Button>
  );
}
