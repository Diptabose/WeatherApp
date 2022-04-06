import Location  from '../WeatherBG/location.png';
import Search from '../WeatherBG/search.jpg';
import Building from '../WeatherBG/Building.png';
import Close from '../WeatherBG/close.png';
import {useState,useEffect,useRef} from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {lightTheme , darkTheme} from '../Theme.js';
import Spinner from './Spinner.js';


function WeatherHeader(props){
  const searchField= useRef();
  const isDarkMode=useSelector((state)=>state.darkmode);
  const theme=(isDarkMode)?(darkTheme):(lightTheme);
  const [input , setInput]=useState("");
  const [margin, setMargin]=useState('0');
  const [loading , setLoading]=useState(true);
  const [searchResults,setSearchResults]=useState([]);
  const [searchCross,setSearchCross]=useState(Search);
  const [redBorder, setRedBorder]=useState("");
  const [display,setDisplay]=useState('');
  function handleInput(e){
    let text= e.target.value;
    setInput(text);
    if(input.length===0){
      setRedBorder('');
      setSearchCross(Search);
    }
  }
  useEffect(()=>{
    if(isDarkMode){
      setMargin('2');
    }
    else{
      setMargin('0');
    }
  },[isDarkMode])
  
  function handleDarkTheme(){
       props.toggleDarkMode();
  }

  async function searchLocationWeather(){
    if(searchCross===Search&&input.length!==0){
        setSearchCross(Close);
        setLoading(true);
        try{
          let geo = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=3&appid=66d9420ba608bc0e68e2a6dffe8361ab`);
          let geoParse = await geo.json();
          setSearchResults(geoParse);
          setLoading(false);
        }
       catch(error){
         setRedBorder('border-b-red-500');
       }
    }
    else if(searchCross===Close){
     setInput("");
     setSearchCross(Search);
     setDisplay('');
     if(searchResults.length!==0){
        setSearchResults([]);
      }
    }
  }

function PlacesFromSearch(props){
  const {name,state,country,lat,lon} = props.place;
  let pos={coords:{lat:lat,long:lon}}
  
  function sendLocation(pos){
    props.toUserLocation(pos);
   }
   
  const placelist=(
    <Link to='/' key={lat} className='list-none truncate py-2 border-b-[1px] border-gray-400 hover:bg-gray-400 block' onClick={()=>{
      setInput(name+" ,"+state+" ,"+country);
      setDisplay('hidden');
      sendLocation(pos);}} >{name+" ,"+state+" ,"+country}
    </Link>
    );
  return placelist;
}

function loadLocalLocation(){
  props.currentLocation();
}

const weatherheader=(
<div className={`z-[3] border flex flex-col sticky top-0 ${theme.bgcolor}  ${theme.textcolor} transition-[background-color] duration-700`}>
<div className='flex items-center justify-between'>
  <div id="location and search" className="border flex-auto py-3 flex items-center  md:items-stretch lg:items-center ">
  
    <button className='border flex items-center justify-center relative w-8 h-8 rounded-full before:absolute before:top-0 before:bottom-0 before:right-0 before:left-0 before:bg-transparent before:-z-[1] before:rounded-full before:bg-transparent before:hover:bg-gray-300 before:hover:opacity-30 ' onClick={loadLocalLocation}>
       <img className={`w-6 h-6 ${theme.invert}`} src={Location} alt="location"  />
    </button>
    
    <div className={`flex flex-auto bg-transparent border-b-2 ${theme.bordercolor} relative ${redBorder}`}>
      <div className='flex flex-auto border items-center justify-between'>
        <input ref={searchField} className={` bg-transparent flex-auto border outline-none placeholder:text-white-500 `}  placeholder="Search for city, state or country" value={input}  disabled={props.isLoading} type="text" autocomplete='off' onChange={handleInput}/>
        <button onClick={searchLocationWeather} className='w-6 h-6 border' ><img className={`${theme.invert}`} src={searchCross} alt='search' /></button>
      </div>
      <div className={`${display} border w-full mt-2 px-3 rounded-md  bg-white top-full absolute text-black  ${(searchCross===Search)?('max-h-0 overflow-hidden'):("")}`} >
        {
         (loading)?(<Spinner />):
         (
          (searchResults.length!==0)?(
            searchResults.map((element)=>{
             return <PlacesFromSearch place={element} key={element.lat} toUserLocation={props.switchToUserLocation} />
               }))
               :
           (<div className="py-4">No results found</div>)
        )
       }
      </div>
    </div>
    {/*<div className="border flex items-center">*/}
      <Link className={`border flex items-center justify-center relative w-8 h-8 rounded-full before:absolute before:top-0 before:bottom-0 before:right-0 before:left-0 before:bg-transparent before:-z-[1] before:rounded-full before:bg-transparent before:hover:bg-gray-300 before:hover:opacity-30`} to='/savedlocations' >
          <img className={` w-7 h-7`}src={Building} alt="" />
      </Link>
    </div>
    <div className='flex border items-center justify-center'>
      <button className={`border w-12 h-5 rounded-l-full rounded-r-full bg-sky-600 px-1 flex py-3 items-center`} onClick={handleDarkTheme}>
          <div className={`w-4 h-4 rounded-full transition-[margin-left] duration-[350] bg-white ml-${margin} ease-in`}>
          </div>
      </button>
      </div>
    {/*</div>*/}
  </div>
  <div className=" flex items-center justify-between px-2 font-bold sm:justify-center md:justify-center md:mr-4 lg:justify-around" >
    <Link className=" rounded-l-full rounded-r-full px-2 border-b-2 border-sky-600 "to='/' disabled={props.isLoading}>Today</Link>
    <Link className=" rounded-l-full rounded-r-full px-2  border-sky-600 border-b-2"to='/tommorow' disabled={props.isLoading}>Tommorow</Link>
    <Link className=" rounded-l-full rounded-r-full px-2 border-sky-600  border-b-2" to='/sevenday' disbaled={props.isLoading} >8 Days</Link>
  </div>
</div>
  );
return weatherheader;
}
export default WeatherHeader;

