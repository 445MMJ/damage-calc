<script>
let asyncData = [];
const jsonUrl = 'https://gist.githubusercontent.com/445MMJ/b4887f5b82b28f98b36608a131962fdb/raw/5f7f69693c0990739154ebdd2bd086905af27816/skillList.json'; // JSONファイルのURL
async function asyncGetData() {
  const data = await fetch(jsonUrl);
  const dataJson = await data.json()
  const dataMap = new Map(Object.entries(dataJson));
  return dataMap
}
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
        クリティカル威力: 0,
      },
      //スキル効果は味方単体/全体効果と自身を対象にとるもので分けて管理
      skillValue: {},
      skillValueSelf: {},
      skillValueOther: {},
      isChecked: true, // チェックボックスの状態を保持
      isShow: false, // 表示/非表示の状態を保持
      isLoad: false, //ロードのチェック
      HP: 1,
      MaxHP: 10000,
    };
  },
  async created() {
    //非同期処理でデータを取得    
    asyncData = await asyncGetData();    
    this.isLoad = true;
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
      let name = this.name; //nameに依存していることを明示しないとリアクティブしてくれない
      if (this.isLoad === false) {
        setTimeout(() => {}, 500);
      }
      if (asyncData.size === undefined) {
        return []
      }else{
        return asyncData.get(name);
      }
    },
    skillLevel() {
      return `Value` + (this.selectedNumber - 1);
    },
  },
  methods: {
    unique() {
      if (this.HP < 1) {
        this.HP = 1;
      }
      this.HP = Math.round(this.HP);
      this.MaxHP = Math.round(this.MaxHP);
      this.skillValue = { ...this.init };
      this.skillValueSelf = { ...this.init };
      this.skillValueOther = { ...this.init };

      if (this.name === "四枝の浅瀬 A") {
        let result = 20 + (1 - this.HP / this.MaxHP) * 30;
        result = Number(result);
        result = Math.round(result);
        this.skillValueSelf["攻撃力"] = result;
      }
      if (this.name === "被虐体質 A+") {
        const base = [0, 10, 12, 14, 16, 18, 20, 22, 24, 26, 30];
        let result =
          base[this.selectedNumber] + (1 - this.HP / (this.MaxHP / 2)) * 20;
        result = Number(result);
        result = Math.round(result);
        this.skillValueSelf["攻撃力"] = result;
        //HPが50%以下の間チェック
        if (this.HP > this.MaxHP / 2) {
          this.skillValueSelf["攻撃力"] = 0;
        }
      }
      if (this.name === "局中法度 EX") {
        let result = 20 + (1 - this.HP / this.MaxHP) * 80;
        result = Number(result);
        result = Math.round(result);
        this.skillValueSelf["クリティカル威力"] = result;
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
    <v-list density="compact">
      <v-list-item v-for="item in filteredList" :key="item.id">
        {{ item.Target }}/{{ item.MainText }}{{ item.PostText
        }}{{ item[this.skillLevel] }}
      </v-list-item>
    </v-list>
    <v-text-field
      v-model="HP"
      @update:modelValue="unique"
      label="HP"
      density="compact"
      type="number"
      hide-details="auto"
    ></v-text-field>
    <v-text-field
      v-model="MaxHP"
      @update:modelValue="unique"
      label="最大HP"
      density="compact"
      type="number"
      hide-details="auto"
    ></v-text-field>
  </div>
</template>

<style scoped>
span {
  color: rgba(var(--v-theme-text), 1) !important;
  font-weight: 700;
}
</style>
