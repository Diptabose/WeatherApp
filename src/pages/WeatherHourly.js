import {lightTheme, darkTheme } from '../Theme.js';
import {useSelector} from 'react-redux';
import ImageMapper from './ImageMapper.js';

function WeatherHourlySetter(props){
  function setHour(time){
    let d= new Date(time*1000);
    return [d.getHours(),d.getMinutes()].join(':');
  }
  const data=(
<div className="flex flex-col items-center px-4 py-4 m-2 rounded bg-sky-900 "> 
  <p id="hourtime">{setHour(props.time)}</p>
  <img className="w-15 h-15" src={ImageMapper('_'.concat(props.icon))} alt="" />
  <p id="temp">{Math.ceil(props.temp)}°C</p>
</div>
  );
return data;
}

function WeatherHourly(props){
  const isDarkMode= useSelector((state)=>state.darkmode);
  const theme=(isDarkMode)?(darkTheme):(lightTheme);
  const weatherhourly=(
  <div>
     <p className={`${theme.textcolor} mb-2 font-bold text-xl `}>Hourly</p>
     <div className={`flex mt-2 py-2 border-t-2 ${theme.bordercolor} overflow-y-scroll myscroll `}>
        {
       props.hourly.map((element)=>{
        const { dt, temp ,weather }= element;
        return <WeatherHourlySetter key={dt} time={dt} temp={temp} icon={weather[0].icon} />
           })
         }
      </div> 
</div>
  );
return weatherhourly;
}
export default WeatherHourly;
