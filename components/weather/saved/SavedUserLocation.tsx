"use client";
import { useSavedLocations } from "@/hooks/useSavedLocations";
import { LocationCard } from "./LocationCard";
import { Button } from "@/components/ui/button";
import { MapPinPen, Plus } from "lucide-react";
import { PropsWithChildren } from "react";
import { useLocationManagement } from "@/hooks/useLocationManagement";

interface SavedUserLocationsProps {
  place: string;
  lat: number;
  lon: number;
}

interface SavedLocationEmptyProps extends PropsWithChildren {
  isEmpty: boolean;
}

function SavedLocationEmpty({ children, isEmpty }: SavedLocationEmptyProps) {
  if (isEmpty) {
    return (
      <div className="flex flex-col justify-center items-center gap-2 justify-self-center my-auto">
        <MapPinPen className="size-10" />
        <div className="text-center flex flex-col gap-2">
          <span>No locations saved.</span>
          <span className="text-center">
            Click on the '+' icon to add the current location.
          </span>
        </div>
      </div>
    );
  }
  return children;
}

function SavedLocationRoot({ children }: PropsWithChildren) {
  return <div className="py-2 h-full flex flex-col">{children}</div>;
}

function SavedLocationGrid({ children }: PropsWithChildren) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(auto,200px))] gap-2">
      {children}
    </div>
  );
}

export function SavedUserLocations({
  lat,
  lon,
  place,
}: SavedUserLocationsProps) {
  const { removeLocation, addLocation, locations } = useSavedLocations();
  const { setOverride } = useLocationManagement();

  const userLocationCards = (
    <SavedLocationRoot>
      <SavedLocationEmpty isEmpty={locations.length === 0}>
        <SavedLocationGrid>
          {locations.map((loc) => {
            return (
              <LocationCard
                {...loc}
                removeLocation={removeLocation}
                setOverride={setOverride}
                key={loc.lat + loc.lon + loc.place}
              />
            );
          })}
        </SavedLocationGrid>
      </SavedLocationEmpty>
      <div className="flex flex-col items-end fixed bottom-0 self-end mb-4 mr-4 right-0">
        <Button
          aria-label="add-icon"
          className="flex items-center justify-center size-10 rounded-full shadow-md"
          onClick={() => {
            addLocation({ lat, lon, place });
          }}
          disabled={!(lat && place && lon)}
        >
          <Plus />
        </Button>
      </div>
    </SavedLocationRoot>
  );
  return userLocationCards;
}
