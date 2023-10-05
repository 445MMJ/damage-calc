<!-- コンポーネントの定義 -->
<script>
import { servantList } from "../../data/servantList.js";
import searchButton from "./SearchButton.vue";
import supportList from "./SupportList.vue";

export default {
  emits: ["selectedServant"],

  components: {
    searchButton,
    supportList,
  },
  data() {
    return {
      //鯖リスト
      servantList: servantList.servantList,
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
      selectedServant: {
        Rare: 3,
        Cost: 7,
        Name: "荊軻",
        Class: "殺",
        Attri: "人",
        Grow: "凹型",
        min_H: 1492,
        min_A: 1338,
        max_H: 8293,
        max_A: 7207,
        Noble: "単体Ｑ",
        "保有スキル 1": "抑制/A",
        "保有スキル 2": "十歩殺一人/B+",
        "保有スキル 3": "傍若無人/A",
        "クラススキル 1": "気配遮断/B",
        "クラススキル 2": "--",
        "クラススキル 3": "--",
        "クラススキル 4": "--",
        "クラススキル 5": "--",
        "クラススキル 6": "--",
        "クラススキル 7": "--",
      },
    };
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
      //初期化
      this.selectedAttri = "";
      this.selectedClass = "";
      this.selectedNoble = "";
      this.selectedServant = {};
    },
  },
  computed: {
    filteredServantList() {
      return this.servantList.filter((obj) => {
        const condition1 =
          !this.selectedAttri || obj["Attri"] === this.selectedAttri;
        const condition2 =
          !this.selectedClass || obj["Class"] === this.selectedClass;
        const condition3 =
          !this.selectedNoble || obj["Noble"] === this.selectedNoble;
        return condition1 && condition2 && condition3;
      });
    },
  },
};
</script>

<!-- テンプレートの定義 -->
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
    <supportList
      :list="filteredServantList"
      @selectedServant="updateSelectedServant($event)"
    />
  </v-sheet>
</template>


