import Location  from '../WeatherBG/location.png';
import Search from '../WeatherBG/search.jpg';
import Building from '../WeatherBG/Building.png';
import Close from '../WeatherBG/close.png';
import weatherbg from '../WeatherBG/';
import {useState,useEffect,useRef,useCallback} from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {lightTheme , darkTheme} from '../Theme.js';
import Switch from './Switch.js';
import Spinner from './Spinner.js';
import {sendNotif ,unSubscribeNotifications} from '../Notifications.js'

function WeatherHeader(props){
 
 const {Toaster} = props;
  const searchField= useRef();
  const isDarkMode=useSelector((state)=>state.darkmode);
  const theme=(isDarkMode)?(darkTheme):(lightTheme);
  const [input , setInput]=useState("");
  const [darkmodeMargin, setdarkMargin]=useState(false);
  const [notifMargin, setnotifMargin]=useState(false);
 const [menustate,setMenu]=useState({menu:'max-w-0 overflow-hidden opacity-0', background:'hidden'});
 
  const [loading , setLoading]=useState(true);
  const [searchResults,setSearchResults]=useState([]);
  const [searchCross,setSearchCross]=useState(Search);
  const [display,setDisplay]=useState('hidden');
  
  
  
  function handleInput(e){
    let text= e.target.value;
    setInput(text);
  }
  
  function handleEnterClick(e){
    if(e.keyCode===13){
         searchLocationWeather('search');
    }
  }
  useEffect(()=>{
   
    if(isDarkMode){
      setdarkMargin(true);
    }
    else{
      setdarkMargin(false);
    }
  },[isDarkMode])
  
 
  
  useEffect(()=>{
    const notification= window.localStorage.getItem('notif');
    if((notification===null)||notification==='denied'){
      setnotifMargin(false);
    }
    else{
      setnotifMargin(true);
    }
    
  },[])
  
  
  
  
  function handleDarkTheme(){
    props.toggleDarkMode();
  }


  
const searchLocationWeather=useCallback((command)=>{
  if(input.length===0)
    {
      return;
    }
    switch(command){
      case 'search':
        search();
        break;
      case 'close':
        closeBox();
        break;
      case 'closeBox':
        closeBox();
        break;
      default:
         console.warn('No function to perform default operation');
    }
   async function search(){
      setSearchCross(Close);
        setDisplay('block');
        setLoading(true);
        try{
          let geo = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=3&appid=66d9420ba608bc0e68e2a6dffe8361ab`);
          let geoParse = await geo.json();
          setSearchResults(geoParse);
          setLoading(false);
        }
       catch(error){
         Toaster(true,'Search Pending');
       }
    }
    
    function closeBox(){
      if(input.length===0||true){
      setInput('');
      setDisplay('hidden');
      setSearchCross(Search);
      setSearchResults([]);
      }
    }
},[input,Toaster])
  
   useEffect(()=>{
    if(input.length===0){
        searchLocationWeather('close');
    }
  },[searchCross,searchLocationWeather,input]); 
    

function PlacesFromSearch(props){
  const {name,state,country,lat,lon} = props.place;
  let pos={coords:{lat:lat,long:lon}}
  
  function sendLocation(pos){
    props.toUserLocation(pos);
   }
   
  const placelist=(
    <Link to='/' key={lat} className={`list-none truncate py-2 px-3 ${(!props.isLast)?'border-b-[1px]':''} border-gray-400 hover:bg-gray-400 block`} onClick={()=>{
      setInput(name+" ,"+state+" ,"+country);
      setDisplay('hidden');
      sendLocation(pos);}} >{name+" ,"+state+" ,"+country}
    </Link>
    );
  return placelist;
}

function loadLocalLocation(){
  searchLocationWeather('close');
  props.currentLocation();
}

function toggleMenu(){
  
  if(menustate.menu==='max-w-0 overflow-hidden opacity-0'){
    setMenu({menu:'max-w-[66.66%] opacity-100 sm:max-w-[40%] md:max-w-[40%] lg:mx-w-[33.33%]',background:'block'});
  }
  else{
    setMenu({menu:'max-w-0 overflow-hidden opacity-0',background:'hidden'});
  }
}

async function toggleNotif(){
  let res=null;
  const location= props.location();
  if(((window.localStorage.getItem('notif')==='denied')||(Notification.permission!=='granted'))||((window.localStorage.getItem('notif')===null)||(Notification.permission!=='granted')))
  {
    setnotifMargin(true);
    window.localStorage.setItem('notif','granted');
   res =await sendNotif(location);
   if(!res){
     setnotifMargin(false);
     window.localStorage.setItem('notif','denied');
     Toaster(true,'Notification denied');
   }
   else{
     Toaster(true,'Notification subscribed');
   }
  }
  else{
    setnotifMargin(false);
    window.localStorage.setItem('notif','denied');
    res = await unSubscribeNotifications();
    if(res){
      setnotifMargin(true);
      window.localStorage.setItem('notif','granted');
      Toaster(true,'Unable to unsubscribe');
    }
    else{
      Toaster(true ,'Notifications unsubscribed');
    }
  }
}

async function handleSwitchClick(command){
  switch(command){
    case 'darkmode':
      handleDarkTheme();
      break;
    case 'notifications':
      toggleNotif();
      break;
    default:
       console.warn(`No action:${command} found`);
  }
}





const weatherheader=(
<div className={`flex flex-col ${theme.bgcolor} ${theme.textcolor} transition-[background-color] duration-700 z-[20]`}>
  <div id="location and search" className="flex-auto py-3 flex items-center">
    <Link className={`items-center justify-center relative w-8 h-8 rounded-full before:absolute before:top-0 before:bottom-0 before:right-0 before:left-0 before:bg-transparent before:-z-[1] before:rounded-full before:bg-transparent before:hover:${theme.iconHoverColor} before:hover:opacity-30 self-center`} onClick={loadLocalLocation} to='/' >
       <img className={`w-6 h-6 ${theme.invert}`} src={Location} alt="location"  />
    </Link>
    <div className={`flex flex-auto bg-transparent border-b-2 ${theme.bordercolor} relative`}>
      <div className='flex flex-auto items-center justify-between z-[5]'>
        <input ref={searchField} className={` bg-transparent flex-auto outline-none placeholder:text-white-500 `}  placeholder="Search for city, state or country" value={input}  disabled={props.isLoading} type="text" autocomplete='off' onChange={handleInput} onKeyUp={handleEnterClick} />
        <button onClick={
          ()=>{
            searchLocationWeather((searchCross===Search)?'search':'close');
          }
        }
       className={`${(searchCross===Close)?'w-3 h-3':'w-6 h-6'} z-[6]`}><img className={`${theme.invert} w-full h-full`} src={searchCross} alt='search' /></button>
      </div>
   <div className={`${display}`}>
      <div className='fixed left-0 right-0 top-0 bottom-0 ' onClick={()=>{searchLocationWeather('close')}}></div> 
      <div className={`${display} w-full mt-2  py-1 rounded-md bg-white top-full  absolute text-black -translate-x-full `} >
        {
         (loading)?(<Spinner center={false} />):
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
      <Link className={`flex items-center justify-center relative w-8 h-8  rounded-full before:absolute before:top-0 before:bottom-0 before:right-0 before:left-0 before:bg-transparent before:-z-[1] before:rounded-full before:bg-transparent before:hover:${theme.iconHoverColor} before:hover:opacity-30`} to='/savedlocations' >
          <img className={` w-6 h-6`}src={Building} alt="" />
      </Link>
    
     <button className={`flex items-center justify-center relative  w-8 h-8 rounded-full before:absolute before:top-0 before:bottom-0 before:right-0 before:left-0 before:bg-transparent before:-z-[1] before:rounded-full before:bg-transparent before:hover:${theme.iconHoverColor} before:hover:opacity-30 `} onClick={toggleMenu}>
       <img className={`w-8 h-8 ${theme.invert}`} src={weatherbg.hamburger} alt="location"  />
    </button>
    
   <div className={`${menustate.menu} absolute right-0 top-0 z-[5]  transition-all duration-[500ms]`}>
  
    <div className={` ${menustate.background} fixed right-0  bottom-0 left-0 top-0 -z-[1]`} onClick={toggleMenu}></div>
    
    <div className={`flex flex-col  z-[3] h-screen ${theme.menuColor} ${theme.textcolor}`}>
       <div className='bg-cover bg-blend-darken h-1/3 w-full relative' >
         <img className='h-full w-full -z-[1] opacity-90' src={(new Date().getHours() < 18)?(weatherbg.sunrise):(weatherbg.night)} alt='frame'/>
         <p className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-5xl font-bold'>Settings</p>
       </div>
     <div className={`px-2 py-3 flex flex-col`}>
      <div className='py-2 flex justify-between'>
        <div className='flex items-center mr-5'>
           <img className='w-5 h-5 mx-1' src={weatherbg.darkmode} alt='dark' />
           <span className='truncate'>Dark Theme</span>
        </div>
        <div onClick={()=>{handleSwitchClick('darkmode')}}>
        <Switch showmargin={darkmodeMargin} />
        </div>
      </div>
      <div className='py-2 justify-between flex'>
        <div className='flex items-center mr-5 '>
           <img className='w-5 h-5 mx-1' src={weatherbg.notification} alt='notification'/>
           <span className='truncate'>Notifications</span>
        </div>
        <div onClick={()=>{handleSwitchClick('notifications')}}>
           <Switch showmargin={notifMargin}/>
        </div>
      </div>
    </div>
  </div>
 </div> 
</div>
  <div className=" flex items-center justify-between px-2 py-1 font-bold sm:justify-center md:mx-3 md:justify-center lg:justify-around" >
    <Link className=" rounded-l-full rounded-r-full px-2 border-b-2 border-sky-600 " 
      to='/' disabled={props.isLoading}>Today</Link>
    <Link className=" rounded-l-full rounded-r-full px-2  border-sky-600 border-b-2"
    to='/tommorow'  disabled={props.isLoading}>Tomorrow</Link>
    <Link className="rounded-l-full rounded-r-full px-2 border-sky-600 border-b-2" to='/sevenday'  disabled={props.isLoading} >8 Days</Link>
  </div>
</div>
  );
return weatherheader;
}
export default WeatherHeader;

