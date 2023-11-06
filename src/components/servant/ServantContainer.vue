<script>
import { defineAsyncComponent } from "vue";
let asyncData = [];
const jsonUrl =
  "https://raw.githubusercontent.com/445MMJ/calc-data/main/servantList.json"; // JSONファイルのURL
async function asyncGetData() {
  const data = await fetch(jsonUrl);
  const dataJson = await data.json();
  return dataJson;
}
const searchButton = defineAsyncComponent(() => import("./SearchButton.vue"));
const servantSelect = defineAsyncComponent(() => import("./ServantSelect.vue"));

export default {
  emits: ["selectedServant"],

  components: {
    searchButton,
    servantSelect,
  },
  data() {
    return {
      selectAttriList: ["天", "地", "人", "星", "獣"],
      selectClassList: [
        "盾",
        "剣",
        "弓",
        "槍",
        "殺",
        "術",
        "騎",
        "狂",
        "月",
        "分",
        "讐",
      ],
      selectNobleList: [
        "全体Ｂ",
        "全体Ａ",
        "全体Ｑ",
        "単体Ｂ",
        "単体Ａ",
        "単体Ｑ",
        "補助Ｂ",
        "補助Ａ",
        "補助Ｑ",
      ],
      selectedAttri: "", //天地人
      selectedClass: "", //クラス
      selectedNoble: "", //NP種別
      selectedServant: null,
    };
  },
  async created() {
    //非同期処理でデータを取得
    asyncData = await asyncGetData();
  },
  methods: {
    updateSelectedSearch(option, type) {
      if (type == "Attri") {
        this.selectedAttri = option;
      } else if (type == "Class") {
        this.selectedClass = option;
      } else if (type == "Noble") {
        this.selectedNoble = option;
      }
    },
    updateSelectedServant(option) {
      this.selectedServant = option;
      this.$emit("selectedServant", option);
    },
  },
  computed: {
    filteredServantList() {
      let selector1 = this.selectedAttri === null ? "" : this.selectedAttri;
      let selector2 = this.selectedClass === null ? "" : this.selectedClass;
      let selector3 = this.selectedNoble === null ? "" : this.selectedNoble;
      return asyncData.filter((obj) => {
        const condition1 = !selector1 || obj["Attri"] === selector1;
        const condition2 = !selector2 || obj["Class"] === selector2;
        const condition3 = !selector3 || obj["Noble"] === selector3;
        return condition1 && condition2 && condition3;
      });
    },
  },
};
</script>

<template>
  <v-sheet :elevation="10" border="true" class="pa-2 ma-6">
    <span>天地人</span>
    <searchButton
      :items="selectAttriList"
      @selected-items="updateSelectedSearch($event, 'Attri')"
    />
    <span>クラス</span>
    <searchButton
      :items="selectClassList"
      @selected-items="updateSelectedSearch($event, 'Class')"
    />
    <span>宝具</span>
    <searchButton
      :items="selectNobleList"
      @selected-items="updateSelectedSearch($event, 'Noble')"
    />
    候補
    <servantSelect
      :list="filteredServantList"
      @selectedServant="updateSelectedServant($event)"
    />
  </v-sheet>
</template>
