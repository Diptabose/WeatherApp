import React , { memo } from "react";
import { useSelector } from "react-redux";
import { lightTheme, darkTheme } from "../Theme.js";
import LocationCardTemplate from "../components/LocationCardTemplate.js";
import useLocationCards from "../hooks/useLocationCards.js";

function UserLocations(props) {

  const { lat, lon, place} = props;
  const isDarkMode = useSelector((state) => state.darkmode);
  const theme = isDarkMode ? darkTheme : lightTheme;
  const {removeLocation , addLocation , locations} = useLocationCards();

  const userLocationCards = (
    <div className={`relative flex flex-col py-1 w-full items-center`}>
      <div className="flex w-full flex-col 1.1sm:flex-row 1.1sm:flex-wrap">
        {locations.length !== 0 ? (
          locations.map((element) => {
            return (
              <LocationCardTemplate
                data={element}
                key={element.lat}
                cardRemove={removeLocation}
                saved={props.loadSavedLocation}
              />
            );
          })
        ) : (
          <div
            className={`${theme.textcolor}  border-rose-600 px-2 py-4 mt-12 rounded-md text-center border-[3px] m-auto`}
          >
            No Locations Stored...
            <div>Press the '+' icon to add current location </div>
          </div>
        )}
      </div>

      <div className="flex flex-col items-end fixed bottom-0 self-end mb-4 mr-4">
        <button
          aria-label="addicon"
          className={`flex items-center justify-center w-14 h-14 rounded-full text-5xl bg-sky-700 text-white shadow-md ${theme.boxshadow}`}
          onClick={() => {
            addLocation({ location: place, lat: lat, long: lon });
          }}
          disabled={
            lat === undefined || place === undefined || lon === undefined
          }
        >
          &#43;
        </button>
      </div>
    </div>
  
  );

  return userLocationCards;
}

export default memo(UserLocations);
