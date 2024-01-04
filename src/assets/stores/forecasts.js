import { reactive, ref, computed } from 'vue';
import CoordsStore from '@/stores/coords.js'; 

const apiKey = 'b68afb69c2607c15cb4f6bf022f17e25'; // Mettez votre api key
const current= ref([]);
const hourly = ref([]);
const daily = computed(() => {
    // Ici vient la logique pour extraire les dailyForecats
});

export const ForecastsStore = reactive({
    getCurrent: async function() {
        if (!CoordsStore.coords.latitude || !CoordsStore.coords.longitude) {
            throw new Error("Les coordonnées ne sont pas disponibles.");
        }

        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${CoordsStore.coords.latitude}&lon=${CoordsStore.coords.longitude}&appid=${apiKey}`);
            current.value = await response.json();
            return current.value;
        } catch (err) {
            throw err;
        }
    },
    getHourlyForecasts: async function() {
        if (!CoordsStore.coords.latitude || !CoordsStore.coords.longitude) {
            throw new Error("Les coordonnées ne sont pas disponibles.");
        }

        try {
            const resp1 = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${CoordsStore.coords.latitude}&lon=${CoordsStore.coords.longitude}&appid=${apiKey}`);
            const resp2 = await resp1.json();
       
            hourly.value = resp2.list.map(hour => {
                const datetime = new Date(hour.dt * 1000);
                return {
                    dt: datetime,
                    hour: datetime.getHours() - 1,
                    day: datetime.getDay(),
                    ...hour, // Copie toutes les propriétés existantes de l'objet 'hour'
                };
            });
            return hourly.value;
        } catch (err) {
            throw err;
        }
    },
    getDailyForecasts: async function() {
        return await daily.value;
    }
});

export default ForecastsStore;
