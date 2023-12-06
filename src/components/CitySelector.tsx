import { Box } from "@chakra-ui/react";
import { useState, memo } from "react";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

interface CitySelectorProps {
  getCurrentCityWeather: (lat: number, lon: number) => void;
  setCountry: React.Dispatch<React.SetStateAction<string>>;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  setForecastData: React.Dispatch<React.SetStateAction<IForecastData[]>>;
}

const CitySelector = ({
  getCurrentCityWeather,
  setCity,
  setCountry,
  setForecastData,
}: CitySelectorProps) => {
  const [countryId, setCountryId] = useState(0);
  const [stateId, setStateId] = useState(0);

  return (
    <Box w={"20%"}>
      <h6>Country</h6>
      <CountrySelect
        onChange={(e: any) => {
          setForecastData([]);
          setCountryId(0);
          setStateId(0);
          setCity("");
          setCountryId(e.id);
          setCountry(e.name);
        }}
        placeHolder="Select Country"
      />
      <h6>State</h6>
      <StateSelect
        countryid={countryId}
        onChange={(e: any) => {
          setStateId(e.id);
        }}
        placeHolder="Select State"
      />
      <h6>City</h6>
      <CitySelect
        countryid={countryId}
        stateid={stateId}
        onChange={(e: any) => {
          getCurrentCityWeather(e.latitude, e.longitude);
          setCity(e.name);
        }}
        placeHolder="Select City"
      />
    </Box>
  );
};

export default memo(CitySelector);
