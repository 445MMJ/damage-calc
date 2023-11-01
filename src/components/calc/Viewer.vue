<script setup>
import { ref, computed } from "vue";
const props = defineProps({
  title: String,
  data: Object,
});
// リアクティブな状態
const selectedkey = ref(0);
const keys = computed(() => Object.keys(props.data));
</script>

<template>
  <v-container
    ><v-row
      ><v-col>
        <div>
          <v-select
            v-model="selectedkey"
            :label="props.title"
            :items="keys"
            variant="outlined"
            density="compact"
            hide-details="auto"
          ></v-select></div></v-col
      ><v-col  align-self="center">
        <div>{{ props.data[selectedkey] }}</div>
      </v-col></v-row
    ></v-container
  >
</template>
