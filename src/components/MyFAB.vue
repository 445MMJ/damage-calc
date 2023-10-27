<script>
import themeswitch from "./ThemeSwitch.vue";
import { mdiSwordCross ,mdiMenu} from "@mdi/js";
export default {
  components: {
    themeswitch,
  },
  data() {
    return {
      mdiSwordCross,
      mdiMenu,
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
  <v-layout-item class="text-end pointer-events-none" model-value position="bottom" size="88">
    <div>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn  :icon="mdiMenu" class="pointer-events-initial" color="primary" v-bind="props"></v-btn>
          
        </template>
        
        <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            :href="item.value"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </v-layout-item>
</template>


<style scoped>
  .pointer-events-none {
    pointer-events: none;
  }

  .pointer-events-initial {
    pointer-events: initial;
  }
</style>