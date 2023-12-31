import images from '../WeatherIcons';
import ImageMapper from './ImageMapper.js';
import {useState} from 'react';
import {useSelector} from 'react-redux';
import {lightTheme, darkTheme} from '../Theme.js';

function SevenDayTemplate(props){
  const{day,description,max,min,icon}=props.outerDetails;
  const {sunrise,sunset,humidity,pressure,windspeed,winddegree,clouds,uvi}=props.innerDetails;
  const isDarkMode=useSelector((state)=>state.darkmode);
  const theme=(isDarkMode)?(darkTheme):(lightTheme);
  const [height,setHeight]=useState("max-h-0");
  
  function handleHeight(){
    if(height==="max-h-0")
    {
      setHeight("max-h-60");
    }
    else{
      setHeight("max-h-0");
    }
  }
  
  function todayOrNot(day){
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let d= new Date(day*1000)
    if(d.getDate()===new Date().getDate())
    {
      return 'Today';
    }
    else{
      return weekday[d.getDay()]
    }
  }
  
  function SunSetter(time){
      let d = new Date(time*1000);
      return  [( d.getHours()<10 )?('0'+d.getHours()):(d.getHours()) ,
       (d.getMinutes()<10)?('0'+d.getMinutes()):(d.getMinutes())].join(':');
  }
  
 const template=(
  <div className="px-2">
    <div className={`flex flex-col ${theme.sevendayCardColor} ${theme.textcolor} py-2 px-2 mt-2 rounded-lg  transition-[height] duration-75 transition-[background-color] duration-700`} onClick={handleHeight}>
      <div id="maincard" className="flex justify-between items-center sm:justify-around md:justify-around lg:justify-around">
        <div id="day&weather" className='w-40' >
          <p className="m-0 truncate">{todayOrNot(day)}</p>
          <p className="m-0 truncate">{description.charAt(0).toUpperCase().concat(description.slice(1))}</p>
        </div>
        <div className="flex items-center">
          <img className="w-14 h-14 "src={ImageMapper('_'.concat(icon),images)} alt="morning" />
          <div id="maxmin" className="flex flex-col ">
            <p className='font-medium'>{max}</p>
            <p>{min}</p>
          </div>
        </div>
      </div>
    </div>
    <div id="innerDetails" className={`flex flex-col transition-[max-height] duration-[350ms] ${height} overflow-hidden  px-2 mt-1  `}>
      <div className={`${theme.textcolor} flex py-3`} id="details">
        <div className={`flex flex-1 border-r-2 ${theme.bordercolor}`}>
          <div className='flex flex-col flex-1 md:items-center lg:items-center'>
            <p className='truncate'>Sunrise</p>
            <p className='py-1 truncate'>Sunset</p>
            <p className='truncate'>Humidity</p>
            <p className='py-1 truncate'>Pressure</p>
          </div>
          <div className="flex flex-col flex-1 items-start md:items-center lg:items-center">
            <p className='truncate'>{SunSetter(sunrise)}</p>
            <p className='py-1 truncate'>{SunSetter(sunset)}</p>
            <p className='truncate'>{humidity}%</p>
            <p className='py-1 truncate'>{pressure} hPa</p>
          </div>
        </div>
        <div className='flex flex-1 pl-3'>
          <div className='flex md:items-center lg:items-center flex-col flex-1'>
            <p className='truncate'>WindSpeed</p>
            <p className='py-1 truncate'>WindDegree</p>
            <p className='truncate'>Clouds</p>
            <p className='py-1 truncate'>UVI</p>
          </div>
          <div className="pl-3 flex flex-col flex-1 items-start md:items-center lg:items-center">
              <p className='truncate' >{Math.floor(windspeed)} m/s</p>
              <p className='py-1 truncate'>{winddegree}°</p>
              <p className='truncate'>{clouds}%</p>
              <p className='py-1 truncate'>{uvi}</p>
          </div>
        </div>
      </div>
    </div>
  </div>  
);
return template;
}

function SevenDay(props){
const sevenday=(
  <div className="flex flex-col pb-2">
  {
    props.sevendata.map((element)=>{
    const {dt,sunrise,sunset,temp,humidity,pressure,wind_speed,wind_deg,clouds,uvi,weather} = element;
    const outerDetails={day:dt,description:weather[0].description,icon:weather[0].icon,max:Math.ceil(temp.max),min:Math.ceil(temp.min)};
    const innerDetails={sunrise:sunrise,sunset:sunset,humidity:humidity,pressure:pressure,windspeed:wind_speed,winddegree:wind_deg,clouds:clouds,uvi:uvi}
      return <SevenDayTemplate key={dt} innerDetails={innerDetails} outerDetails={outerDetails} />
      })
  }
  </div>
);
return sevenday;
}
export default SevenDay;
