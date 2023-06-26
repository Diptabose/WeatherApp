import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { lightTheme, darkTheme } from "../Theme.js";
import "chartjs-plugin-style";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Chart as ChartJS, registerables } from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(...registerables);

function WeatherPlot(props) {
  const isDarkMode = useSelector((state) => state.darkmode);

  const theme = isDarkMode ? darkTheme : lightTheme;

  const [xlabels, setXlabels] = useState([]);

  const [dataLabels, setdataLabels] = useState([]);
  const timeStampCreator = useCallback(() => {
    let xl = [];
    let dl = [];
    props.hourly.forEach((element) => {
      const { dt, temp } = element;
      let d = new Date(dt * 1000);
      xl.push(d.getHours());
      dl.push(Math.ceil(temp));
    });
    setXlabels(xl);
    setdataLabels(dl);
  }, [props.hourly]);

  useEffect(() => {
    timeStampCreator();
  }, [timeStampCreator]);

  const plot = (
    <div className="max-w-full overflow-x-scroll m-auto sm:max-w-[70%] sm:max-h-[70%] md:max-w-[70%] lg:max-w-[70%]">
      <Line
        datasetIdKey="1234"
        data={{
          labels: xlabels,
          datasets: [
            {
              id: 1,
              data: dataLabels,
              label: "",
              backgroundColor: "rgba(255,0,0,0.3)",
              borderColor: "red",
              pointRadius: 4,
              pointBackgroundColor: "rgba(255,100,100,0.5)",
              pointBorderColor: "red",
              lineTension: 0.5,
              fill: true,

              datalabels: {
                color: theme.plotDataColor,
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
          legend: { display: false },
          scaleShowLabels: false,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            xAxes: {
              distribution: "series",
              grid: {
                display: false,
              },
              ticks: {
                color: theme.plotxColor,
                minRotation: 0,
                maxRotation: 0,
              },
            },
            yAxes: {
              grid: {
                display: false,
                drawBorder: false,
              },
              ticks: {
                display: false,
                beginAtZero: false,
                steps: 6,
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
