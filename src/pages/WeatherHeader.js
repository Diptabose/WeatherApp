import weatherbg from '../WeatherBG/';
import {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {lightTheme,darkTheme} from '../Theme.js';
import Spinner from './Spinner.js';
import {sendNotif ,unSubscribeNotifications} from '../Notifications.js';

//Material UI icons are imported here (Test)
import LocationOnIcon from '@mui/icons-material/LocationOn';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Switch from '@mui/material/Switch';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import DomainAddRoundedIcon from '@mui/icons-material/DomainAddRounded';
import MenuIcon from '@mui/icons-material/Menu';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';




function WeatherHeader(props){
  
  const {Toaster} = props;
  const isDarkMode=useSelector((state)=>state.darkmode);
  const theme=(isDarkMode)?(darkTheme):(lightTheme);
  const [input , setInput]=useState("");
  const [notifCheck , setNotifCheck]= useState(false);
  const [darkmodeCheck ,setDarkModeCheck]= useState(false);
  const [menuState, setMenuState] = useState(false);
  const [loading , setLoading]=useState(true);
  const [searchResults,setSearchResults]=useState([]);
  const [isSearch , setIsSearch]= useState(true);
  const [display,setDisplay]=useState('hidden');
  const [didUserSearch ,setUserSearch] = useState(false);
  
  function handleInput(e){
    let text= e.target.value;
    setInput(text);
  }
  
  function handleEnterClick(e){
    if(e.keyCode===13){
      setUserSearch(true);
         initSearch();
    }
  }
  
  useEffect(()=>{
    if(isDarkMode){
      setDarkModeCheck(true);
    }
    else{
     setDarkModeCheck(false);
    }
  },[isDarkMode])
 
  useEffect(()=>{
    const notification= window.localStorage.getItem('notif');
    if((notification===null)||notification==='denied'){
    setNotifCheck(false);
    }
    else{
     setNotifCheck(true);
    }
  },[])
  
  function handleDarkTheme(){
    props.toggleDarkMode();
  }

  useEffect(()=>{
   if(input.length===0){
      initCloseBox();
    }
  },[input]); 
    

function PlacesFromSearch(props){
  const {name,state,country,lat,lon} = props.place;
  let pos={coords:{lat:lat,long:lon}}
  
  function sendLocation(pos){
    props.toUserLocation(pos);
   }
   
  const placelist=(
  <ListItemButton style={{display:'block'}}>
    <Link to='/' key={lat} className={`list-none truncate py-1  px-1 ${(!props.isLast)?'border-b-[1px]':''} border-gray-400 hover:bg-gray-400 block`} onClick={()=>{
      setInput(name+" ,"+state+" ,"+country);
      setDisplay('hidden');
      sendLocation(pos);}} >{name+" ,"+state+" ,"+country}
    </Link>
  </ListItemButton>
 
    );
  return placelist;
}

async function initSearch(){
  
  const controller = new AbortController();
  const signal = controller.signal
  if(input.length===0||didUserSearch){
    return ;
  }
  setIsSearch(false);
  setDisplay('block');
  setLoading(true);
  setUserSearch(true);
  try{
    let geo = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=3&appid=66d9420ba608bc0e68e2a6dffe8361ab`,{signal:signal});
     let geoParse = await geo.json();
     setSearchResults(geoParse);
     setLoading(false);
     }
    catch(error){
      Toaster(true,'Search Pending');
    }
    return ()=>{controller.abort()}
}

function textclose(){
  setInput('');
  setIsSearch(true);
  setSearchResults([]);
  setUserSearch(true);
}

function  initCloseBox(){
  setSearchResults([]);
  setIsSearch(true);
  setDisplay('hidden');
  setUserSearch(false);
}

function loadLocalLocation(){
 initCloseBox();
  props.currentLocation();
}

async function toggleNotif(){
  let res=null;
  const location= props.location();
  if(((window.localStorage.getItem('notif')==='denied')||(Notification.permission!=='granted'))||((window.localStorage.getItem('notif')===null)||(Notification.permission!=='granted')))
  {
    setNotifCheck(true);
    window.localStorage.setItem('notif','granted');
   res =await sendNotif(location);
   if(!res){
     setNotifCheck(false);
     window.localStorage.setItem('notif','denied');
     Toaster(true,'Notification denied');
   }
   else{
     Toaster(true,'Notification subscribed');
   }
  }
  else{
    setNotifCheck(false);
    window.localStorage.setItem('notif','denied');
    res = await unSubscribeNotifications();
    if(res){
      setNotifCheck(true);
      window.localStorage.setItem('notif','granted');
      Toaster(true,'Unable to unsubscribe');
    }
    else{
      Toaster(true ,'Notifications unsubscribed');
    }
  }
}


const weatherheader=(
<div className={`flex flex-col ${theme.bgcolor} ${theme.textcolor} transition-[background-color] duration-700 z-[20]`}>
  <div id="location and search" className="flex-auto  flex items-center">
  
 <IconButton aria-label='currentlocation' onClick={loadLocalLocation}>
    <Link aria-label='gotohome' to='/' >
     <LocationOnIcon style={{color:theme.headerIconColor}}/>
    </Link> 
 </IconButton>
    <div className={`flex flex-auto bg-transparent border-b-2 ${theme.bordercolor} relative`}>
      <div className='flex flex-auto items-center justify-between z-[5]'>
        <input className={` bg-transparent flex-auto outline-none placeholder:text-white-500 `}  placeholder="Search for city, state or country" value={input}  disabled={props.isLoading} type="text" autocomplete='off' onChange={handleInput} onKeyUp={handleEnterClick} />
       {
        (isSearch)?(
        <IconButton aria-label='search' onClick={()=>{
          setUserSearch(true);
          initSearch();;
        }}>
           <SearchIcon style={{color:theme.headerIconColor}}/>
        </IconButton>
        )
         : (<IconButton aria-label='cross' onClick={()=>{
           textclose();
         }}>
          <CloseIcon style={{color:theme.headerIconColor}} />
         </IconButton >
         )
       }
   </div>
   <div className={`${display} `}>
      <div className='fixed left-0 right-0 top-0 bottom-0' onClick={()=>{initCloseBox()}}></div> 
      <div className={`${display}  w-full mt-2  py-1 rounded-md  top-full  absolute text-black bg-white -translate-x-full `} >
        {
         (loading)?(<div className='inline-block relative top-1/2 left-1/2 -translate-x-1/2'><Spinner center={false}  /> </div>):
         (
          (searchResults.length!==0)?(
            searchResults.map((element,i)=>{
             return <PlacesFromSearch place={element} key={element.lat} toUserLocation={props.switchToUserLocation} isLast={i===searchResults.length-1} />
               }))
               :
           (<div className="py-4 px-3">No results found</div>)
        )
       }
      </div>
      </div>
    </div>
    <IconButton >
      <Link aria-label='gotosavedlocations' to='/savedlocations' >
        <DomainAddRoundedIcon style={{color:theme.headerIconColor}}/>
      </Link >
    </IconButton>
   <IconButton aria-label='openmenu' onClick={()=>{setMenuState(true)}} >
       <MenuIcon style={{color:theme.headerIconColor}} />
    </IconButton>
    
    <SwipeableDrawer 
        anchor={'right'}
        disableBackdropTransition={true}
        open={menuState} 
        onClose={()=>{setMenuState(false)}}
        onOpen={()=>{setMenuState(true)}}
        >
      <div className={`${theme.menuColor} ${theme.textcolor} h-screen `}>
         <div className='background object-contain relative '>
            <img className=' w-60 h-60 -z-[1] sm:w-60 sm:h-60 md:w-80 md:h-80 lg:w-80 lg:h-80' src={(new Date().getHours()>18)?(weatherbg.night2):(weatherbg.sunrise)} alt='bg-weather' />
            <div className='absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2  text-5xl text-white'>
               Settings
            </div>
         </div>
       <div>
           <ListItemButton aria-label='darkmode' >
              <DarkModeIcon className='mr-2' />
              <ListItemText primary='Darkmode'/>
             <Switch aria-label='toggledark' onChange={handleDarkTheme} checked={darkmodeCheck} />
           </ListItemButton> 
           <Divider />
          <ListItemButton aria-label='notifications' >
             <NotificationsActiveIcon className='mr-2'/> 
             <ListItemText primary='Notifications'/>
             <Switch aria-label='togglenotif' onChange={toggleNotif} checked={notifCheck} disabled={props.isLoading}/>
          </ListItemButton>
       </div>
    </div> 
     
    </SwipeableDrawer> 
</div> 
  <div className=" flex items-center justify-between px-2 py-1 font-bold sm:justify-center md:mx-3 md:justify-around lg:justify-around" >
    <Link aria-label='today' className=" rounded-l-full rounded-r-full px-2 border-b-2 border-sky-600 " 
      to='/' disabled={props.isLoading}>Today</Link>
    <Link aria-label='tomorrow' className=" rounded-l-full rounded-r-full px-2  border-sky-600 border-b-2"
    to='/tommorow'  disabled={props.isLoading}>Tomorrow</Link>
    <Link aria-label='8day' className="rounded-l-full rounded-r-full px-2 border-sky-600 border-b-2" to='/sevenday'  disabled={props.isLoading} >8 Days</Link>
  </div>
</div>
  );
return weatherheader;
}
export default WeatherHeader;

