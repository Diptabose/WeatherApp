import { useEffect, useState } from 'react';
import { useToast } from '../components/ToastProvider';
import { ToastMessages } from '../utils/commonMessages';

function useLocationCards() {

    const { setAndShowToast } = useToast();
    const [locations, setLocations] = useState([]);
    useEffect(() => {
        const locations = window.localStorage.getItem("userLocations");
        if (locations !== null && locations !== undefined) {
            let parseLocations = JSON.parse(locations);
            setLocations(parseLocations);
        }
    }, []);


    function addLocation(place) {
        // find returns the value or undefined
        const isThereLocation = locations.find((location) => location.location === place.location);
        if (!isThereLocation) {
            const newLocations = [place, ...locations]
            setLocations(newLocations);
            addToStorage(newLocations);
            setAndShowToast(ToastMessages.Success.LOCATION_ADDED);
            return
        }
        setAndShowToast(ToastMessages.Neutral.LOCATION_EXISTS);
    }

    function addToStorage(places) {
        window.localStorage.setItem(
            "userLocations",
            JSON.stringify(places)
        );
        if ("vibrate" in navigator) {
            window.navigator.vibrate(100);
        }
    }

    function removeLocation(place) {
        let removedLocation = locations.filter((element) => {
            return element.location !== place
        });
        setLocations(removedLocation);
        addToStorage(removedLocation)
    }


    return { locations, addLocation, removeLocation }
}

export default useLocationCards;