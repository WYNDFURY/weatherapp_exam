import {
  getNavigatorLocationsCoordinates,
  getLocationCurrentWeather,
  getLocationDailyForecastsWeather,
  getLocationHourlyForecastsWeather
} from "@/lib/endpoints";
import { ref } from "vue";

export const useLocationServices = () => {

  // CURRENT WEATHER


  // current day
  const currentDay = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  
  // current date/hour
  
  const currentHour = currentDay.toLocaleTimeString("fr");
  const currentDate = currentDay.toLocaleDateString("en", options);

  const currentWeather = ref(null);

  const getCurrentWeather = async () => {
    const currentCoordinates = await getNavigatorLocationsCoordinates();
    currentWeather.value = await getLocationCurrentWeather(currentCoordinates);
  };

  // FORECASTS WEATHER

  const forecastsWeather = ref(null);
  const dailyWeatherList = ref(null);
  const hourlyWeatherList = ref(null);

  // function qui fetch les données de l'api
  const getForecastsWeather = async () => {
    const currentCoordinates = await getNavigatorLocationsCoordinates();
    forecastsWeather.value = await getLocationDailyForecastsWeather(currentCoordinates);
  };


  // function qui calcule l'avg par jour sur base des forecasts tous les 3h (array de 40)
  const calculateAveragesByDay = (forecasts) => {
    const forecastsByDay = forecasts.reduce((forecastsPerDay, forecast) => { 
      
      // rassemble les mêmes itérations de jour entre elles
      const dateString = forecast.dt_txt.split(' ')[0];

      // crée un object Date sur base de la date que sort l'api pour pouvoir en ressortir le jour
      const date = new Date(dateString);
      const weekDay = date.toLocaleDateString("fr", { weekday: "long" });
      
      if (!forecastsPerDay[dateString]) {
        forecastsPerDay[dateString] = {
          weekDay,
          forecasts: [],
        };
      }
      forecastsPerDay[dateString].forecasts.push(forecast);
      
      
      return forecastsPerDay;
      
      
    }, {});


    const averagesByDay = Object.keys(forecastsByDay).map((dateString) => {
      const { weekDay, forecasts } = forecastsByDay[dateString];

      const minTemp =
        forecasts.reduce((sum, forecast) => sum + forecast.main.temp_min, 0) /
        forecasts.length;
      const maxTemp =
        forecasts.reduce((sum, forecast) => sum + forecast.main.temp_max, 0) /
        forecasts.length;

      return {
        dateString,
        weekDay,
        minTemp,
        maxTemp,
      };
    });
    return averagesByDay;
  };


  // function qui utilise la function de calcul à partir du fetch (getDailyWeather) et qui assigne le tout dans dailyWeatherList

  const fetchDailyWeatherList = async () => {
    await getForecastsWeather();
    dailyWeatherList.value = calculateAveragesByDay(forecastsWeather?.value?.list);
  };

  return {
    currentHour,
    currentDate,
    currentWeather,
    forecastsWeather,
    dailyWeatherList,
    hourlyWeatherList,
    getCurrentWeather,
    getForecastsWeather,
    fetchDailyWeatherList,
    calculateAveragesByDay,
  };
};
