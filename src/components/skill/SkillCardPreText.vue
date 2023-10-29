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
      },
      //スキル効果は味方単体/全体効果と自身を対象にとるもので分けて管理
      skillValue: {},
      skillValueSelf: {},
      skillValueOther: {},
      isChecked: true, // チェックボックスの状態を保持
      isShow: false, // 表示/非表示の状態を保持
      isActive: false, // 特殊条件の有効/無効を保持
      isLoad: false, //ロードのチェック
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
    this.isActive = false;
    this.bufftype();
  },
  watch: {
    name(newValue) {
      //値が変わった時も自動処理する
      this.isChecked = true;
      this.isActive = false;
      this.bufftype();
    },
  },
  computed: {
    filteredList() {
      let name = this.name; //nameに依存していることを明示しないとリアクティブしてくれない
      if (this.isLoad === false) {
        setTimeout(() => {}, 500);
      }
      if (asyncData.size === undefined) {
        return [];
      } else {
        return asyncData.get(name);
      }
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

      //特殊条件の有効の時は全ての効果を取得
      //無効の時はPreTextが'-'のもののみ取得
      if (this.isActive) {
        this.skillValue = sumSkillValue(
          this.filteredList,
          this.name,
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
      } else {
        this.skillValue = sumSkillValue(
          this.filteredList,
          this.skillLevel,
          "defualt-PreText"
        );
        this.skillValueSelf = sumSkillValue(
          this.filteredList,
          this.skillLevel,
          "self-PreText"
        );
        this.skillValueOther = sumSkillValue(
          this.filteredList,
          this.skillLevel,
          "other-PreText"
        );
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
    <div v-for="item in filteredList" :key="item.id">
      <v-checkbox
        v-if="item.PreText !== '-'"
        input-value="true"
        v-model="isActive"
        @update:modelValue="bufftype"
        color="primary"
        hide-details="auto"
        ><template v-slot:label
          ><span>
            {{ item.Target }}/{{ item.PreText }}/{{ item.MainText
            }}{{ item.PostText }}{{ item[this.skillLevel] }}
          </span></template
        >
      </v-checkbox>
      <v-checkbox
        v-if="item.PreText == '-'"
        :model-value="true"
        disabled
        color="primary"
        hide-details="auto"
        ><template v-slot:label
          ><span>
            {{ item.Target }}/{{ item.PreText }}/{{ item.MainText
            }}{{ item.PostText }}{{ item[this.skillLevel] }}
          </span></template
        >
      </v-checkbox>
    </div>
  </div>
</template>

<style scoped>
span {
  color: rgba(var(--v-theme-text), 1) !important;
  font-weight: 700;
}
</style>
