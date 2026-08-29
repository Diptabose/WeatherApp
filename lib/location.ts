export function getLocation(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    globalThis.navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        resolve(position);
      },
      (error: GeolocationPositionError) => {
        reject(error);
      }
    );
  });
}
