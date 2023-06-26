import React , {useState , useEffect , createContext} from "react";



const SwipeContext = createContext();

function Swipe({children}){
 
    const [currentTab , setCurrentTab] = useState(0);

    return (

        <SwipeContext.Provider>
             <div className="grow flex w-full overflow-x-auto scroll-smooth snap-x snap-mandatory  myscroll">
                {children}
             </div>
        </SwipeContext.Provider>
    )
}