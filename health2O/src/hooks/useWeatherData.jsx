import { useState, useEffect } from "react";
import * as Location from "expo-location";
import axios from "axios";

const API_KEY = "fd776bec97148d909df22c375744705c";
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

const useWeatherData = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const getLocationAndFetchWeather = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.error("Permission to access location was denied");
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        const response = await axios.get(API_URL, {
          params: {
            lat: latitude,
            lon: longitude,
            appid: API_KEY,
            units: "imperial",
          },
        });
        setWeatherData(response.data);
      } catch (error) {
        console.error("Error getting location or weather data:", error);
      }
    };

    getLocationAndFetchWeather();
  }, []);

  return weatherData;
};

export default useWeatherData;
