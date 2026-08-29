import { AirPollutionList, AirPollutionMain } from "@/types/air-pollution.types.js";

interface AirQualityIndexPros {
    aqi: AirPollutionList
}

interface AirQualityDetialsProps {
    chem: string,
    conc: number
}


function elementParser(text: string, isSub: boolean) {
    let index = text.search(/[^A-Z]/g);
    let subscript = text.slice(index, text.length);
    if (isSub) {
        if (index === -1) {
            return "";
        } else {
            return subscript;
        }
    } else {
        if (index === -1) {
            return text;
        } else {
            return text.slice(0, index);
        }
    }
}

function AirQualityDetails({ chem, conc }: AirQualityDetialsProps) {

    const aqd = (
        <div className="flex mb-2">
            <span className="flex-1 font-bold mr-2">
                {elementParser(chem.replace("_", "").toUpperCase(), false)}
                <sub>
                    {elementParser(chem.replace("_", "").toUpperCase(), true)}
                </sub>
            </span>
            <span className="flex-1">{conc}</span>
        </div>
    );
    return aqd;
}

export function AirQualityIndex({ aqi }: AirQualityIndexPros) {

    const { main, components } = aqi;
    const { co, nh3, no, no2, o3, pm2_5, pm10, so2 } = components;
    const leftAir = {
        co,
        nh3,
        no,
        no2,
    };
    const rightAir = {
        o3,
        pm2_5,
        pm10,
        so2,
    };

    const aqiComponent = (
        <div>
            <p className="text-xl font-bold">Air Quality Index</p>
            <div
                className="flex items-center justify-around border-t-2  xm:justify-center sm:justify-center 4xm:flex-col 3xm:flex-col md:justify-center lg:justify-center text-white"
            >
                <div className="h-40 w-40 rounded-full bg-rose-600 my-2 flex flex-col items-center justify-center 4xm:h-28 4xm:w-28 ">
                    <p className="text-4xl tracking-wide 4xm:text-xl">AQI</p>
                    <h1 className="text-3xl font-bold">{main.aqi}</h1>
                </div>

                <div className="rounded-lg py-2 bg-sky-700  my-2 xm:mx-5 sm:mx-5 md:mx-5 lg:mx-5 p-4">
                    <div className="flex flex-col 3xm:flex-row xm:flex-row sm:flex-row md:flex-row lg:flex-row ">
                        <div
                            id="left"
                            className="flex flex-col items-stretch 3xm:mr-2 xm:mr-2 sm:mr-2 md:mr-2 lg:mr-2 "
                        >
                            {Object.entries(leftAir).map((element) => {
                                return (
                                    <AirQualityDetails
                                        key={element[0]}
                                        chem={element[0]}
                                        conc={element[1]}
                                    />
                                );
                            })}
                        </div>
                        <div
                            id="right"
                            className="flex  flex-col items-stretch 3xm:ml-2 xm:ml-2 sm:ml-2 md:ml-2 lg:ml-2"
                        >
                            {Object.entries(rightAir).map((element) => {
                                return (
                                    <AirQualityDetails
                                        key={element[0]}
                                        chem={element[0]}
                                        conc={element[1]}
                                    />
                                );
                            })}
                        </div>
                    </div>
                    <p className="text-center">
                        Values in ug/m<sup>3</sup>
                    </p>
                </div>
            </div>
        </div>
    );
    return aqiComponent;
}

