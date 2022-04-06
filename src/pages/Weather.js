import {useState, useEffect,useCallback} from 'react';
import WeatherHeader from './WeatherHeader.js';
import Spinner from './Spinner.js';
import Alert from './Alert.js';
import Today from './Today.js';
import Tommorow from './Tommorow.js';
import SevenDay from './SevenDay.js';
import UserLocations from './UserLocations.js';
import NoPage from './NoPage.js';
import {BrowserRouter as Router ,Routes , Route} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {lightTheme, darkTheme } from '../Theme.js';

function Weather(props){
  
  const isDarkMode = useSelector((state)=>state.darkmode);
  const theme=(isDarkMode)?(darkTheme):(lightTheme);
  
  //Defining 3 GPS states
  // isGPS===-1 when !navigator.geoloaction
  //isGPS===1 when position is returned
  //isGPS===0 when error occurs.
  const[loading , setLoading]=useState(true);
  const[wdata, setWdata]=useState({});
  const [gpsStatus , setGPSStatus] = useState({
    isGPS:1,
    alertMsg:""
  });
  const [searchUserLocation, setUserLocation]=useState({userSearching:false,coords:{latitude:null,longitude:null}});
  
  const fetchWeather=useCallback(async(pos)=>{
  try{
    let weatherdata = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&appid=66d9420ba608bc0e68e2a6dffe8361ab&units=metric`);
    let weatherJSON= await weatherdata.json();
    
    let oneCallData=await fetch(`http://api.openweathermap.org/data/2.5/onecall?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&exclude=minutely&appid=66d9420ba608bc0e68e2a6dffe8361ab&units=metric`)
    let oneCallJSON= await oneCallData.json();

    let aqi= await fetch(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&appid=66d9420ba608bc0e68e2a6dffe8361ab`);
      let parseAqi= await aqi.json();
     if(weatherJSON.cod===200){
        setWdata({weatherData:weatherJSON,oneCallData:oneCallJSON ,Aqi:parseAqi});
      }
      else{
     setGPSStatus({isGPS:0,alertMsg:"Error:"+weatherJSON.cod +" "+weatherJSON.msg})
         }
    }
    catch(error){
      setGPSStatus({isGPS:0,alertMsg:"Error in retrieving information . Try again by reloading..."})
      setLoading(false);
    }
    setLoading(false);
  },[])
  
const Location=useCallback(()=>{
 if(!searchUserLocation.userSearching){
      if(!navigator.geolocation)
      {
         setGPSStatus({isGPS:-1,alertMsg:"Geolocation Services are not available on your device.You can search for forecast by entering City ,State or Country names or zip codes."});
      }
      else{
        navigator.geolocation.getCurrentPosition((pos)=>{
          fetchWeather(pos);
        },(error)=>{
          setGPSStatus({isGPS:0,alertMsg:`Error:(${error.code})
             Message: ${error.message}`});
          setLoading(false);
        },{enableHighAccuracy:true});
    }
 }
 else{
   fetchWeather(searchUserLocation)
 }
},[searchUserLocation,fetchWeather])


useEffect(()=>{
//  setTimeout(()=>{
    Location();
  //},5000)
     
  },[Location]);



  
function changingToUserCoords(pos){
  setUserLocation({userSearching:true,coords:{latitude:pos.coords.lat,longitude:pos.coords.long}});
  setGPSStatus({isGPS:1,alertMsg:""});
  setLoading(true);
}

function localWeather(){
  setUserLocation({userSearching:false,coords:{latitude:null,longitude:null}});
  setGPSStatus({isGPS:1,alertMsg:""});
  setLoading(true);
}
const weather=(
 <div  className={`px-2 w-full min-h-screen text-white ${theme.bgcolor} transition-[background-color] duration-700 `}>
  <Router>
    <WeatherHeader  
        /*apiKey={props.apiKey}*/
        isLoading={loading}
        toggleDarkMode={props.toggleDarkMode}
        switchToUserLocation={changingToUserCoords}
        currentLocation={localWeather}
        
      />
    {
      (loading)?(<Spinner />):(
          (gpsStatus.isGPS!==1)?(
      <Routes>
        <Route exact path='/' element={ <Alert data={gpsStatus} />} />
        <Route exact path='/savedlocations' element={<UserLocations currentLoaction={null} />} />
        <Route exact path='*' element={<NoPage appname='WeatherApp' />} />
      </Routes>  
          ):
          (
      <Routes>
        <Route exact index path='/' element={<Today weatherData={wdata} />} />
          <Route exact path='/tommorow' element={<Tommorow place={wdata.weatherData.name} tommorowData={wdata.oneCallData} />} />
        <Route exact index path='/sevenday' element={<SevenDay sevendata={wdata.oneCallData.daily} />} />
        <Route exact path='/savedlocations' element={<UserLocations lat={wdata.weatherData.coord.lat} lon={wdata.weatherData.coord.lon} place={wdata.weatherData.name}
            loadSavedLocation={changingToUserCoords}/>} />
         <Route exact path='*' element={<NoPage appname='WeatherApp' />} />
      </Routes>
            )
          )
        }
  </Router>
</div>
  );
return weather;
}
export default Weather;
