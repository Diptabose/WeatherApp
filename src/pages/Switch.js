import {useState,useEffect,useCallback} from 'react';
function Switch(props){
  const [margin ,setMargin] = useState('0');
  const settingMargin = useCallback(()=>{
    if(props.showmargin){
      setMargin('6');
    }
    else{
      setMargin('0')
    }
  },[props.showmargin])
  
  useEffect(()=>{
    settingMargin();
  },[settingMargin]);
  
  
  
  
  const switchbtn=(
    <div>
     <button className={`ml-2 w-12 h-5 rounded-l-full rounded-r-full bg-sky-600 px-1 flex py-3 items-center`} >
          <div className={`w-4 h-4 rounded-full transition-[margin-left] duration-[350] bg-white ml-${margin} ease-in`}>
          </div>
      </button>
    </div>
  );
  return switchbtn;
}
export default Switch;

//onClick={handleDarkTheme}