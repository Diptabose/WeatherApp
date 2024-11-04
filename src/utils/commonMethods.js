import { GPSMessages } from "./commonMessages";

export const getEndpoints = (pos)=> [`https://api.openweathermap.org/data/2.5/weather?lat=${pos.coords.latitude.toFixed(2)}&lon=${pos.coords.longitude.toFixed(2)}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric` , `https://api.openweathermap.org/data/3.0/onecall?lat=${pos.coords.latitude.toFixed(2)}&lon=${pos.coords.longitude.toFixed(2)}&exclude=minutely&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric` , `https://api.openweathermap.org/data/2.5/air_pollution?lat=${pos.coords.latitude.toFixed(2)}&lon=${pos.coords.longitude.toFixed(2)}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`]

const builtInGPSError = {
  "1": GPSMessages.Error.GEOLOCATION_DENIED,
  "2": GPSMessages.Error.UNABLE_TO_DETECT_LOCATION,
  "3": GPSMessages.Error.GEOLOCATION_TIMEDOUT
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

  export function capitalise(str){
    return str.charAt(0).toUpperCase().concat(str.slice(1));
  }

  export function setHour(time) {
    let d = new Date(time * 1000);
    return [d.getHours(), d.getMinutes()].join(":");
  }


  export function fetchUserLocation(){
    return new Promise((res , rej)=>{
      if (!navigator.geolocation) {
        rej({
          isGPS: -1,
          alertMsg: GPSMessages.Error.GEOLOCATION_UNAVAILABLE
        })
      } else {

        navigator.geolocation.getCurrentPosition(
          async (pos) => {
            res(pos)
          },
          (error) => {
            rej({
              isGPS: 0,
              alertMsg: `
             Message: ${builtInGPSError[error.code]}`,
            });
          },
          { enableHighAccuracy: true, timeout: 5000 }
        );
      }
    })
  }


  
      
