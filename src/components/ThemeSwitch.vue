<script setup>
import { ref } from "vue";
import { useTheme } from "vuetify";

const darkTheme = ref(false);
const theme = useTheme();

const changeTheme = () => {
  theme.global.name.value = darkTheme.value ? "dark" : "light";
  localStorage.setItem('isDark', darkTheme.value)
};
darkTheme.value = (localStorage.getItem('isDark') == 'true') ? true : false;
theme.global.name.value = darkTheme.value ? "dark" : "light";
</script>

<template>
  <!-- dark theme switch -->
  <v-switch
    v-model="darkTheme"
    @update:model-value="changeTheme"
    :prepend-icon="darkTheme ? 'mdi-weather-night' : 'mdi-weather-sunny'"
    hide-details
    inset
    class="mr-auto"
  />
</template>
