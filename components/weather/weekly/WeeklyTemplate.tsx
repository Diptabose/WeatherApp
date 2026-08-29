import { capitalise } from "@/lib/utils";
import Image from "next/image";
import { AccordionItem, AccordionContent, AccordionTrigger } from "@/components/ui/accordion"
import { sunSetter, todayOrNot } from "@/lib/weather";


export interface WeeklyOuterProps {
    day: number,
    description: string,
    icon: string
    max: number,
    min: number,
}

export interface WeeklyInnerProps {
    sunrise: number,
    sunset: number,
    humidity: number,
    pressure: number,
    windspeed: number,
    winddegree: number,
    clouds: number,
}

interface WeeklyTemlateProps {
    outer: WeeklyOuterProps,
    inner: WeeklyInnerProps
}


function AccordionInner({ sunrise, sunset, humidity, pressure, winddegree, windspeed, clouds }: WeeklyInnerProps) {
    return (<div
        className="flex py-3 w-full 1.5xm:flex-col 1.5xm:items-center"
        id="details"
    >
        <div
            className={`flex border-r-2 w-1/2 md:items-center 1.5xm:border-r-0 1.5xm:w-full`}
        >
            <div className="flex flex-col w-full">
                <div className="flex justify-between ">
                    <p className="truncate flex-1">Sunrise</p>
                    <p className="truncate flex-1">{sunSetter(sunrise)}</p>
                </div>

                <div className="flex justify-between md:justify-evenly">
                    <p className="py-1 truncate flex-1">Sunset</p>
                    <p className="py-1 truncate flex-1">{sunSetter(sunset)}</p>
                </div>

                <div className="flex justify-between md:justify-evenly">
                    <p className="truncate flex-1">Humidity</p>
                    <p className="truncate flex-1">{humidity}%</p>
                </div>

                <div className="flex justify-between md:justify-evenly">
                    <p className="py-1 truncate flex-1">Pressure</p>
                    <p className="py-1 truncate flex-1">{pressure} hPa</p>
                </div>
            </div>
        </div>
        <div className="flex ml-3 w-1/2 7xm:ml-0 1.5xm:w-full">
            <div className="flex flex-col w-full 1.5xm:w-full">
                <div className="flex justify-between md:justify-evenly">
                    <p className="truncate flex-1 1.75xm:flex-7">Windspeed</p>
                    <p className="truncate flex-1 1.75xm:flex-3">
                        {Math.floor(windspeed)} m/s
                    </p>
                </div>

                <div className="flex justify-between md:justify-evenly">
                    <p className="py-1 truncate flex-1 1.75xm:flex-7">WindDegree</p>
                    <p className="py-1 truncate flex-1 1.75xm:flex-3">
                        {winddegree}°
                    </p>
                </div>

                <div className="flex justify-between md:justify-evenly">
                    <p className="truncate flex-1 1.75xm:flex-7">Clouds</p>
                    <p className="truncate flex-1 1.75xm:flex-3">{clouds}%</p>
                </div>
            </div>
        </div>
    </div>);
}


function AccordionOuter({ day, description, icon, max, min }: WeeklyOuterProps) {
    return (
        <div
            id="maincard"
            className="flex justify-between items-center sm:justify-between md:justify-between w-full"
        >
            <div id="day&weather" className="7xm:w-1/2 wrap-break-word">
                <p className="m-0 truncate">{todayOrNot(day)}</p>
                <p className="m-0 truncate">{capitalise(description)}</p>
            </div>
            <div className="flex items-center">
                <Image
                    className="w-14 h-14 7xm:w-8 7xm:h-8"
                    width={56}
                    height={56}
                    src={`/icons/${icon}.svg`}
                    preload={true}
                    alt="morning"
                />
                <div id="maxmin" className="flex flex-col ">
                    <p className="font-medium">{max}</p>
                    <p>{min}</p>
                </div>
            </div>
        </div>);
}


export function WeeklyTemplate({ outer, inner }: WeeklyTemlateProps) {
    return (
        <AccordionItem value={todayOrNot(outer.day)}>
            <AccordionTrigger showTrigger={false}>
                <AccordionOuter {...outer} />
            </AccordionTrigger>
            <AccordionContent>
                <AccordionInner {...inner} />
            </AccordionContent>
        </AccordionItem>
    );
}