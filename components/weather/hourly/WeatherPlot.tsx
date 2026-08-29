"use client"
import { useMemo } from "react";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Chart as ChartJS, registerables } from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(...registerables);


interface WeatherPlotProps {
    hourly: {
        dt: number,
        temp: number,
        weather: { icon: string }[]
    }[]
}

function WeatherPlot({ hourly }: WeatherPlotProps) {

    const { xl, dl } = useMemo(() => {
        let xl: string[] = [];
        let dl: number[] = [];
        hourly.forEach((element) => {
            const { dt, temp } = element;
            let d = new Date(dt * 1000);
            const afterTweleve = d.getHours() > 11;
            const time = afterTweleve ? d.getHours() - 12 : d.getHours();
            const timePrefix = afterTweleve ? "PM" : "AM"
            xl.push([time, timePrefix].join(" "));
            dl.push(Math.ceil(temp));
        });
        return { xl, dl };
    }, [hourly]);

    const plot = (
        <div className="max-w-full overflow-x-auto m-auto sm:max-w-[70%] sm:max-h-[70%] md:max-w-[70%] lg:max-w-[70%]">
            <Line
                data={{
                    labels: xl,
                    datasets: [
                        {
                            data: dl,
                            label: "",
                            backgroundColor: "rgba(255,0,0,0.3)",
                            borderColor: "red",
                            pointRadius: 4,
                            pointBackgroundColor: "rgba(255,100,100,0.5)",
                            pointBorderColor: "red",
                            tension: 0.5,
                            fill: true,
                            datalabels: {
                                //color: theme.plotDataColor,
                                anchor: "end",
                                align: "top",
                                offset: 7,
                            },
                        },
                    ],
                }}
                plugins={[ChartDataLabels]}
                options={{
                    layout: {
                        padding: {
                            top: 50,
                        },
                    },
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false,
                        },
                    },
                    scales: {
                        x: {
                            grid: {
                                display: false,
                            },
                            ticks: {
                                // color: theme.plotxColor,
                                minRotation: 0,
                                maxRotation: 0,
                            },
                        },
                        y: {
                            beginAtZero: false,
                            grid: {
                                display: false,
                            },
                            border: {
                                display: false,
                            },
                            ticks: {
                                display: false,
                                stepSize: 5,
                            },
                        },
                    },
                }}
            />
        </div>
    );
    return plot;
}
export default WeatherPlot;
