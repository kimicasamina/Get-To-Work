import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

export const WeatherContext = createContext();
export default function WeatherProvider({ children }) {
  const OPENWEATHER_APIKEY = "57dfe161bed447a804c8b8e946fdfffe";
  const GEOAPIFY_APIKEY = "c7afc54b44434159a164bcd7a3af212c";
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState({});
  const [weather, setWeather] = useState({});

  useEffect(() => {
    const fetchLocation = async () => {
      const { data } = await axios.get(
        `https://api.geoapify.com/v1/ipinfo?&apiKey=${GEOAPIFY_APIKEY}`,
        {
          withCredentials: false,
        }
      );
      console.log(data);
      setLocation({
        city: data.city.name.split(" ")[0],
        country: data.country.names.fr,
      });
    };

    fetchLocation();
  }, []);

  useEffect(() => {
    const fetchTemp = async () => {
      const { data } = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${location?.city}&units=metric&appid=${OPENWEATHER_APIKEY}`,
        {
          withCredentials: false,
        }
      );
      console.log(data);
      setWeather({
        cityName: data.name,
        desc: data.weather[0].description,
        temp: data.main.temp,
        icon:
          "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png",
      });
    };

    fetchTemp();
  }, [location]);

  console.log("location: ", location);
  console.log("weather: ", weather);

  return (
    <WeatherContext.Provider
      value={{
        weather,
        location,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

export const useWeather = () => useContext(WeatherContext);
