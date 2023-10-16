<script>
import { mdiFileCodeOutline, mdiAlphaXBoxOutline } from "@mdi/js";
import packageJson from "../../package.json";
export default {
  data() {
    return {
      mdiFileCodeOutline,
      mdiAlphaXBoxOutline,
      version: packageJson.version,
    };
  },
};
</script>

<template>
  <v-footer>
    <v-btn
      href="https://github.com/445MMJ/damage-calc"
      class="mx-4"
      :icon="mdiFileCodeOutline"
      variant="text"
    ></v-btn>
    <v-btn
      href="https://twitter.com/intent/tweet?button_hashtag=test&ref_src=twsrc%5Etfw"
      class="mx-4"
      :icon="mdiAlphaXBoxOutline"
      variant="text"
    ></v-btn>
    <span>ダメージ計算機</span>
    <span>v{{ version }}</span>
  </v-footer>
</template>
