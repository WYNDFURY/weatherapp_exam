<script setup>
import { reactive } from "vue";
import LocationStore from "@/stores/locations.js";

const coords = reactive(null);

const fetchCoords = async () => {
  try {
    coords = await LocationStore.getCoords();
    console.log(coords);
  } catch (err) {
    console.error(err.message);
  }
};

fetchCoords();
</script>
<template>
  <h1>{{ coords }}</h1>
</template>
