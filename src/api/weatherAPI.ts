import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

export const getWeather = async (latitude: number, longitude: number) => {
  try {
    const { data } = await axios.get(
      `${API_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getWeatherForPeriod = async (
  latitude: number,
  longitude: number
) => {
  try {
    const { data } = await axios.get(
      `${API_URL}/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};
