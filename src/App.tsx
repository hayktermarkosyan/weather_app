import { useCallback, useState } from "react";
import { Box, ChakraProvider, Flex, Heading, theme } from "@chakra-ui/react";
import CitySelector from "./components/CitySelector";
import { getWeather, getWeatherForPeriod } from "./api/weatherAPI";
import WeatherTable from "./components/WeatherTable";
import ForecastTable from "./components/ForecastTable";

export const App = () => {
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState<IWeatherData | undefined>();
  const [forecastData, setForecastData] = useState<Array<IForecastData>>([]);

  const getCurrentCityWeather = useCallback((lat: number, lon: number) => {
    getWeather(lat, lon).then((data) => {
      setWeatherData({
        // eslint-disable-next-line no-useless-concat
        temp: Math.round(data.main.temp - 273.15) + "\u00B0" + " C",
        humidity: data.main.humidity + "%",
        windSpeed: Math.round(data.wind.speed * 3.6) + " km/h",
      });
    });
    getWeatherForPeriod(lat, lon).then((data) => {
      setForecastData([]);
      data.list.map((forecast: any) =>
        setForecastData((prevState) => {
          return [
            ...prevState,
            {
              date: forecast.dt_txt.split(" ")[0],
              time: forecast.dt_txt.split(" ")[1],
              // eslint-disable-next-line no-useless-concat
              temp: Math.round(forecast.main.temp - 273.15) + "\u00B0" + " C",
            },
          ];
        })
      );
    });
  }, []);
  return (
    <ChakraProvider theme={theme}>
      <Flex p={"5%"}>
        <CitySelector
          getCurrentCityWeather={getCurrentCityWeather}
          setCity={setCity}
          setCountry={setCountry}
          setForecastData={setForecastData}
        />
        {country && city && weatherData ? (
          <WeatherTable
            city={city}
            country={country}
            weatherData={weatherData}
          />
        ) : (
          <Box ml={"10%"} w={"70%"}>
            <Heading>Please, select country,state and city</Heading>
          </Box>
        )}
      </Flex>
      {forecastData.length > 0 && <ForecastTable forecastData={forecastData} />}
    </ChakraProvider>
  );
};
