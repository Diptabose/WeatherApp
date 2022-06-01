WeatherApp

Description:
This is a Weather Application which uses React as its front end.  
The weather data is fetched from Open Weather Map Api .
This WeatherApp can provide a forecast upto 8 days with max ,min temperatures, Wind Speed , Wind Degree , Pressure , Humidity , Sunrise,Sunset and lots more 
This is App is also capable of fetching weather of any remote location.
The App also allows to store User Preffered location and load its weather any time.

Usage:

Allow the location permission asked by the browser .
If the location is turned off , then turn it on and reload.

Navbar:

The location icon the top left , loads the current location weather.
The search bar allows to search weather of any location.
The building icon allows to save the current location in the local storage.
The toggle in the top right switches between light and dark theme.

Navbar buttons:

Clicking on today , lands on current day's weather . It includes weather report , 24 hours of weather data, an illustrative graph for the 24 hour weather data , more detail view of weather report, sunrise and sunset progress bar and air quality index.

Clicking on the tomorrow , lands on tomorrow's weather . It almost includes the same content as today , excluding air quality index.

Clicking on 8 day button , gives the weather report of the next 8days including the current day. 
It is card based ui , when clicked expands to give a more detailed report of the corresponding day .

The building icon , loads a list of saved  location cards , when clicked , opens the weather of that corresponding location.Initially its empty and pressing the '+' icon adds current location to local storage .
The location cards also has a minus button to remove the saved location from storage.

Changelogs:
Initial Release v1.0.0
Features :
1) Made navbar fixed.
2) Enabled loading of current location's weather from location icon.
3) Enabled  search based weather.
4) Enable to save User locations.
5) Enabled to retrieve weather from those saved locations.
6) Added random background for saved location cards.
7) Enabled App wide dark mode.
8) Added today , tommorow and 8 Day forecast.
9) Added Hourly weather forecast
10) Added Hourly weather chart 
11) Added Air Quality Index.
12) Added progress bar for sunrise and sunset.


WeatherApp V1.2.5
Hotfixes :
1) Fixed an issue where small devices had the location and search icon disappeared.
2) Fixed an issue where location cards were being saved when GPS is turned off.
3) Fixed an issue of misalignment in 8 Day weather.
4) Changes in the Search bar .
5) Changes in Weather icon for larger devices.
6) Added background hover to icons in navbar.
7) Added to search location weather by pressing enter button.

Notes :
If the App doesn't load enable cookies in your browser and reload. 
Thanks to Sthuthi for finding the fix.

Follow the below steps to configure cookies in Chrome for Android.

Open settings from menu >>> Find Site settings at the bottom>>> Find for Cookies just below All sites. >>> Click on Allow Cookies .

Follow the below steps to configure cookies in Firefox for Android.

Open settings from menu  >>> Search for privacy in the setting menu >>> Tap on cookies and click enabled.

Huge thanks to Ashok for reporting issues in the navbar.
To report any bug DM:+91 9381327381.
Lead developer : Bose 
