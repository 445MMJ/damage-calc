<script>
let asyncData = [];
const jsonUrl =
  "https://raw.githubusercontent.com/445MMJ/calc-data/main/classSkillList.json"; // JSONファイルのURL
async function asyncGetData() {
  const data = await fetch(jsonUrl);
  const dataJson = await data.json();
  return dataJson;
}
import { sumSkillValue } from "../script/sumSkillValue.js";
export default {
  props: ["name"],
  emits: ["skillValue", "skillValueSelf", "skillValueOther"],
  data() {
    return {
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
      //値が変わった時も自動処理する
      this.isChecked = true;
      if (newValue === "--" || newValue === undefined) {
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
      if (asyncData.length === undefined) {
        return [];
      } else {
        return asyncData.filter((obj) => obj.SkillName == name);
      }
    },
  },
  methods: {
    bufftype() {
      this.skillValue = { ...this.init };
      this.skillValueSelf = { ...this.init };
      this.skillValueOther = { ...this.init };
      this.skillValue = sumSkillValue(this.filteredList, "Value0", "defualt");
      this.skillValueSelf = sumSkillValue(this.filteredList, "Value0", "self");
      this.skillValueOther = sumSkillValue(
        this.filteredList,
        "Value0",
        "other"
      );
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

    <v-list
      ><v-list-item
        v-for="item in filteredList"
        :key="item.id"
        density="compact"
      >
        {{ item.Target }}/{{ item.MainText }}{{ item.PostText
        }}{{ item.Value0 }}
      </v-list-item></v-list
    >{{ filteredList }}
  </div>
</template>

<style scoped>
span {
  color: rgba(var(--v-theme-text), 1) !important;
  font-weight: 700;
}
</style>
