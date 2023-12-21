// Dans votre fichier de store pour les coordonnées
import { reactive } from 'vue';
import GeoLocationStore from "@/stores/geoLocation.js";

const coords = reactive({
    latitude: null,
    longitude: null
});

const fetchCoords = async () => {
    try {
        const newCoords = await GeoLocationStore.getCoords();
        coords.latitude = newCoords.latitude;
        coords.longitude = newCoords.longitude;
    } catch (err) {
        // Gérer l'erreur
        console.error(err.message);
    }
};

export default { coords, fetchCoords };