import {useState , useEffect } from 'react';
import {useSelector} from 'react-redux';
import {lightTheme ,darkTheme} from '../Theme.js';
import weatherbg from '../WeatherBG';
import {Link} from 'react-router-dom';

function UserLocations(props){
  const {lat , lon, place }=props;
  const isDarkMode=useSelector((state)=>state.darkmode);
  const theme=(isDarkMode)?(darkTheme):(lightTheme);
  const[userLocation, setUserLocation]=useState([]);

  useEffect(()=>{
    loadLocation();
  },[]);
  
  
  
  
  
  
 function LocationTemplate(props){
  const {lat ,long,location}=props.data;
  function LocationTemplateBg(){
  let arr=[weatherbg.foggy, weatherbg.morning ,weatherbg.night ,weatherbg.night1, weatherbg.night2, weatherbg.rainy , weatherbg.sunrise , weatherbg.thunder];
  return arr[Math.floor(Math.random()*(7-1+1)+1)];
  }
  
 
  
  
const lt=(
<div style={{backgroundImage:`url(${LocationTemplateBg()})`,
      backgroundRepeat:'no-repeat',
      backgroundSize:'cover',
      backgroundPosition:'center',
    }}
    className={`p-4 text-white mb-2 rounded-md flex shadow-md bg-cyan-800 object-cover relative cursor-pointer`} >
  <Link to='/' className="flex-[9]" onClick={()=>{
     const pos={coords:{lat:lat,long:long}};
     props.saved(pos);
  }} >
    <p className="font-bold text-xl">{location}</p>
    <div className="my-1">
      <span className="mr-2">Longitude</span><span>{lat}</span>
    </div>
    <span className="mr-2">Latitude</span><span>{long}</span>
  </Link>
  <div className="flex-[1] flex flex-col items-center justify-center "
    onClick={()=>{props.cardRemove(location)}}
    >
    <button className="flex items-center justify-center w-7 h-7 rounded-full bg-sky-700 text-white font-bold text-3xl cursor-pointer " >
         &minus;
     </button>
  </div>
</div>
);
return lt;
}

function loadLocation(){
  let locations = window.localStorage.getItem('userLocations');
    if(locations!==null&&locations!==undefined)
    {
      let parseLocations= JSON.parse(locations);
      setUserLocation(parseLocations);
    }
}
  
  
  function addLocation(newlocation){
   let itemFound=false;
    for(let i=0;i<userLocation.length;i++){
      if(userLocation[i].location===newlocation.location)
      {itemFound=true; break;}
    }
    if(!itemFound){
    let newUserLocations= [newlocation,...userLocation];
    window.localStorage.setItem('userLocations',JSON.stringify(newUserLocations));
    setUserLocation(newUserLocations);
    if ("vibrate" in navigator) {
    window.navigator.vibrate(100);
    }
    }
  }
  
  function removeLocationCard(place){
    let removedLocation = userLocation.filter((element)=>{
    return (element.location!==place)?(element):(null)
   });
     window.localStorage.setItem('userLocations',JSON.stringify(removedLocation));
     setUserLocation(removedLocation);
  }
   
const ul=(
  <div className={`relative flex flex-col py-2 `}>
    <div>
    {
      (userLocation.length!==0)?(
        userLocation.map((element)=>{
        return <LocationTemplate data={element} key={element.lat} cardRemove={removeLocationCard}
          saved={props.loadSavedLocation}
         />
        })
        ):(<div className={`${theme.textcolor} border border-rose-600 px-2 py-4 mb-4 rounded-md text-center border-[3px]`}>No Locations Stored...
           <div>Press the '+' icon to add current location </div>
        </div>)
      }
  </div>
  <div className=" flex  flex-col items-end sticky bottom-0 pb-4 ">
    <button className={`flex items-center m-auto w-14 h-14 rounded-full  text-5xl bg-sky-700 text-white shadow-md ${theme.boxshadow} `} onClick={()=>{addLocation({location:place, lat:lat,long:lon})}}   disabled={lat===undefined||place===undefined||lon===undefined} >
        &#43;
    </button>
  </div>
</div>
  );
return ul;
}
export default UserLocations;
