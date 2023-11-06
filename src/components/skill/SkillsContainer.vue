<script>
import { defineAsyncComponent } from "vue";
import { sumObjectValue } from "../../components/TotalSkillValue.js";
const skillCard = defineAsyncComponent(() => import("./SkillCard.vue"));
const skillCardUnique1 = defineAsyncComponent(() =>
  import("./SkillCardUnique1.vue")
);
const skillCardUnique2 = defineAsyncComponent(() =>
  import("./SkillCardUnique2.vue")
);
const skillCardUnique3 = defineAsyncComponent(() =>
  import("./SkillCardUnique3.vue")
);
const skillCardUnique4 = defineAsyncComponent(() =>
  import("./SkillCardUnique4.vue")
);
const skillCardUnique5 = defineAsyncComponent(() =>
  import("./SkillCardUnique5.vue")
);
const skillCardUnique6 = defineAsyncComponent(() =>
  import("./SkillCardUnique6.vue")
);

export default {
  props: ["items"],
  emits: ["skillValue", "skillValueSelf", "skillValueOther"],
  components: {
    skillCard,
    skillCardUnique1,
    skillCardUnique2,
    skillCardUnique3,
    skillCardUnique4,
    skillCardUnique5,
    skillCardUnique6,
  },
  data() {
    return {
      skillNames: [
        0,
        "プレースホルダー",
        "プレースホルダー",
        "プレースホルダー",
      ],
      skillValue: [0, 1, 2, 3],
      totalSkillValue: {},
      skillValueSelf: [0, 1, 2, 3],
      totalSkillValueSelf: {},
      skillValueOther: [0, 1, 2, 3],
      totalSkillValueOther: {},
      skillCardType: ["skillCard", "skillCard", "skillCard", "skillCard"],
    };
  },
  watch: {
    items(newValue) {
      //新しい値が来たら保存して
      this.skillNames[1] = newValue["保有スキル 1"];
      this.skillNames[2] = newValue["保有スキル 2"];
      this.skillNames[3] = newValue["保有スキル 3"];
      this.skillCardType[1] = this.isSkillCardType(newValue["保有スキル 1"]);
      this.skillCardType[2] = this.isSkillCardType(newValue["保有スキル 2"]);
      this.skillCardType[3] = this.isSkillCardType(newValue["保有スキル 3"]);
    },
  },
  methods: {
    updateSkillValue(option, index) {
      this.skillValue[index] = option;
      this.totalSkillValue = sumObjectValue(this.skillValue);
      this.$emit("skillValue", this.totalSkillValue);
    },
    updateSkillValueSelf(option, index) {
      this.skillValueSelf[index] = option;
      this.totalSkillValueSelf = sumObjectValue(this.skillValueSelf);
      this.$emit("skillValueSelf", this.totalSkillValueSelf);
    },
    updateSkillValueOther(option, index) {
      this.skillValueOther[index] = option;
      this.totalSkillValueOther = sumObjectValue(this.skillValueOther);
      this.$emit("skillValueOther", this.totalSkillValueOther);
    },
    isSkillCardType(skillName) {
      const skillCardUnique1 = ["四枝の浅瀬 A", "被虐体質 A+", "局中法度 EX"];
      const skillCardUnique2 = ["大河の巨獣 B"];
      const skillCardUnique3 = ["死滅願望 A", "四夜の終末 EX", "是非もなし A-"];
      const skillCardUnique4 = ["影郷の武練 B+"];
      const skillCardUnique5 = ["蛤御殿 A"];
      const skillCardUnique6 = [];
      const skillCardUnique7 = [];
      if (skillCardUnique1.includes(skillName)) {
        return "skillCardUnique1";
      }
      if (skillCardUnique2.includes(skillName)) {
        return "skillCardUnique2";
      }
      if (skillCardUnique3.includes(skillName)) {
        return "skillCardUnique3";
      }
      if (skillCardUnique4.includes(skillName)) {
        return "skillCardUnique4";
      }
      if (skillCardUnique5.includes(skillName)) {
        return "skillCardUnique5";
      }
      return "skillCard";
    },
  },
};
</script>

<!-- テンプレートの定義 -->
<template>
  <v-container class="">
    <v-row>
      <v-col cols="12" sm="4"
        ><component
          :is="skillCardType[1]"
          :name="skillNames[1]"
          @skillValue="updateSkillValue($event, 0)"
          @skillValueSelf="updateSkillValueSelf($event, 0)"
          @skillValueOther="updateSkillValueOther($event, 0)"
      /></v-col>
      <v-col cols="12" sm="4">
        <component
          :is="skillCardType[2]"
          :name="skillNames[2]"
          @skillValue="updateSkillValue($event, 1)"
          @skillValueSelf="updateSkillValueSelf($event, 1)"
          @skillValueOther="updateSkillValueOther($event, 1)"
      /></v-col>
      <v-col cols="12" sm="4"
        ><component
          :is="skillCardType[3]"
          :name="skillNames[3]"
          @skillValue="updateSkillValue($event, 2)"
          @skillValueSelf="updateSkillValueSelf($event, 2)"
          @skillValueOther="updateSkillValueOther($event, 2)"
      /></v-col>
    </v-row>
  </v-container>
</template>

<style>
.flex {
  display: flex;
}
</style>
