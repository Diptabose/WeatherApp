import { AdaptForecast, ForecastData } from "@/types/forecast.types";
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

const DAY_SECONDS = 86400;
const HOUR_SECONDS = 3600;

// city.timezone is a UTC offset in seconds, so shifting by it puts a UTC
// timestamp into the forecast location's local day/hour.
const localDayIndex = (dt: number, tzOffset: number) =>
  Math.floor((dt + tzOffset) / DAY_SECONDS);

const localHour = (dt: number, tzOffset: number) =>
  Math.floor(
    ((((dt + tzOffset) % DAY_SECONDS) + DAY_SECONDS) % DAY_SECONDS) /
      HOUR_SECONDS,
  );

// Pick the reading closest to a target local hour, used to characterise a day
// from its 3-hourly samples (OpenWeather's own daily buckets use 6/12/18/0).
const nearestToHour = (
  entries: ForecastData["list"],
  tzOffset: number,
  targetHour: number,
) =>
  entries.reduce((best, entry) =>
    Math.abs(localHour(entry.dt, tzOffset) - targetHour) <
    Math.abs(localHour(best.dt, tzOffset) - targetHour)
      ? entry
      : best,
  );

const tempAt = (
  entries: ForecastData["list"],
  tzOffset: number,
  hour: number,
) => nearestToHour(entries, tzOffset, hour).main.temp;

/**
 * Folds the free 5 day / 3 hour forecast into the { current, hourly, daily }
 * shape the pages consume, so Today/Tommorow/SevenDay need no rework.
 *
 * Two values genuinely cannot come from this endpoint:
 *  - uvi is absent (no UV index product on the free tier), so it is omitted and
 *    the consumers hide the row rather than print a fake 0.
 *  - per-day sunrise/sunset are not provided; only the city's current pair is,
 *    so later days reuse it. Drift is a couple of minutes per day.
 */
export const adaptForecast = (forecast: ForecastData): AdaptForecast => {
  const tzOffset = forecast?.city?.timezone ?? 0;
  const entries = forecast?.list ?? [];

  const byDay = new Map<number, ForecastData["list"]>();
  entries.forEach((entry) => {
    const key = localDayIndex(entry.dt, tzOffset);
    if (!byDay.has(key)) byDay.set(key, []);
    byDay.get(key)!.push(entry);
  });

  const daily = [...byDay.entries()]
    .sort(([a], [b]) => a - b)
    .map(([dayIndex, dayEntries]) => {
      const midday = nearestToHour(dayEntries, tzOffset, 12);
      return {
        // The UTC instant of local noon, so weekday labels land on the right day.
        dt: dayIndex * DAY_SECONDS + DAY_SECONDS / 2 - tzOffset,
        sunrise: forecast?.city?.sunrise ?? 0,
        sunset: forecast?.city?.sunset ?? 0,
        temp: {
          min: Math.min(...dayEntries.map((e) => e.main.temp_min)),
          max: Math.max(...dayEntries.map((e) => e.main.temp_max)),
          morn: tempAt(dayEntries, tzOffset, 6),
          day: tempAt(dayEntries, tzOffset, 12),
          eve: tempAt(dayEntries, tzOffset, 18),
          night: tempAt(dayEntries, tzOffset, 0),
        },
        humidity: midday.main.humidity,
        pressure: midday.main.pressure,
        wind_speed: midday.wind.speed,
        wind_deg: midday.wind.deg,
        clouds: midday.clouds.all,
        weather: midday.weather,
        // The 3-hourly readings for this day, so Tommorow can chart its own day.
        hours: dayEntries.map((e) => ({
          dt: e.dt,
          temp: e.main.temp,
          weather: e.weather,
        })),
      };
    });

  return {
    current: {},
    hourly: entries.map((e) => ({
      dt: e.dt,
      temp: e.main.temp,
      weather: e.weather,
    })),
    daily,
    name: forecast?.city?.name,
  };
};

export const adaptTomorrow = (forecast: AdaptForecast) => {
  const {
    sunrise,
    sunset,
    temp,
    pressure,
    humidity,
    wind_speed,
    wind_deg,
    weather,
    clouds,
    dt,
    hours,
  } = forecast.daily[1];

  function tempSet() {
    let date = new Date();
    let h = date.getHours();
    if (h >= 0 && h <= 11) {
      return temp.morn;
    } else if (h > 12 && h <= 15) {
      return temp.day;
    } else if (h > 15 && h <= 18) {
      return temp.eve;
    } else {
      return temp.night;
    }
  }
  const temperature = tempSet();
  const weatherData = {
    name: forecast.name,
    dt: dt,
    main: {
      temp: temperature,
      temp_min: temp.min,
      temp_max: temp.max,
      pressure: pressure,
      humidity: humidity,
    },
    sys: {
      sunset: sunset,
      sunrise: sunrise,
    },
    wind: {
      speed: wind_speed,
      deg: wind_deg,
    },
    clouds: {
      all: clouds,
    },
    weather: weather,
  };

  // The forecast is 3-hourly, so a fixed offset into `hourly` no longer lands on
  // tomorrow; use the readings the adapter grouped into tomorrow's own bucket.
  let hourlyData = hours;

  return { weatherData, hourlyData };
};

export function sunSetter(time: number) {
  if (time < 0) {
    return "00:00";
  } else {
    let d = new Date(time);
    return [
      d.getHours() < 10 ? "0" + d.getHours() : d.getHours(),
      d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes(),
    ].join(":");
  }
}

export function sumTotal(time: number) {
  if (time < 0) {
    return "00:00 hrs";
  }
  let min = Math.floor(time / 60);
  let hours = min / 60;
  let minDec = hours % 1;
  let Hour = Math.floor(hours);
  let Min = Math.floor(minDec * 60);
  return (
    (Hour < 10 ? "0" + Hour : Hour) +
    ":" +
    (Min < 10 ? "0" + Min : Min) +
    " hrs"
  );
}

export function todayOrNot(day: number) {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const d = new Date(day * 1000);
  if (d.getDate() === new Date().getDate()) {
    return "Today";
  } else {
    return weekday[d.getDay()];
  }
}
