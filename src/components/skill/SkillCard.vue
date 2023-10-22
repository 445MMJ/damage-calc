<script>
async function asyncGetData() {
  const p = await import("../../data/skillList.js");
  const m = p.skillList.skillList;
  return m;
}
let asyncData = [];
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
      isShow: false, // 表示/非表示の状態を保持
    };
  },
  async created() {
    //非同期処理でデータを取得
    asyncData = await asyncGetData();
  },
  mounted() {
    //Mountタイミングで初期化処理を行う
    this.isChecked = true;
    this.bufftype();
  },
  watch: {
    name(newValue) {
      this.filteredList;
      //値が変わった時も自動処理する
      this.isChecked = true;
      this.isShow = true;
      if (newValue === "プレースホルダー") {
        this.isShow = false;
      } else {
        this.isShow = true;
      }
      this.bufftype();
    },
  },
  computed: {
    filteredList() {
      let name = this.name; //nameに依存していることを明示しないとリアクティブしてくれない
      return asyncData.filter((obj) => obj.SkillName === this.name);
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
  },
};
</script>

<template>
  <div v-show="isShow">
    <v-checkbox
      input-value="true"
      v-model="isChecked"
      @update:modelValue="bufftype"
      color="primary"
      hide-details="auto"
    >
      <template v-slot:label
        ><span> {{ name }} </span></template
      >
    </v-checkbox>

    <v-select
      v-model="selectedNumber"
      @update:modelValue="bufftype"
      :items="levelNumber"
      label="Lv"
      variant="outlined"
      density="compact"
    ></v-select>
    <v-list density="compact">
      <v-list-item v-for="item in filteredList" :key="item.id">
        {{ item.Target }}/{{ item.MainText }}{{ item.PostText
        }}{{ item[this.skillLevel] }}</v-list-item
      ></v-list
    >
  </div>
</template>

<style scoped>
span {
  color: rgba(var(--v-theme-text), 1) !important;
  font-weight: 700;
}
</style>
