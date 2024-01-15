<template>
  <section class="bg-white rounded-lg shadow p-5">

    <h2 class="font-bold text-xl mb-4">Prochains Jours</h2>
    <div class="overflow-x-auto">
 {{dailyWeather?.list}}
    </div>
  </section>
</template>
  
<script setup type="module">
import { getLocationServices } from "@/lib/services/weathers/location.js";
import { ref, onMounted, watch } from "vue";

const { getDailyWeather, dailyWeather } = getLocationServices();
getDailyWeather();


watch(dailyWeather, (newVal) => {
  if (newVal) {
    // Access and log specific parts of the response
    console.log('City:', newVal.city.name);
    // console.log('Temperature:', newVal._rawValue.list[0].main.temp);
    // Add more properties as needed
  }
});
</script>
  