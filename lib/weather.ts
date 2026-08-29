import { LocationSearch } from "@/types/search.types";

export function getLabel(item: LocationSearch) {
  return `${item.name}, ${item?.state} ${item.country}`;
}

export function greeter() {
  let date = new Date();
  let h = date.getHours();
  if (h >= 0 && h <= 11) {
    return "Good Morning";
  } else if (h >= 12 && h <= 16) {
    return "Good Afternoon";
  } else {
    return "Good Evening";
  }
}
