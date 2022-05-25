import {useState, useEffect,useCallback} from 'react';
import WeatherHeader from './WeatherHeader.js';
import Spinner from './Spinner.js';
import Alert from './Alert.js';
import NoPage from './NoPage.js';
import {BrowserRouter as Router ,Routes , Route} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {lightTheme, darkTheme } from '../Theme.js';
import Toast from './Toast.js';
import {lazy,Suspense} from 'react';


//Using lazy loading to reduce bundle size
const Today = lazy(()=>import('./Today.js'));
const Tommorow = lazy(()=>import('./Tommorow.js'));
const SevenDay = lazy(()=>import('./SevenDay.js'));
const UserLocations = lazy(()=>import('./UserLocations.js'));

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
  
 const [showToast,setToast]= useState({showState:false,msg:null});
 
 
 function urlReturner(pos,num){
   switch(num){
     case 1:
       return `https://api.openweathermap.org/data/2.5/weather?lat=${pos.coords.latitude.toFixed(2)}&lon=${pos.coords.longitude.toFixed(2)}&appid=66d9420ba608bc0e68e2a6dffe8361ab&units=metric`;
     case 2:
       return `https://api.openweathermap.org/data/2.5/onecall?lat=${pos.coords.latitude.toFixed(2)}&lon=${pos.coords.longitude.toFixed(2)}&exclude=minutely&appid=66d9420ba608bc0e68e2a6dffe8361ab&units=metric`;
     case 3:
       return `https://api.openweathermap.org/data/2.5/air_pollution?lat=${pos.coords.latitude.toFixed(2)}&lon=${pos.coords.longitude.toFixed(2)}&appid=66d9420ba608bc0e68e2a6dffe8361ab`;
      default:
        console.warn('url not found');
   }
 }
 
 const cachings= useCallback(async(pos)=>{
   try{
     const cache = await caches.open('v1');
     const currentWeather = await cache.match(urlReturner(pos,1));
     if(!currentWeather){
       throw new Error('no url for current weather in cache ');
     }
     const weatherJson= await currentWeather.json();
     const oneCall= await cache.match(urlReturner(pos,2));
     if(!oneCall){
       throw new Error('no url for onecall weather in cache ');
     }
     const onecallJson = await oneCall.json();
     const Aqi = await cache.match(urlReturner(pos,3));
     if(!Aqi){
       throw new Error('no url for aqi weather in cache ');
     }
     const AqiJson= await Aqi.json();
     return {weatherData:weatherJson,oneCallData:onecallJson ,Aqi:AqiJson} 
   }
   catch(error){
     return false;
   }
  },[])
 
 //Function to fetch weather by network;
const fetchWeather=useCallback(async(pos)=>{
  try{
    let weatherdata = await fetch(urlReturner(pos,1));
    let weatherJSON= await weatherdata.json();
    let oneCallData=await fetch(urlReturner(pos,2));
    let oneCallJSON= await oneCallData.json();
    let aqi= await fetch(urlReturner(pos,3));
    let parseAqi= await aqi.json();
      
    if(weatherdata.ok&&oneCallData.ok&&aqi.ok){
        setWdata({weatherData:weatherJSON,oneCallData:oneCallJSON ,Aqi:parseAqi});
        Toaster(true,'Updated just now');
      }
      
    else{
      const cacheResp= await cachings(pos);
       if(!cacheResp){
         if('msg' in weatherJSON)
         {
         setGPSStatus({isGPS:0,alertMsg:"Error:"+weatherJSON.cod +" "+weatherJSON.msg});
         }
        else if('msg' in oneCallJSON){
           setGPSStatus({isGPS:0,alertMsg:"Error:"+oneCallJSON.cod +" "+oneCallJSON.msg});
         }
        else if('msg' in parseAqi){
           setGPSStatus({isGPS:0,alertMsg:"Error:"+parseAqi.cod +" "+parseAqi.msg});
        }
        Toaster(true,'Unable to load Weather');
       }
       else{
        setWdata({weatherData:cacheResp.weatherData,oneCallData:cacheResp.oneCallData,Aqi:cacheResp.Aqi});
        Toaster(true,'Showing older results');
       }
      }
    }
    catch(error){
      const cacheResp= await cachings(pos);
      if(!cacheResp){
        setGPSStatus({isGPS:0,alertMsg:"Check your internet connection and make location is turned on and try reloading..."})
      Toaster(true,'Error Occured');
      }
      else{
        setWdata({weatherData:cacheResp.weatherData,oneCallData:cacheResp.oneCallData,Aqi:cacheResp.Aqi});
        Toaster(true,'Showing older results');
      }
    }
    setLoading(false);
  },
  
  [cachings])  
     
 //Function to sesrch results in cache.
  
    
const Location=useCallback(()=>{
 if(!searchUserLocation.userSearching){
      if(!navigator.geolocation)
      {
         setGPSStatus({isGPS:-1,alertMsg:"Geolocation Services are not available on your device.You can search for forecast by entering City ,State or Country names or zip codes."});
      }
      else{
        navigator.geolocation.getCurrentPosition(async (pos)=>{
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
 //setTimeout(()=>{
   Location();
 // },5000);
},[Location]);


//Function to load user defined location based weather passing by passing pos in the parameters
function changingToUserCoords(pos){
  setUserLocation({userSearching:true,coords:{latitude:pos.coords.lat,longitude:pos.coords.long}});
  setGPSStatus({isGPS:1,alertMsg:""});
  setLoading(true);
}

//Loading the current weather inorder to rethrn back from searched location weather 
function localWeather(){
  setUserLocation({userSearching:false,coords:{latitude:null,longitude:null}});
  setGPSStatus({isGPS:1,alertMsg:""});
  setLoading(true);
}

//Function to generate location name for push notifications 
function getLocationName(){
  return wdata.weatherData.name;
}

//Unified Toaster function to generate toasts
const Toaster= (state,msg)=>{
  setToast({showState:state,msg:msg});
};


const weather=(
 <div  className={` w-full min-h-screen text-white ${theme.bgcolor} transition-[background-color] duration-700 `}>
 {(showToast.showState)?(<Toast message={showToast.msg} restoreToaster={Toaster} />):(<div></div>)}
 
  <Router>
  <div className='sticky top-0 z-[3]'>
    <WeatherHeader  
        isLoading={loading}
        toggleDarkMode={props.toggleDarkMode}
        switchToUserLocation={changingToUserCoords}
        currentLocation={localWeather}
        location={getLocationName}
        Toaster={Toaster}
      />
    </div> 
    <div className='mx-4'>
    {
      (loading)?(<Spinner center={true} />):(
          (gpsStatus.isGPS!==1)?(
      <Routes>
        <Route exact path='*' element={<Alert data={gpsStatus}/>} />
      </Routes>  
          ):
          (
      <Routes>
        <Route exact index path='/' element={
          
        <Suspense fallback={<Spinner center={true}/>}>
          <Today weatherData={wdata} />
        </Suspense>
        }
         />
        
        
    <Route exact path='/tommorow' element={
      <Suspense fallback={<Spinner center={true}/>}>
        <Tommorow place={wdata.weatherData.name} tommorowData={wdata.oneCallData} /> 
       </Suspense> 
    }
          />
          
        <Route exact index path='/sevenday' element={
       <Suspense fallback={<Spinner center={true} />}>
          <SevenDay sevendata={wdata.oneCallData.daily} />
        </Suspense>
        }
        />
        <Route exact path='/savedlocations' element={
          
       <Suspense fallback={<Spinner center={true} />}>
          <UserLocations lat={wdata.weatherData.coord.lat} lon={wdata.weatherData.coord.lon} place={wdata.weatherData.name} loadSavedLocation={changingToUserCoords}
              toaster={Toaster} />
        </Suspense >
        }
              />
         <Route exact path='*' element={<NoPage appname='WeatherApp'/>} />
      </Routes>
            )
          )
        }
    </div>
  </Router>

</div>
  );
return weather;
}
export default Weather;
