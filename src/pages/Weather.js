import { useState, useRef, useEffect, useCallback, memo } from "react";
import WeatherHeader from "./WeatherHeader.js";
import Spinner from "../components/Spinner.js";
import Alert from "./Alert.js";
import NoPage from "./NoPage.js";
import { BrowserRouter as Router, Routes, Route , Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { lightTheme, darkTheme } from "../Theme.js";
import { lazy, Suspense } from "react";
import { useToast } from "../components/ToastProvider.js";
import { ToastMessages, CacheMessages, GPSMessages } from "../utils/commonMessages.js";



// Import commonmethods here
import { getEndpoints, fetchUserLocation } from "../utils/commonMethods.js";

// Using lazy loading to reduce bundle size
const Today = lazy(() => import("./Today.js"));
const Tommorow = lazy(() => import("./Tommorow.js"));
const SevenDay = lazy(() => import("./SevenDay.js"));
const UserLocations = lazy(() => import("./UserLocations.js"));



function Weather(props) {

  const isDarkMode = useSelector((state) => state.darkmode);
  const theme = isDarkMode ? darkTheme : lightTheme;
  const headerRef = useRef();
  /** Defining 3 GPS states
   isGPS===-1 when !navigator.geoloaction
   isGPS===1 when position is returned
   isGPS===0 when error occurs.
   **/
  const [loading, setLoading] = useState(true);
  const [wdata, setWdata] = useState({});
  const [gpsStatus, setGPSStatus] = useState({
    isGPS: 1,
    alertMsg: "",
  });


  const [searchUserLocation, setUserLocation] = useState({
    userSearching: false,
    coords: { latitude: null, longitude: null },
  });

  const { setAndShowToast } = useToast();


  const homeRef = useRef();
  const tomorrowRef = useRef();
  const sevenDayRef = useRef();
  const [currentPage , setCurrentPage] = useState(0);

  //Function to search results in cache.
  const cachings = useCallback(async (pos) => {
    try {
      const cache = await caches.open("v1");

      const endpoints = getEndpoints(pos);
      const currentWeather = await cache.match(endpoints[0]);
      if (!currentWeather) {
        throw new Error(CacheMessages.Error.CURRENT_WEATHER_CACHE_NOT_FOUND);
      }
      const weatherJson = await currentWeather.json();
      const oneCall = await cache.match(endpoints[1]);
      if (!oneCall) {
        throw new Error(CacheMessages.Error.ONECALL_CACHE_NOT_FOUND);
      }
      const onecallJson = await oneCall.json();
      const Aqi = await cache.match(endpoints[2]);
      if (!Aqi) {
        throw new Error(CacheMessages.Error.AQI_CACHE_NOT_FOUND);
      }
      const AqiJson = await Aqi.json();
      return {
        weatherData: weatherJson,
        oneCallData: onecallJson,
        Aqi: AqiJson,
      };
    } catch (error) {
      return false;
    }
  }, []);




  //const weatherMemo = useMemo(()=> wdata, [wdata]);

  //Function to fetch weather by network;
  const fetchWeather = useCallback(
    async (pos) => {
      try {

        let weatherFetchPromises = getEndpoints(pos).map((url) => fetch(url));
        let combinedPromises = await Promise.all(weatherFetchPromises);
        let areRequestsOk = combinedPromises.reduce((prev, request) => prev && request.ok, true);
        let parsedJsons = [];
        if (areRequestsOk) {
          parsedJsons = await Promise.allSettled(combinedPromises.map((request) => request.json()));

          const [weatherJSON, oneCallJSON, aqiJSON] = parsedJsons
          setWdata({
            weatherData: weatherJSON,
            oneCallData: oneCallJSON,
            Aqi: aqiJSON,
          });
          setAndShowToast(ToastMessages.Success.WEATHER_UPDATED);

        } else {

          if (parsedJsons.length === 0) {
            setGPSStatus({
              isGPS: 0,
              alertMsg: GPSMessages.Error.WEATHER_LOAD_FAILED,
            });
            setAndShowToast(ToastMessages.Failed.WEATHER_NOT_UPDATED);

          } else {
            // Checking this cache if the parsing of Json fails for any api call
            const cacheResp = await cachings(pos);
            if (!cacheResp) {
              for (const itemJson of parsedJsons) {
                if ("msg" in itemJson) {
                  setGPSStatus({
                    isGPS: 0,
                    alertMsg: "Error:" + itemJson.cod + " " + itemJson.msg,
                  });
                  break;
                }
              }
              setAndShowToast(ToastMessages.Failed.WEATHER_NOT_UPDATED);
            } else {
              setWdata({
                weatherData: cacheResp.weatherData,
                oneCallData: cacheResp.oneCallData,
                Aqi: cacheResp.Aqi,
              });
              setAndShowToast(ToastMessages.Neutral.OLDER_RESULTS);
            }
          }
        }
      } catch (error) {
        // Checking cache if the main api calls fail
        const cacheResp = await cachings(pos);
        if (!cacheResp) {
          setGPSStatus({
            isGPS: 0,
            alertMsg: GPSMessages.Error.CHECK_CONNECTIVITY,
          });
          setAndShowToast(ToastMessages.Failed.NETWORK_UNAVAILABLE)
        } else {
          setWdata({
            weatherData: cacheResp.weatherData,
            oneCallData: cacheResp.oneCallData,
            Aqi: cacheResp.Aqi,
          });
          setAndShowToast(ToastMessages.Neutral.OLDER_RESULTS);
        }
      }
      setLoading(false);
    },

    [cachings]
  );

  const Location = useCallback(async () => {
    if (!searchUserLocation.userSearching) {

      try {
        const positions = await fetchUserLocation();
        fetchWeather(positions);
      }
      catch (err) {
        setGPSStatus(err);
        setLoading(false);
      }
    } else {
      fetchWeather(searchUserLocation);
    }
  }, [searchUserLocation, fetchWeather]);

  useEffect(() => {
    Location();
  }, [Location]);

  //Function to load user defined location based weather passing by passing pos in the parameters

  function changingToUserCoords(pos) {
    setUserLocation({
      userSearching: true,
      coords: { latitude: pos.coords.lat, longitude: pos.coords.long },
    });
    setGPSStatus({ isGPS: 1, alertMsg: "" });
    setLoading(true);
  }

  //Loading the current weather inorder to rethrn back from searched location weather
  function localWeather() {
    setUserLocation({
      userSearching: false,
      coords: { latitude: null, longitude: null },
    });
    setGPSStatus({ isGPS: 1, alertMsg: "" });
    setLoading(true);
  }

  //Function to generate location name for push notifications
  function getLocationName() {
    return wdata.weatherData.name;
  }

  //Function to goto a swipable tab.
function goto(pageno){
  const gotoPages = [homeRef , tomorrowRef , sevenDayRef];
  const gotoPage = gotoPages[pageno].current;
  if(gotoPage){
    gotoPage.scrollIntoView();
    setCurrentPage(pageno);
  }
}


  const weather = (
    <div
      className={` w-full text-white flex flex-col grow ${theme.bgcolor} transition-[background-color] duration-700 `}
    >

      <Router >
        <div ref={headerRef} className="sticky top-0 z-[3]">
          <WeatherHeader
            isLoading={loading}
            toggleDarkMode={props.toggleDarkMode}
            switchToUserLocation={changingToUserCoords}
            currentLocation={localWeather}
            location={getLocationName}
            goto= {goto}
            currentPage = {currentPage}
          />
        </div>

        <div className="mx-4 2xm:mx-2 flex flex-col grow overflow-y-auto">
          {loading ? (
            <Spinner center={true} />
          ) : gpsStatus.isGPS !== 1 ? (
            <Routes>
              <Route exact path="*" element={<Alert data={gpsStatus} />} />
            </Routes>
          ) : (
            <Routes>

              <Route exact index path="/" element={<Navigate to="/weather" />} />

              <Route
                exact
                index
                path="/weather"
                element={
                  <div className="h-full flex w-full snap-x snap-mandatory overflow-x-auto scroll-smooth myscroll scroll-smooth">

                    <div ref={homeRef} className="h-full w-full flex-none overflow-y-auto snap-start snap-always" >
                      <Suspense fallback={<Spinner center={true} />}>
                        <Today weatherData={wdata} />
                      </Suspense>
                    </div>
                    <div ref={tomorrowRef} className="h-full w-full flex-none overflow-y-auto snap-start snap-always" >
                      <Suspense fallback={<Spinner center={true} />}>
                        <Tommorow
                          place={wdata.weatherData.name}
                          tommorowData={wdata.oneCallData}
                        />
                      </Suspense>
                    </div>
                    <div ref={sevenDayRef} className="h-full w-full  flex-none  overflow-y-auto snap-start snap-always" >
                      <Suspense fallback={<Spinner center={true} />}>
                        <SevenDay sevendata={wdata.oneCallData.daily} />
                      </Suspense>
                    </div>
                  </div>
                }
              />

              <Route
                exact
                index
                path="/home"
                element={
                  <Suspense fallback={<Spinner center={true} />}>
                    <Today weatherData={wdata} />
                  </Suspense>
                }
              />
              <Route
                exact
                index
                path="/tommorow"
                element={
                  <Suspense fallback={<Spinner center={true} />}>
                    <Tommorow
                      place={wdata.weatherData.name}
                      tommorowData={wdata.oneCallData}
                    />
                  </Suspense>
                }
              />
              <Route
                exact
                index
                path="/sevenday"
                element={
                  <Suspense fallback={<Spinner center={true} />}>
                    <SevenDay sevendata={wdata.oneCallData.daily} />
                  </Suspense>
                }
              />
              <Route
                exact
                path="/savedlocations"
                element={
                  <Suspense fallback={<Spinner center={true} />}>
                    <UserLocations
                      lat={wdata.weatherData.coord.lat}
                      lon={wdata.weatherData.coord.lon}
                      place={wdata.weatherData.name}
                      loadSavedLocation={changingToUserCoords}
                    />
                  </Suspense>
                }
              />
              <Route exact path="*" element={<NoPage appname="WeatherApp" />} />
            </Routes>
          )}
        </div>
      </Router>
    </div>
  );
  return weather;
}
export default memo(Weather);
