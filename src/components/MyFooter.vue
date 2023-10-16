<script>
import { mdiFileCodeOutline ,mdiAlphaXBoxOutline } from "@mdi/js";
import packageJson from "../../package.json"
export default {
  data() {
    return {
      mdiFileCodeOutline,
      mdiAlphaXBoxOutline,
      version: packageJson.version
    };
  },
};
</script>

<template>
  <v-footer>
    <v-btn class="mx-4" :icon="mdiFileCodeOutline" variant="text"></v-btn>
    <v-btn class="mx-4" :icon="mdiAlphaXBoxOutline" variant="text"></v-btn>
    <span> ダメージ計算機 {{ version }}</span>
  </v-footer>
</template>
