import { useCallback, useEffect, useState } from "react";
import { Box, ChakraProvider, Flex, Heading, theme } from "@chakra-ui/react";
import CitySelector from "./components/CitySelector";
import { getWeather, getWeatherForPeriod } from "./api/weatherAPI";
import WeatherTable from "./components/WeatherTable";
import ForecastTable from "./components/ForecastTable";
import { byIso } from "country-code-lookup";

export const App = () => {
  const [country, setCountry] = useState<string | undefined>();
  const [city, setCity] = useState<string | undefined>();
  const [weatherData, setWeatherData] = useState<IWeatherData | undefined>();
  const [forecastData, setForecastData] = useState<Array<IForecastData>>([]);

  const getCurrentCityWeather = useCallback((lat: number, lon: number) => {
    getWeather(lat, lon).then((data) => {
      setWeatherData({
        temp: `${Math.round(data.main.temp - 273.15) + "\u00B0"} C`,
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
              temp: `${Math.round(forecast.main.temp - 273.15) + "\u00B0"} C`,
            },
          ];
        })
      );
    });
  }, []);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        getWeather(position.coords.latitude, position.coords.longitude).then(
          (data) => {
            setCity(data.name);
            setCountry(byIso(data.sys.country)?.country);
            setWeatherData({
              temp: `${Math.round(data.main.temp - 273.15) + "\u00B0"} C`,
              humidity: data.main.humidity + "%",
              windSpeed: Math.round(data.wind.speed * 3.6) + " km/h",
            });
          }
        );
        getWeatherForPeriod(
          position.coords.latitude,
          position.coords.longitude
        ).then((data) => {
          setForecastData([]);
          data.list.map((forecast: any) =>
            setForecastData((prevState) => {
              return [
                ...prevState,
                {
                  temp: `${
                    Math.round(forecast.main.temp - 273.15) + "\u00B0"
                  } C`,
                  date: forecast.dt_txt.split(" ")[0],
                  time: forecast.dt_txt.split(" ")[1],
                },
              ];
            })
          );
        });
      });
    } else {
      console.log("Geolocation is not available in your browser.");
    }
  }, []);

  console.log();

  return (
    <ChakraProvider theme={theme}>
      <Flex p={"5%"} flexDir={{ base: "column", xl: "row" }}>
        <CitySelector
          getCurrentCityWeather={getCurrentCityWeather}
          setCity={setCity}
          setCountry={setCountry}
          setForecastData={setForecastData}
        />
        <Box
          w={{ base: "100%", xl: "70%" }}
          ml={{ base: "0", xl: "10%" }}
          mt={{ base: "10%", xl: "0" }}
        >
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
          {forecastData.length > 0 && (
            <ForecastTable forecastData={forecastData} />
          )}
        </Box>
      </Flex>
    </ChakraProvider>
  );
};
