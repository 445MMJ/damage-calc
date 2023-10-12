<script>
import themeswitch from "./ThemeSwitch.vue";
export default {
  components: {
    themeswitch,
  },
  data() {
    return {
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
  <!-- <v-system-bar color="deep-purple darken-3"></v-system-bar> -->

  <v-app-bar
    scroll-behavior="collapse"
    scroll-threshold="50"
    color="primary"
    dense
  >
    <template v-slot:prepend>
      <v-app-bar-nav-icon
        variant="text"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-icon icon="mdi-sword-cross"></v-icon>
    </template>
    <v-toolbar-title>ダメージ計算</v-toolbar-title>
    <v-spacer></v-spacer>
  </v-app-bar>

  <v-navigation-drawer
    v-model="drawer"
    location="left"
    temporary
    rounded
    width="180"
  >
    <v-list>
      <v-list-item
        v-for="item in items"
        :key="item.title"
        :href="item.value"
        @click.stop="drawer = !drawer"
      >
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
      <v-list-item><themeswitch /></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
