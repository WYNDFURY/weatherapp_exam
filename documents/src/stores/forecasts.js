import { reactive } from 'vue';
import CoordsStore from '@/stores/coords.js'; 

const apiKey = 'b68afb69c2607c15cb4f6bf022f17e25';

export const ForecastsStore = reactive({
    getCurrent: async function() {
        await CoordsStore.fetchCoords();
        if (!CoordsStore.coords.latitude || !CoordsStore.coords.longitude) {
            throw new Error("Les coordonnées ne sont pas disponibles.");
        }

        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${CoordsStore.coords.latitude}&lon=${CoordsStore.coords.longitude}&appid=${apiKey}`);
            return await response.json();
        } catch (err) {
            throw err;
        }
    }
});

export default ForecastsStore;
