<script>
import themeswitch from "./ThemeSwitch.vue";
import { mdiFileCodeOutline, mdiAlphaXBoxOutline } from "@mdi/js";
import packageJson from "../../package.json";
export default {
  components: {
    themeswitch,
  },
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
    <span class="mx-4">ダメージ計算機</span>
    <span class="mx-4">v{{ version }}</span>
    <v-btn
      href="https://github.com/445MMJ/damage-calc"
      class="mx-4"
      :icon="mdiFileCodeOutline"
      variant="text"
      alt="GitHub"
    ></v-btn>
    <v-btn
      href="https://twitter.com/intent/tweet?button_hashtag=test&ref_src=twsrc%5Etfw"
      class="mx-4"
      :icon="mdiAlphaXBoxOutline"
      variant="text"
      alt="Twitter"
    ></v-btn>
  </v-footer>
</template>
