<script>
import { skillList } from "../../data/skillList.js";
import { filterSkillList } from "../FilterSkillValue";
export default {
  props: ["name"],
  emits: ["skillValue", "skillValueSelf", "skillValueOther"],
  data() {
    return {
      skillList: skillList.skillList,
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
      isActive: false, // PreText条件の有効/無効を保持
    };
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
      return this.skillList.filter((obj) => obj.SkillName === this.name);
    },
    skillLevel() {
      return `Value` + (this.selectedNumber - 1);
    },
  },
  methods: {
    bufftype() {
      let filteredList = [];
      //単体/全体効果の場合
      //名前が一致なものを抽出
      this.skillValue = { ...this.init };
      filteredList = this.skillList.filter(
        (obj) => obj.SkillName === this.name
      );
      //その中から効果範囲(Target)が味方単体か味方全体のものを抽出
      filteredList = filteredList.filter(
        (obj) => obj.Target === "味方単体" || obj.Target === "味方全体"
      );
      filteredList = filteredList.filter((obj) => obj.PreText === "-");
      filterSkillList(filteredList, this.skillLevel, this.skillValue);

      //自己効果の場合
      //名前が一致なものを抽出
      this.skillValueSelf = { ...this.init };
      filteredList = this.skillList.filter(
        (obj) => obj.SkillName === this.name
      );
      //その中から効果範囲(Target)が自身を対象にするものを抽出
      filteredList = filteredList.filter((obj) => obj.Target === "自身");
      filteredList = filteredList.filter((obj) => obj.PreText === "-");
      filterSkillList(filteredList, this.skillLevel, this.skillValueSelf);

      //自身を除く味方全体効果の場合
      //名前が一致なものを抽出
      this.skillValueOther = { ...this.init };
      filteredList = this.skillList.filter(
        (obj) => obj.SkillName === this.name
      );
      //その中から効果範囲(Target)が自身を対象にするものを抽出
      filteredList = filteredList.filter(
        (obj) => obj.Target === "自身を除く味方全体"
      );
      filteredList = filteredList.filter((obj) => obj.PreText === "-");
      filterSkillList(filteredList, this.skillLevel, this.skillValueOther);

      if (this.isActive) {
        //単体/全体効果の場合
        this.skillValue = { ...this.init };
        filteredList = this.skillList.filter(
          (obj) => obj.SkillName === this.name
        );
        filteredList = filteredList.filter(
          (obj) => obj.Target === "味方単体" || obj.Target === "味方全体"
        );
        filterSkillList(filteredList, this.skillLevel, this.skillValue);

        //自己効果の場合
        this.skillValueSelf = { ...this.init };
        filteredList = this.skillList.filter(
          (obj) => obj.SkillName === this.name
        );
        filteredList = filteredList.filter((obj) => obj.Target === "自身");
        filterSkillList(filteredList, this.skillLevel, this.skillValueSelf);

        //自身を除く味方全体効果の場合
        this.skillValueOther = { ...this.init };
        filteredList = this.skillList.filter(
          (obj) => obj.SkillName === this.name
        );
        filteredList = filteredList.filter(
          (obj) => obj.Target === "自身を除く味方全体"
        );
        filterSkillList(filteredList, this.skillLevel, this.skillValueOther);
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
  color: rgba(var(--v-theme-text),1)!important;
  font-weight: 700;
}
</style>
