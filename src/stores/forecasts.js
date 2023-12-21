
import { reactive } from 'vue';
import CoordsStore from '../stores/coords.js'; 

const apiKey = '3bf91878b99224bae4b99eddee3489f2';

export const ForecastsStore = reactive({
    getCurrent: async function() {
        await CoordsStore.fetchCoords();
        if (!CoordsStore.coords.latitude || !CoordsStore.coords.longitude) {
            throw new Error("Les coordonnées ne sont pas disponibles.");
        }

        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${CoordsStore.coords.latitude}&lon=${CoordsStore.coords.longitude}&appid=${apiKey}&lang=fr&units=metric`);
            return await response.json();
        } catch (err) {
            throw err;
        }
    }
});

export default ForecastsStore;