import { getNavigatorLocationsCoordinates, getWeatherLocation } from "@/lib/endpoints";
import { ref } from "vue";

export const getLocationServices = () => {
    
    // current day
    const currentDay = new Date();
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    const currentHour = currentDay.toLocaleTimeString("fr");
    const currentDate = currentDay.toLocaleDateString("en", options );
    
    // current weather
    
    const currentWeather = ref();
    
    const getCurrentWeather = async () => {
        const currentCoordinates = await getNavigatorLocationsCoordinates();
        currentWeather.value = await getWeatherLocation(currentCoordinates);
      };



    return { currentHour, currentDate, currentWeather, getCurrentWeather };
}
