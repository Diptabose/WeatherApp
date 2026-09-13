import { useEffect, useState } from "react";

interface SavedLocation {
  lat: number;
  lon: number;
  place: string;
}

const STORAGE_NAME = "user-locations";

export function useSavedLocations() {
  const [locations, setLocations] = useState<SavedLocation[]>([]);
  useEffect(() => {
    const storedLocations = window.localStorage.getItem(STORAGE_NAME);
    if (storedLocations) {
      const parsedLocations = JSON.parse(storedLocations) as SavedLocation[];
      setLocations(parsedLocations);
    }
  }, []);

  function addLocation(loc: SavedLocation) {
    // find returns the value or undefined
    const isThereLocation = locations.find(
      (location) => location.place === loc.place,
    );
    if (!isThereLocation) {
      const newLocations = [loc, ...locations];
      setLocations(newLocations);
      addToStorage(newLocations);
    }
  }

  function addToStorage(places: SavedLocation[]) {
    window.localStorage.setItem(STORAGE_NAME, JSON.stringify(places));
  }

  function removeLocation(place: string) {
    let removedLocation = locations.filter((element) => {
      return element.place !== place;
    });
    setLocations(removedLocation);
    addToStorage(removedLocation);
  }

  return { locations, addLocation, removeLocation };
}
