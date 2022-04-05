import NoSignal from '../AlertIcons/noSignal.png';
import NoService from '../AlertIcons/searchManualLoaction.png';
import {useSelector} from 'react-redux';
import {lightTheme ,darkTheme} from '../Theme.js';
function Alert(props){
  const isDarkMode=useSelector((state)=>state.darkmode);
  const theme=(isDarkMode)?(darkTheme):(lightTheme);
  let borderColor=null;
  if(props.data.isGPS===0){
borderColor="border-rose-700";
}
  else {
  borderColor="border-sky-700";
   }

  const alert=(
  <div className="h-screen" >
    <div className="h-1/2 flex flex-col justify-between sm:h-2/5 md:h-2/5 lg:h-2/5">
    <div className={`${theme.textcolor} px-4 py-2 mt-4  ${borderColor} border-2 border rounded-md font-bold`}>
           {props.data.alertMsg}
    </div>
    <div className=" self-center">
      <img className="w-40 h-40" src={props.data.isGPS===0?NoSignal:NoService} alt="NoService/NoSignal" />
    </div>
  </div>
</div>
  );
return alert;
}
export default Alert;
