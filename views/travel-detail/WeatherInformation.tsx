"use client";
import React, { useEffect, useState } from "react";
import axios from "axios"; 

const appID = "WRLvspRKpJM7juiQoMeP";
const appCode = "pWac4fCpNYrpy0AyG1d3fNwFQLc_JMOzAm-gKZfaXb8";

const WeatherInformation = () => {
  const [weatherData, setWeatherData] = useState<any>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(
          `https://weather.cit.api.here.com/weather/1.0/report.json?app_id=${appID}&app_code=${appCode}&product=observation&name=Ulaanbaatar`
        );
        setWeatherData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeather();
  }, []);

  return (
    <div className="w-full border flex flex-col border-black text-sm">
      {weatherData ? (
        <div>
          <h3>Weather in Ulaanbaatar:</h3>
          <p>
            Temperature:{" "}
            {weatherData.observations.location[0].observation[0].temperature}°C
          </p>
          <p>
            Condition:{" "}
            {weatherData.observations.location[0].observation[0].description}
          </p>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default WeatherInformation;
