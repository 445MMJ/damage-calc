<script>
import themeswitch from "./ThemeSwitch.vue";
import myFAB from "./MyFAB.vue";
import { mdiSwordCross } from "@mdi/js";
export default {
  components: {
    themeswitch,
    myFAB,
  },
  data() {
    return {
      mdiSwordCross,
      drawer: false,
      group: null,
      olditems: [
        {
          title: "システム計算機",
          value: "https://445mmj.github.io/system-calc/",
        },
        {
          title: "即死確率計算機",
          value: "https://445mmj.github.io/dr-calc/",
        },
        {
          title: "サポート画像作成",
          value: "https://445mmj.github.io/SupportTrim/",
        },
        {
          title: "中身",
          value: "https://github.com/445MMJ/damage-calc",
        },
      ],
      items: [
        {
          title: "計算結果",
          value: "#calc",
        },
        {
          title: "アタッカー",
          value: "#servant0",
        },
        {
          title: "サポーター1",
          value: "#servant1",
        },
        {
          title: "サポーター2",
          value: "#servant2",
        },
        {
          title: "サポーター3",
          value: "#servant3",
        },
        {
          title: "手動入力",
          value: "#self",
        },
      ],
    };
  },
  methods: {
    toggleMenu() {
      this.drawer = !this.drawer;
    },
  },
};
</script>

<template>
  <myFAB />
  <v-toolbar color="primary"  density="compact">
    <v-toolbar-title>ダメージ計算</v-toolbar-title>
    <v-spacer></v-spacer>
  </v-toolbar>
</template>
