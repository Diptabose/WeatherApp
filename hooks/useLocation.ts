import { LocationContext } from "@/providers/LocationProvider";
import { useContext } from "react";

export const useLocation = () => useContext(LocationContext);
