<script setup>
import { ref } from "vue";
import { useTheme } from "vuetify";
import { mdiWeatherNight } from "@mdi/js";
import { mdiWeatherSunny } from "@mdi/js";

const darkTheme = ref(false);
const theme = useTheme();

const changeTheme = () => {
  theme.global.name.value = darkTheme.value ? "dark" : "light";
  localStorage.setItem("isDark", darkTheme.value);
};
darkTheme.value = localStorage.getItem("isDark") == "true" ? true : false;
theme.global.name.value = darkTheme.value ? "dark" : "light";
</script>

<template>
  <!-- dark theme switch -->
  <div class=" d-inline-block">
  <v-switch 
    v-model="darkTheme"
    @update:model-value="changeTheme"
    :prepend-icon="darkTheme ? mdiWeatherNight : mdiWeatherSunny"
    hide-details
    inset
    class="px-3"
    aria-disabled="true"
  /></div>
</template>
