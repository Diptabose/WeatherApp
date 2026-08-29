import { DefaultMap } from "@/lib/utils";
import Image from "next/image";


interface WeatherParamProps {
    param: string,
    paramValue: number
}


const DEFAULT_IMAGE = "/icons/01.svg";
const weatherImageMapper: Record<string, string> = {
    Humidity: "/icons/humidity.svg",
    Max: "/icons/max.svg",
    Min: "/icons/min.svg",
    Pressure: "/icons/pressure.svg",
    UVI: "/icons/01d.svg",
    Speed: "/icons/wind.svg",
    WindDeg: "/icons/deg.svg",
    Clouds: "/icons/03.svg"
};
const weatherImageMap = new DefaultMap(Object.entries(weatherImageMapper));


const metricMapper: Record<string, string> = {
    Humidity: "%",
    Max: "°C",
    Min: "°C",
    Pressure: "hPa",
    UVI: "",
    Speed: "m/s",
    WindDeg: "°",
    Clouds: "%"
}
const metricMap = new DefaultMap(Object.entries(metricMapper));


export function WeatherParams({ param, paramValue }: WeatherParamProps) {
    const details = (
        <div
            className={`flex items-center w-40 sm:justify-around md:justify-around lg:justify-around mb-2 sm:w-56 md:w-56 lg:w-56 md:max-w-full 2xm:flex-col 2xm:max-w-full xs:flex-col xs:max-w-full`}
        >
            <div className="flex flex-1 flex-col items-center justify-center sm:mr-2 md:mr-2">
                <Image
                    className="w-10 h-10"
                    src={weatherImageMap.getOrDefault(param, DEFAULT_IMAGE)}
                    alt={param}
                    width={40}
                    height={40}
                />
                <span className="font-bold truncate">{param}</span>
            </div>
            <div className="flex flex-1 md:pl-8 lg:pl-8">
                <span className="truncate">
                    {paramValue}
                    {metricMap.getOrDefault(param, "")}
                </span>
            </div>
        </div>
    );
    return details;
}