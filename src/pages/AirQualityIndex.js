import {useSelector} from 'react-redux';
import {lightTheme, darkTheme} from '../Theme.js';

function AirQualityDetails(props){
  function elementParser(text,isSub){
    let index= text.search(/[^A-Z]/g);
    let subscript= text.slice(index,text.length);
    if(isSub){
      if(index===-1){return "";}else{return subscript;}
    }
    else{
      if(index===-1){return text;}else{return text.slice(0,index);}
     }
  }
  const aqd=(
    <div className="flex mb-2">
       <p className="flex-1 font-bold mr-2">{elementParser(props.chem.replace("_",'').toUpperCase(),false)}<sub>{elementParser(props.chem.replace("_",'').toUpperCase(),true)}</sub></p>
       <p className='flex-1'>{props.conc}</p>
    </div>
    );
return aqd;
}

function AirQualityIndex(props)
{
const isDarkMode=useSelector((state)=>state.darkmode);
const theme=(isDarkMode)?(darkTheme):(lightTheme);
const {main, components}= props.aqi;

const aqi=(
<div>
 <p className={`text-xl font-bold ${theme.textcolor} `}>AirQualityIndex</p>
  <div className={`flex items-center justify-around border-t-2 ${theme.bordercolor}`}>
  <div className="h-40 w-40 rounded-full bg-rose-600 my-2 flex flex-col items-center justify-center">
        <p className="text-4xl tracking-">AQI</p>
        <h1 className="text-3xl font-bold">{main.aqi}</h1>
  </div>
    
  <div className="rounded-lg py-2 bg-sky-700 flex my-2 p-4 ">
    <div id="left" className="flex flex-col items-stretch">
      {
        Object.entries(components).map((element)=>{
        return <AirQualityDetails key={element[0]} chem={element[0]} conc={element[1]} />
        })
        }
        <p className='text-center'>Values in ug/m<sup>3</sup></p>
    </div>
  </div>
 </div>
</div>
);
return aqi;
}
export default AirQualityIndex;
