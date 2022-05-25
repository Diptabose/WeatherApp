import {useRef,useEffect} from 'react';
import {useSelector} from 'react-redux';
import {lightTheme ,darkTheme} from '../Theme.js';
import images from '../WeatherIcons';


function SetWeatherImages(icon){
  switch(icon){
  case 'Humidity':
    return images.humidity;
  case 'Max':
    return images.max;
  case 'Min':
    return images.min;
  case 'Pressure':
    return images.pressure;
  case 'UVI':
    return images._01d;
  case 'Speed':
    return images.wind;
  case 'WindDeg':
    return images.deg;
  case 'Clouds':
    return images._03d;
  default:
    return images._01d;
  }
}


function metric(param){
  switch(param){
  case 'Humidity':
    return '%';
  case 'Max':
    return '°C';
  case 'Min':
    return '°C';
  case 'Pressure':
    return 'hPa';
  case 'UVI':
    return '';
  case 'Speed':
    return 'm/s';
  case 'WindDeg':
    return '°';
  case 'Clouds':
    return '%';
  default:
    return '';
  }
}






function WeatherParamsSetter(props){
  const details=(
<div className="flex items-center mb-2 w-40">
  <div className="flex flex-col flex-1 items-center justify-center mr-2"> 
    <img className="w-10 h-10" src={SetWeatherImages(props.param)} alt={props.param} />
    <p className="font-bold">{props.param}</p>
  </div>
  <div className='flex flex-1 items-center'>
    <p className='truncate' >{props.paramvalue}{metric(props.param)}</p>
  </div>
</div>
  );
return details;
}

function WeatherDetails(props){
  const sunbar = useRef();
  const sunImg= useRef();
  const isDarkMode=useSelector(state=>state.darkmode);
  const theme=(isDarkMode)?(darkTheme):(lightTheme);
  
  const {wind,clouds,sys}= props.weatherdata;
  
  const {temp_min,temp_max,pressure,humidity}= props.weatherdata.main;
  
  const detailsLeft={Min:Math.floor(temp_min),Max:Math.ceil(temp_max),Pressure:pressure,Humidity:humidity}
  
  const detailsRight={Speed:wind.speed,WindDeg:wind.deg,Clouds:clouds.all,UVI:props.uvi}
  
  function SunSetter(time){
    if(time<0){
      return '00:00';
    }
    else{
      let d = new Date(time);
      return  [( d.getHours()<10 )?('0'+d.getHours()):(d.getHours()) ,
       (d.getMinutes()<10)?('0'+d.getMinutes()):(d.getMinutes())].join(':');
    }
  }
  
  function SunTotal(time){
    if(time<0){
      return '00:00 hrs Sun has set';
    }
    let min=Math.floor(time/60);
    let hours= min/60;
    let minDec= hours%1;
    let Hour = Math.floor(hours);
    let Min= Math.floor(minDec*60);
    return ((Hour<10)?('0'+Hour):(Hour))+':'+((Min<10)?('0'+Min):(Min))+' hrs';
  }
  
  
  useEffect(()=>{
    let d= new Date();
    let sunbarPx= sunbar.current.offsetWidth;
    let progress= d.getTime()-((sys.sunrise)*1000);
    if(progress>=((sys.sunset-sys.sunrise)*1000))
    {
      sunImg.current.style.display='none';
    }
    else{
    let total= (sys.sunset-sys.sunrise)*1000;
    let percent= Math.ceil((progress/total)*100);
    let px= Math.ceil((sunbarPx*percent)/100);
    sunImg.current.style.left=px+'px';
    }
  },[sys.sunset,sys.sunrise])
 
  
const weatherdetails=(
<div className={`${theme.textcolor} my-1`}>
  <p className={`${theme.textcolor} text-xl font-bold`}>Details</p>
  <div className={`border-t-2 pt-2 ${theme.bordercolor}`}>
    <div className={`rounded-lg py-2 ${theme.detailsColor} flex my-2`}>
      <div id="left" className="w-1/2 flex flex-col items-center border-r-2">
        <div className=" flex flex-col items-start ">
          {
          Object.entries(detailsLeft).map((element)=>{
          return  <WeatherParamsSetter key={element[0]} param={element[0]} paramvalue={element[1]} />
           })
          }
        </div>
      </div>
      <div id="right" className="w-1/2 flex flex-col items-center">
        <div className="flex flex-col items-start">
          {
           Object.entries(detailsRight).map((element)=>{
           return   <WeatherParamsSetter key={element[0]} param={element[0]} paramvalue={element[1]} />
             })
            }
        </div>
      </div>
    </div>
  </div>
  <p className={`font-bold text-xl ${theme.textcolor}`}>SunRise/SunSet</p>
    <div className={`border-t-2 py-2 ${theme.textcolor} ${theme.bordercolor}`}>
      <div className=" flex items-center
     justify-between">
        <div className=" flex flex-col">
          <img className="w-10 h-10"src={images.sunrise} alt="sunrise" />
          <p>{SunSetter(sys.sunrise*1000)}</p>
        </div>
      <div ref={sunbar} className="flex-auto h-4 rounded-r-full rounded-l-full bg-gradient-to-r from-amber-300 via-orange-600 to-gray-700 flex items-center relative">
        <img ref={sunImg} className={`absolute z-[2] w-12 h-12`} src={images._01d} alt='wind'/>
      </div>
      <div className="flex flex-col items-center">
        <img className="w-10 h-10"src={images.sunset} alt="sunset" />
        <p>{SunSetter(sys.sunset*1000)}</p>
      </div>
    </div>
    <div className="my-2 flex flex-col">
      <div className='flex'>
        <p className='flex-[3] md:flex-[1] lg:flex-[1]'>Total Time</p>
        <p className='flex-[7] md:flex-[9] lg:flex-[9]'>{SunTotal((sys.sunset-sys.sunrise))}</p>
      </div>
      <div className='flex'>
        <p className='flex-[3] md:flex-[1] lg:flex-[1]'>Time left</p>
        <p className='flex-[7] md:flex-[9] lg:flex-[9]'>{SunTotal((sys.sunset)-Math.floor(((new Date().getTime())/1000)))}</p>
      </div>
    </div>
  </div>  
</div>
  );
return weatherdetails;
}
export default WeatherDetails;

