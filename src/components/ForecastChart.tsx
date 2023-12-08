import React from "react";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Line } from "react-chartjs-2";

Chart.register(CategoryScale);

interface WeatherChartProps {
  forecastData: IForecastData[];
}

const ForecastChart = ({ forecastData }: WeatherChartProps) => {
  const chartData = {
    labels: forecastData.map(
      (forecast) =>
        `${forecast.date.split("-")[2]}.${forecast.date.split("-")[1]} ${
          forecast.time.split(":")[0]
        }.${forecast.time.split(":")[1]}`
    ),
    datasets: [
      {
        label: "",
        data: forecastData.map((forecast) => +forecast.temp.split("\u00B0")[0]),
        backgroundColor: ["yellow", "red", "blue", "orange", "purple"],
        borderColor: "green",
        borderWidth: 2,
      },
    ],
  };

  return (
    <>
      {forecastData.length > 0 && (
        <Line
          data={chartData}
          options={{
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: "5 day forecast",
              },
              legend: {
                display: false,
              },
            },
          }}
        />
      )}
    </>
  );
};

export default ForecastChart;
