import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { randomNumber } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const locationImages = [
  "/bg/foggy.jpeg",
  "/bg/night.jpg",
  "/bg/night1.jpg",
  "/bg/night2.jpg",
  "/bg/rainy.jpeg",
  "/bg/sunrise.jpeg",
];

interface LocationCardProps {
  lat: number;
  lon: number;
  place: string;
  removeLocation: (place: string) => void;
  setOverride: (coords: { lat: number; lon: number }) => void;
}

export function LocationCard({
  lat,
  lon,
  place,
  removeLocation,
  setOverride,
}: LocationCardProps) {
  const router = useRouter();
  const bg = useRef(() => locationImages[randomNumber(5)]);

  function handleCardClick() {
    setOverride({ lat, lon });
    router.push("/today");
  }

  return (
    <Card onClick={handleCardClick} className="bg-surface p-2 gap-1 relative">
      <CardHeader className="justify-between px-2">
        <CardTitle> {place}</CardTitle>
      </CardHeader>
      <CardContent className="px-2">
        <div className="flex items-center justify-between text-sm">
          <div>
            <div>
              <span className="mr-2">Longitude</span>
              <span>{lat}</span>
            </div>
            <div>
              <span className="mr-2">Latitude</span>
              <span>{lon}</span>
            </div>
          </div>
        </div>
      </CardContent>
      <Button
        variant="outline"
        className="absolute size-8 sm:size-5 top-1/2 right-2 -translate-y-1/2 rounded-full min-w-0 shrink-0"
        onClick={(event) => {
          event.stopPropagation();
          removeLocation(place);
        }}
      >
        <X className="size-3 sm:size-2" />
      </Button>
    </Card>
  );
}
