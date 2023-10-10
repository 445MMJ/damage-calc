<script>
import { skillList } from "../../data/skillList.js";
import { classSkillList } from "../../data/classSkillList.js";
import { sumObjectValue } from "../../components/TotalSkillValue.js";
import classSkillCard from "./ClassSkillCard.vue";

export default {
  props: ["items"],
  emits: ["skillValue", "skillValueSelf", "skillValueOther"],
  components: {
    classSkillCard,
  },
  data() {
    return {
      skillList: skillList.skillList,
      classSkillList: classSkillList.classSkillList,
      skillNames: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      skillValue: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      totalSkillValue: {},
      skillValueSelf: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      totalSkillValueSelf: {},
      skillValueOther: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      totalSkillValueOther: {},
      skillCardType: [
        "classSkillCard",
        "classSkillCard",
        "classSkillCard",
        "classSkillCard",
        "classSkillCard",
        "classSkillCard",
        "classSkillCard",
        "classSkillCard",
        "classSkillCard",
        "classSkillCard",
      ],
    };
  },
  watch: {
    items(newValue) {
      //新しい値が来たら保存して
      this.skillNames[1] = newValue["クラススキル 1"];
      this.skillNames[2] = newValue["クラススキル 2"];
      this.skillNames[3] = newValue["クラススキル 3"];
      this.skillNames[4] = newValue["クラススキル 4"];
      this.skillNames[5] = newValue["クラススキル 5"];
      this.skillNames[6] = newValue["クラススキル 6"];
      this.skillNames[7] = newValue["クラススキル 7"];
      this.skillNames[8] = newValue["クラススキル 8"];
      this.skillNames[9] = newValue["クラススキル 9"];
      this.skillNames[10] = newValue["クラススキル 10"];
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
  },
};
</script>

<!-- テンプレートの定義 -->
<template>
  <v-container>
    <v-row>
      <v-col v-for="index in 10" :key="index">
        <component
          is="classSkillCard"
          :name="skillNames[index]"
          @skillValue="updateSkillValue($event, index)"
          @skillValueSelf="updateSkillValueSelf($event, index)"
          @skillValueOther="updateSkillValueOther($event, index)"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<style>
.flex {
  display: flex;
}
</style>
