import { GeoPosition } from "@/types/location.types";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export function useCoordinates(data: GeoPosition | null) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (data?.lat && data?.lon) {
      router.replace(`${pathname}?lat=${data?.lat}&lon=${data?.lon}`);
    }
  }, [pathname, data]);
}
