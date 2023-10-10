<script>
import { classSkillList } from "../../data/classSkillList.js";
import { filterSkillList } from "../FilterSkillValue";
export default {
  props: ["name"],
  emits: ["skillValue", "skillValueSelf", "skillValueOther"],
  data() {
    return {
      classSkillList: classSkillList.classSkillList,
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
  mounted() {
    //Mountタイミングで初期化処理を行う
    this.isChecked = true;
    this.bufftype();
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
      this.bufftype();
    },
  },
  computed: {
    filteredList() {
      return this.classSkillList.filter((obj) => obj.SkillName === this.name);
    },
  },
  methods: {
    bufftype() {
      let filteredList = [];
      //単体/全体効果の場合
      //名前が一致なものを抽出
      this.skillValue = { ...this.init };
      filteredList = this.classSkillList.filter(
        (obj) => obj.SkillName === this.name
      );
      //その中から効果範囲(Target)が味方単体か味方全体のものを抽出
      filteredList = filteredList.filter(
        (obj) => obj.Target === "味方単体" || obj.Target === "味方全体"
      );
      filterSkillList(filteredList, "Value0", this.skillValue);
      //自己効果の場合
      //名前が一致なものを抽出
      this.skillValueSelf = { ...this.init };
      filteredList = this.classSkillList.filter(
        (obj) => obj.SkillName === this.name
      );
      //その中から効果範囲(Target)が自身を対象にするものを抽出
      filteredList = filteredList.filter((obj) => obj.Target === "自身");
      filterSkillList(filteredList, "Value0", this.skillValueSelf);

      //自身を除く味方全体効果の場合
      //名前が一致なものを抽出
      this.skillValueOther = { ...this.init };
      filteredList = this.classSkillList.filter(
        (obj) => obj.SkillName === this.name
      );
      //その中から効果範囲(Target)が自身を対象にするものを抽出
      filteredList = filteredList.filter(
        (obj) => obj.Target === "自身を除く味方全体"
      );
      filterSkillList(filteredList, "Value0", this.skillValueOther);
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
  <div v-if="isShow">
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

    <ul>
      <li v-for="item in filteredList" :key="item.id">
        {{ item.Target }}/{{ item.MainText }}{{ item.PostText
        }}{{ item.Value0 }}
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
