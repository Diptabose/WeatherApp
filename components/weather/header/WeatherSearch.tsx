"use client";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { useLocation } from "@/hooks/useLocation";
import { getLabel } from "@/lib/weather";
import { search } from "@/actions/search";
import { LocationSearch } from "@/types/search.types";
import { ComboboxRoot } from "@base-ui/react/combobox";
import { useDebouncedCallback } from "@tanstack/react-pacer";
import { startTransition, useState } from "react";

export function WeatherSearch() {
  const { setOverride } = useLocation();
  const [searchedLocation, setSearchedLocation] =
    useState<LocationSearch | null>(null);
  const [searchedLocations, setSearchedLocations] = useState<LocationSearch[]>(
    [],
  );

  function onInputValueChange(
    inputValue: string,
    event: ComboboxRoot.ChangeEventDetails,
  ) {
    if (event.reason === "item-press" || inputValue.trim() === "") {
      return;
    }
    startTransition(async () => {
      const results = await search(inputValue);
      setSearchedLocations(results);
    });
  }

  const onInputValueChangeDebounced = useDebouncedCallback(onInputValueChange, {
    wait: 300,
  });

  return (
    <Combobox
      value={searchedLocation}
      items={searchedLocations}
      itemToStringLabel={getLabel}
      onOpenChangeComplete={(open) => {
        if (!open) {
          setSearchedLocations([]);
        }
      }}
      onInputValueChange={onInputValueChangeDebounced}
      onValueChange={(value) => {
        if (value) {
          setSearchedLocation(value);
          setOverride({ lat: value.lat, lon: value.lon });
        }
      }}
    >
      <ComboboxInput
        className="w-full has-[[data-slot=input-group-control]:focus-visible]:ring-0 has-[[data-slot=input-group-control]:focus-visible]:border-ring rounded-l-full rounded-r-full bg-slate-100 border border-slate-200"
        showTrigger={false}
        placeholder="Search for places"
        inputClassName="items placeholder:text-sm"
      />
      <ComboboxContent>
        <ComboboxEmpty>No places found.</ComboboxEmpty>
        <ComboboxList>
          {(country: LocationSearch) => (
            <ComboboxItem key={country.lat + country.lon} value={country}>
              {country.name}, {country?.state} {country.country}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
