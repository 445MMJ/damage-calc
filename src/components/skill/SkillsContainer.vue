<script>
import { skillList } from "../../data/skillList.js";
import { sumObjectValue } from "../../components/TotalSkillValue.js";
import skillCard from "./SkillCard.vue";
import skillCardPreText from "./SkillCardPreText.vue";
import skillCardTarget2 from "./SkillCardTarget2.vue";

export default {
  props: ["items"],
  emits: ["skillValue", "skillValueSelf", "skillValueOther"],
  components: {
    skillCard,
    skillCardPreText,
    skillCardTarget2,
  },
  data() {
    return {
      skillNames: [0, 1, 2, 3],
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
      //Pretextに条件が入っているスキルのEntityIDリスト
      const skillCardPreTextList = [
        583450, 242650, 299650, 299650, 945650, 945650, 119451, 382550, 242450,
        2033550, 2033550, 307551, 334552, 334553, 2088450, 2089650, 308550,
        308550, 913551, 638450, 739450, 739450, 894550, 894550, 35367, 806352,
        706350, 2086550, 2239550, 2239550, 2239550, 2239550, 734650, 734650,
        645251, 645251, 760550, 389549, 623550, 623551, 880550, 880550, 666550,
        2173650, 621675, 804650,
      ];
      //Target2に条件が入っているスキルEntityIDリスト
      const skillCarTarget2List = [
        2167650, 335550, 506450, 779551, 125350, 295550, 2048350, 2048350,
        293550, 74149, 74450, 366550, 475650, 230800, 808551, 777650, 777650,
        58450, 818552, 818552, 2097350, 2172550, 65900, 2021550, 2153650,
      ];
      let foundSkill = skillList.skillList.find(
        (obj) => obj.SkillName === skillName
      );
      if (foundSkill === undefined) {
        return "skillCard";
      }
      if (skillCardPreTextList.includes(Number(foundSkill.EntityID))) {
        return "skillCardPreText";
      }
      if (skillCarTarget2List.includes(Number(foundSkill.EntityID))) {
        return "skillCardTarget2";
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
      <v-col
        ><component
          :is="skillCardType[1]"
          :name="skillNames[1]"
          @skillValue="updateSkillValue($event, 0)"
          @skillValueSelf="updateSkillValueSelf($event, 0)"
          @skillValueOther="updateSkillValueOther($event, 0)"
      /></v-col>
      <v-col>
        <component
          :is="skillCardType[2]"
          :name="skillNames[2]"
          @skillValue="updateSkillValue($event, 1)"
          @skillValueSelf="updateSkillValueSelf($event, 1)"
          @skillValueOther="updateSkillValueOther($event, 1)"
      /></v-col>
      <v-col
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
