import Link from "next/link";
import { Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { randomNumber } from "@/lib/utils";
import { useLocationManagement } from "@/hooks/useLocationManagement";
import { useRouter } from "next/navigation";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const locationImages = [
    "/bg/foggy.jpeg",
    "/bg/night.jpg",
    "/bg/night1.jpg",
    "/bg/night2.jpg",
    "/bg/rainy.jpeg",
    "/bg/sunrise.jpeg",
];

interface LocationCardProps {
    lat: number,
    lon: number,
    place: string,
    removeLocation: (place: string) => void,
    setOverride: (coords: { lat: number, lon: number }) => void
}

export function LocationCard({ lat, lon, place, removeLocation, setOverride }: LocationCardProps) {

    const router = useRouter();
    const bg = useRef(() => locationImages[randomNumber(5)]);

    function handleCardClick() {
        setOverride({ lat, lon });
        router.push('/today');
    }
    const lt = (
        <div
            className="p-4 m-2 rounded-md flex shadow-md object-cover cursor-pointer text-xs overflow-hidden"
        >
            <div
                className="flex-1"
                onClick={handleCardClick}
            >
                <div className="font-bold text-xl">
                    {place}
                </div>
                <div className="my-1">
                    <span className="mr-2">Longitude</span>
                    <span>{lat}</span>
                </div>
                <span className="mr-2">Latitude</span>
                <span>{lon}</span>
            </div >
            <div
                className="flex flex-col items-center justify-center">
                <Button variant="ghost" className="size-4 shrink-0 rounded-full" onClick={() => {
                    removeLocation(place);
                }}>
                    <Minus />
                </Button>
            </div>
        </div >
    );
    return (
        <Card onClick={handleCardClick} className="relative">
            <CardHeader className="justify-between">
                <CardTitle> {place}</CardTitle>

            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between">
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
                    <Button variant="ghost" className="absolute top-1/3 left-[92%] size-12 rounded-full" onClick={(event) => {
                        event.stopPropagation();
                        removeLocation(place);
                    }}>
                        <Minus />
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
