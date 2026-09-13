"use client";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { Spinner } from "@/components/ui/spinner";
import { useLocation } from "@/hooks/useLocation";
import { getLabel } from "@/lib/weather";
import { search } from "@/actions/search";
import { LocationSearch } from "@/types/search.types";
import { ComboboxRoot } from "@base-ui/react/combobox";
import { useDebouncedCallback } from "@tanstack/react-pacer";
import { useState, useTransition } from "react";

export function WeatherSearch() {
  const { setOverride } = useLocation();
  const [searchedLocation, setSearchedLocation] =
    useState<LocationSearch | null>(null);
  const [searchedLocations, setSearchedLocations] = useState<LocationSearch[]>(
    [],
  );
  const [isSearching, startSearchTransition] = useTransition();

  function onInputValueChange(
    inputValue: string,
    event: ComboboxRoot.ChangeEventDetails,
  ) {
    if (event.reason === "item-press" || inputValue.trim() === "") {
      return;
    }
    startSearchTransition(async () => {
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
        (document.activeElement as HTMLElement | null)?.blur();
      }}
    >
      <ComboboxInput
        className="w-full h-11 sm:h-8 has-[[data-slot=input-group-control]:focus-visible]:ring-0 has-[[data-slot=input-group-control]:focus-visible]:border-ring rounded-l-full rounded-r-full bg-surface"
        showTrigger={false}
        placeholder="Search for places"
        inputClassName="items text-base sm:text-sm placeholder:text-base sm:placeholder:text-sm"
      />
      <ComboboxContent className="min-w-(--anchor-width)">
        {isSearching ? (
          <div className="flex items-center justify-center gap-2 py-4 text-sm text-muted-foreground">
            <Spinner className="size-4" />
            Searching...
          </div>
        ) : (
          <>
            <ComboboxEmpty>No places found.</ComboboxEmpty>
            <ComboboxList>
              {(country: LocationSearch) => (
                <ComboboxItem key={country.lat + country.lon} value={country}>
                  {country.name}, {country?.state} {country.country}
                </ComboboxItem>
              )}
            </ComboboxList>
          </>
        )}
      </ComboboxContent>
    </Combobox>
  );
}
