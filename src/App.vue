<template>
  <div>
    {{ test?.main.temp }}
  </div>
  <div class="mx-auto p-4 min-h-screen flex flex-col pb-16" style="background: url('backgrounds/sunny_day.jpg'); background-size: cover;">
    <Current />
    <Hourly />
    <Daily />
    
    
    <div class="fixed inset-x-0 bottom-0 pb-4 flex justify-center">
      <button class="bg-blue-500 hover:bg-blue-700 text-white h-16 w-16 leading-8 rounded-full shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out text-4xl">+</button>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";

import Current from "@/components/Current.vue";
import Hourly from "@/components/Hourly.vue";
import Daily from "@/components/Daily.vue";
import ForecastsStore from "@/stores/forecasts.js";
import geoLocation from "@/stores/geoLocation.js";
import coords from "@/stores/coords.js";

const test = ref(null);

const fetchTest = async() => {
  test.value = await ForecastsStore.getCurrent();
  console.log(test);
}

fetchTest();


</script>

<style>
/* Add your global styles here */
</style>
