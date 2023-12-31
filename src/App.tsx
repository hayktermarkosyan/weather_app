import { useCallback, useEffect, useState } from "react";
import {
  Box,
  ChakraProvider,
  Flex,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  theme,
} from "@chakra-ui/react";
import CitySelector from "./components/CitySelector";
import { getWeather, getWeatherForPeriod } from "./api/weatherAPI";
import WeatherTable from "./components/WeatherTable";
import ForecastTable from "./components/ForecastTable";
import { byIso } from "country-code-lookup";
import ForecastChart from "./components/ForecastChart";

export const App = () => {
  const [country, setCountry] = useState<string | undefined>();
  const [city, setCity] = useState<string | undefined>();
  const [weatherData, setWeatherData] = useState<IWeatherData | undefined>();
  const [forecastData, setForecastData] = useState<Array<IForecastData>>([]);

  const getCurrentCityWeather = useCallback(
    async (lat: number, lon: number) => {
      const currentWeather = await getWeather(lat, lon);
      setWeatherData({
        temp: `${Math.round(currentWeather.main.temp - 273.15) + "\u00B0"} C`,
        humidity: currentWeather.main.humidity + "%",
        windSpeed: Math.round(currentWeather.wind.speed * 3.6) + " km/h",
      });
      setForecastData([]);
      const forecastForPeriod = await getWeatherForPeriod(lat, lon);
      const forecastDataArr: any[] = [];
      forecastForPeriod.list.forEach((forecast: any) => {
        forecastDataArr.push({
          date: forecast.dt_txt.split(" ")[0],
          time: forecast.dt_txt.split(" ")[1],
          temp: `${Math.round(forecast.main.temp - 273.15) + "\u00B0"} C`,
        });
      });
      setForecastData(forecastDataArr);
    },
    []
  );

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      console.log("Geolocation is not available in your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      const currentWeather = await getWeather(
        position.coords.latitude,
        position.coords.longitude
      );
      setCity(currentWeather.name);
      setCountry(byIso(currentWeather.sys.country)?.country);
      setWeatherData({
        temp: `${Math.round(currentWeather.main.temp - 273.15) + "\u00B0"} C`,
        humidity: currentWeather.main.humidity + "%",
        windSpeed: Math.round(currentWeather.wind.speed * 3.6) + " km/h",
      });

      setForecastData([]);
      const forecastForPeriod = await getWeatherForPeriod(
        position.coords.latitude,
        position.coords.longitude
      );
      const forecastDataArr: any[] = [];
      forecastForPeriod.list.forEach((forecast: any) => {
        forecastDataArr.push({
          date: forecast.dt_txt.split(" ")[0],
          time: forecast.dt_txt.split(" ")[1],
          temp: `${Math.round(forecast.main.temp - 273.15) + "\u00B0"} C`,
        });
      });
      setForecastData(forecastDataArr);
    });
  }, []);

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
            <Box textAlign={"center"} mt={"5%"}>
              <Heading mt={"2%"} fontSize={"medium"}>
                5 day forecast
              </Heading>
              <Tabs
                mt={"2%"}
                isFitted
                variant="enclosed"
                colorScheme={"whatsapp"}
              >
                <TabList mb="1em">
                  <Tab>Forecast Table</Tab>
                  <Tab>Forecast Chart</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <ForecastTable forecastData={forecastData} />
                  </TabPanel>
                  <TabPanel>
                    <ForecastChart forecastData={forecastData} />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
          )}
        </Box>
      </Flex>
    </ChakraProvider>
  );
};
