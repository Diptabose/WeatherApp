export const ToastMessages = {

    Neutral :{
        OLDER_RESULTS : "Showing older results",
        LOCATION_EXISTS : "Location already exists",
        PENDING_SEARCH : "Search Pending",
    },
    
    Success:{
        WEATHER_UPDATED: "Updated just now",
        LOCATION_ADDED : "Location Added",
        NOTIFICATION_SUBSCRIBED : "Notification subscribed",
        NOTIFICATION_UNSUBSCRIBED : "Notification unsubscribed",

    },

    Failed:{
        WEATHER_NOT_UPDATED : "Unable to load weather",
        NETWORK_UNAVAILABLE : "Network not avaliable",
        NOTIFICATION_DENIED : "Notification denied",
        NOTIFICATION_UNSUBSCRIBE:"Failed to unsubscibe",
    }
}

export const GPSMessages = {
  Error:{
      WEATHER_LOAD_FAILED : "Unable to load weather",
      GEOLOCATION_UNAVAILABLE : "Geolocation Services are not available on your device.You can search for forecast by entering City ,State or Country names or zip codes.",
      GEOLOCATION_DENIED: "Permission denied by user",
      UNABLE_TO_DETECT_LOCATION: "Unable to detect user location",
      GEOLOCATION_TIMEDOUT: "Location retrieval timed out",
      CHECK_CONNECTIVITY :"Check your internet connection and make sure location is turned on and try reloading...",
  }
}

export const CacheMessages = {
    Error :{
        CURRENT_WEATHER_CACHE_NOT_FOUND: "Current weather not found in cache",
        ONECALL_CACHE_NOT_FOUND : "One Call weather not found in cache",
        AQI_CACHE_NOT_FOUND:"Aqi details not found in cache",
    }
}