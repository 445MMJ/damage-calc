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
      items: [
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
  <v-sheet>
    <v-app-bar color="primary">
      <v-toolbar-title
        ><v-icon icon="mdi-sword-cross"></v-icon> ダメージ計算</v-toolbar-title
      >

      <template v-slot:append>
         
      <themeswitch />
      <v-btn
        v-for="item in items"
        :href="item.value"
        @click=""
        variant="text"
        class="d-none d-sm-flex"
        >{{ item.title }}</v-btn
      >
      <v-app-bar-nav-icon
        variant="text"
        @click.stop="drawer = !drawer"
        class="d-flex d-sm-none"
      ></v-app-bar-nav-icon>
        
      </template>
    </v-app-bar>

    <v-navigation-drawer :width="210" v-model="drawer" location="top" temporary>
      
      <v-list>  
        <v-list-item v-for="item in items" :key="item.title" @click="">
          <v-btn :href="item.value" @click="" variant="text">{{
            item.title
          }}</v-btn>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-sheet>
</template>
