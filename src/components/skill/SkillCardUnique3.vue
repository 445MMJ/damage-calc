<script>
import { skillList } from "../../data/skillList.js";
import { sumSkillValue } from "../script/sumSkillValue.js";
export default {
  props: ["name"],
  emits: ["skillValue", "skillValueSelf", "skillValueOther"],
  data() {
    return {
      selectedNumber: 10, // 選択したリストボックスの値を保持
      levelNumber: [
        { title: "1", value: 1 },
        { title: "2", value: 2 },
        { title: "3", value: 3 },
        { title: "4", value: 4 },
        { title: "5", value: 5 },
        { title: "6", value: 6 },
        { title: "7", value: 7 },
        { title: "8", value: 8 },
        { title: "9", value: 9 },
        { title: "10", value: 10 },
      ], // リストボックスの選択肢
      init: {
        攻撃力: 0,
        Busterカード性能: 0,
        Quickカード性能: 0,
        Artsカード性能: 0,
        宝具威力: 0,
        NP獲得量: 0,
      },
      //スキル効果は味方単体/全体効果と自身を対象にとるもので分けて管理
      skillValue: {},
      skillValueSelf: {},
      skillValueOther: {},
      isChecked: true, // チェックボックスの状態を保持
      isShow: true, // 表示/非表示の状態を保持
      turnCount: 1,
      turnCountList: [
        { title: "1", value: 1 },
        { title: "2", value: 2 },
        { title: "3", value: 3 },
        { title: "4", value: 4 },
        { title: "5", value: 5 },
      ],
      detailList: [],
      base107: [0, 20, 22, 24, 26, 28, 30, 32, 34, 36, 40], //四夜の終末 EX
      base205: [
        [],
        [0, 20, 21, 22, 23, 24, 25, 26, 27, 28, 30],
        [0, 30, 32, 34, 36, 38, 40, 42, 44, 46, 50],
        [0, 40, 43, 46, 49, 52, 55, 58, 61, 64, 70],
      ], //是非もなし A-
    };
  },
  mounted() {
    //Mountタイミングで初期化処理を行う
    this.isChecked = true;
    this.unique();
  },
  watch: {
    name(newValue) {
      //値が変わった時も自動処理する
      this.isChecked = true;
      if (newValue === "プレースホルダー") {
        this.isShow = false;
      } else {
        this.isShow = true;
      }
      this.unique();
    },
  },
  computed: {
    filteredList() {
      return skillList.skillList.filter((obj) => obj.SkillName === this.name);
    },
    skillLevel() {
      return `Value` + (this.selectedNumber - 1);
    },
  },
  methods: {
    bufftype() {
      this.skillValue = { ...this.init };
      this.skillValueSelf = { ...this.init };
      this.skillValueOther = { ...this.init };
      this.skillValue = sumSkillValue(
        this.filteredList,
        this.skillLevel,
        "defualt"
      );
      this.skillValueSelf = sumSkillValue(
        this.filteredList,
        this.skillLevel,
        "self"
      );
      this.skillValueOther = sumSkillValue(
        this.filteredList,
        this.skillLevel,
        "other"
      );
      //チェック状態であれば、そのまま送信。非チェック状態であれば初期値に戻して送信
      if (this.isChecked) {
        this.$emit("skillValue", this.skillValue);
        this.$emit("skillValueSelf", this.skillValueSelf);
        this.$emit("skillValueOther", this.skillValueOther);
      } else {
        this.skillValue = { ...this.init };
        this.skillValueSelf = { ...this.init };
        this.skillValueOther = { ...this.init };
        this.$emit("skillValue", this.skillValue);
        this.$emit("skillValueSelf", this.skillValueSelf);
        this.$emit("skillValueOther", this.skillValueOther);
      }
    },
    unique() {
      this.skillValue = { ...this.init };
      this.skillValueSelf = { ...this.init };
      this.skillValueOther = { ...this.init };
      if (this.name === "是非もなし A-") {
        this.turnCountList = [
          { title: "1", value: 1 },
          { title: "2", value: 2 },
          { title: "3", value: 3 },
        ];
        if (this.turnCount > 3) {
          this.turnCount = 3;
        }
        this.skillValueSelf["攻撃力"] =
          this.base205[this.turnCount][this.selectedNumber];
        this.detailList = [
          `自身/毎ターン徐々に攻撃力アップ(3T)/${
            this.base205[1][this.selectedNumber]
          }%~${this.base205[3][this.selectedNumber]}%/現在 ${
            this.base205[this.turnCount][this.selectedNumber]
          }%`,
          "自身/フィールドセット〔炎上〕(3T)",
          "自身/やけど（毎ターンHP）減少(3T)-1000",
          "自身/やけど無効(3T)-",
        ];
      }
      if (this.name === "四夜の終末 EX") {
        this.turnCountList = [
          { title: "1", value: 1 },
          { title: "2", value: 2 },
          { title: "3", value: 3 },
          { title: "4", value: 4 },
          { title: "5", value: 5 },
        ];
        this.skillValueSelf["Quickカード性能"] =
          this.base107[this.selectedNumber] * this.turnCount;
        this.detailList = [
          `自身/毎ターン徐々にQuickカード性能アップ[Lv](5T)/${
            this.base107[this.selectedNumber] * 1
          }%~${this.base107[this.selectedNumber] * 5}%/現在 ${
            this.base107[this.selectedNumber] * this.turnCount
          }%`,
          "自身/ガッツ(6T/1回)HP50%",
          "自身/即死",
        ];
      }
      //チェック状態であれば、そのまま送信。非チェック状態であれば初期値に戻して送信
      if (this.isChecked) {
        this.$emit("skillValue", this.skillValue);
        this.$emit("skillValueSelf", this.skillValueSelf);
        this.$emit("skillValueOther", this.skillValueOther);
      } else {
        this.skillValue = { ...this.init };
        this.skillValueSelf = { ...this.init };
        this.skillValueOther = { ...this.init };
        this.$emit("skillValue", this.skillValue);
        this.$emit("skillValueSelf", this.skillValueSelf);
        this.$emit("skillValueOther", this.skillValueOther);
      }
    },
  },
};
</script>

<template>
  <div>
    <v-checkbox
      input-value="true"
      v-model="isChecked"
      @update:modelValue="unique"
      color="primary"
      hide-details="auto"
    >
      <template v-slot:label
        ><span> {{ name }} </span></template
      >
    </v-checkbox>

    <v-select
      v-model="selectedNumber"
      @update:modelValue="unique"
      :items="levelNumber"
      label="Lv"
      variant="outlined"
      density="compact"
    ></v-select>
    <v-select
      v-model="turnCount"
      @update:modelValue="unique"
      :items="turnCountList"
      label="経過ターン数"
      variant="outlined"
      density="compact"
    ></v-select>
    <ul>
      <li v-for="item in detailList" :key="item.id">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
span {
  color: rgba(var(--v-theme-text), 1) !important;
  font-weight: 700;
}
</style>
