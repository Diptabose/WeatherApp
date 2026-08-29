import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export function useCoordinates(data: GeolocationPosition | null) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (data?.coords?.latitude && data?.coords?.longitude) {
      router.replace(
        `${pathname}?lat=${data?.coords.latitude}&lon=${data?.coords.longitude}`,
      );
    }
  }, [pathname, data]);
}
