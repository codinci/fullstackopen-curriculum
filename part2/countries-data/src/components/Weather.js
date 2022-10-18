import { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ capital }) => {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const [weatherCondition, setWeatherCondition] = useState("");

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${API_KEY}&units=metric`
      )
      .then((response) => setWeatherCondition(response.data));
  }, []);


  return (
    <div>
      <h3>Weather in {capital}</h3>
      {weatherCondition.hasOwnProperty("main") ? (
        <p>temperature {weatherCondition.main.temp} Celsius</p>
      ) : (
        <p>No details on temperature</p>
      )}
      {weatherCondition.hasOwnProperty("weather") ? (
        <img
          src={`http://openweathermap.org/img/wn/${weatherCondition.weather[0].icon}@2x.png`}
          alt={weatherCondition.weather[0].description}
          width="125px"
        />
      ) : (
        <p>No image to display</p>
      )}
      {weatherCondition.hasOwnProperty("wind") ? (
        <p>wind {weatherCondition.wind.speed} m/s</p>
      ) : (
        <p>No details on wind</p>
      )}
    </div>
  );
};

export default Weather;
