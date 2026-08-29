import { setHour } from "@/lib/utils";
import { WeatherReport } from "@/types/weather.types";
import Image from "next/image";

interface WeatherHourltSetterProps {
    time: number,
    icon: string,
    temp: number
}

interface WeatherHourlyProps {
    hourly: {
        dt: number,
        temp: number,
        weather: WeatherReport[]
    }[]
}

function WeatherHourlySetter({ icon, temp, time }: WeatherHourltSetterProps) {
    const data = (
        <div className="flex flex-col items-center px-4 py-4 m-2 rounded bg-sky-900 ">
            <span id="hourtime" className="text-white">{setHour(time)}</span>
            <Image
                className="w-15 h-15"
                src={`/icons/${icon}.svg`}
                alt=""
                width={60}
                height={60}
            />
            <span id="temp" className="text-white">{Math.ceil(temp)}°C</span>
        </div>
    );
    return data;
}

function WeatherHourly({ hourly }: WeatherHourlyProps) {
    const weatherhourly = (
        <div>
            <div
                className="mt-10 mb-2 font-bold text-xl border-b-2"
            >
                Hourly
            </div>
            <div
                className="flex mt-2 m-auto max-w-5xl py-2 overflow-y-scroll myscroll"
            >
                {hourly.map((element) => {
                    const { dt, temp, weather } = element;
                    return (
                        <WeatherHourlySetter
                            key={dt}
                            time={dt}
                            temp={temp}
                            icon={weather[0].icon}
                        />
                    );
                })}
            </div>
        </div>
    );
    return weatherhourly;
}
export default WeatherHourly;
