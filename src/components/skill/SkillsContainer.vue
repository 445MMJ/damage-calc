<script>
async function asyncGetData() {
  const p = await import("../../data/skillList.js");
  const m = p.skillList.skillList;
  return m;
}
let asyncData = [];
import { sumObjectValue } from "../../components/TotalSkillValue.js";
import skillCard from "./SkillCard.vue";
import skillCardPreText from "./SkillCardPreText.vue";
import skillCardTarget2 from "./SkillCardTarget2.vue";
import skillCardUnique1 from "./SkillCardUnique1.vue";
import skillCardUnique2 from "./SkillCardUnique2.vue";
import skillCardUnique3 from "./SkillCardUnique3.vue";

export default {
  props: ["items"],
  emits: ["skillValue", "skillValueSelf", "skillValueOther"],
  components: {
    skillCard,
    skillCardPreText,
    skillCardTarget2,
    skillCardUnique1,
    skillCardUnique2,
    skillCardUnique3,
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
  async created() {
    //非同期処理でデータを取得
    asyncData = await asyncGetData();
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
        583450, 242650, 242450, 505551, 319551, 781551, 872550, 35367, 806352,
        935451, 389549, 285451, 621675, 620452, 2093650, 382550, 706350, 378650,
        2239550, 299650, 945650, 381451, 334552, 334553, 409551, 2072150,
        453451, 592550, 307551, 666550, 2055350, 2098550, 638450, 706350,
        623550, 623551, 2121350, 712550, 2022450, 606551, 79551, 853451, 804650,
        2033550.208655, 450450.45055, 2033550, 605550, 701551, 119451, 881550,
        739450, 894550, 15551, 2088450, 913551, 760466, 734650, 760550, 2173650,
      ];
      //Target2に条件が入っているスキルEntityIDリスト
      const skillCardTarget2List = [
        2167650, 335550, 506450, 779551, 125350, 295550, 2048350, 2048350,
        293550, 74149, 74450, 366550, 475650, 230800, 808551, 777650, 777650,
        58450, 818552, 818552, 2097350, 2172550, 65900, 2021550, 2153650,
      ];
      //四枝の浅瀬 A,被虐体質 A+,局中法度 EX
      const skillCardUnique1 = [759550, 355551, 344650];
      //大河の巨獣 B
      const skillCardUnique2 = [2082450];
      //(死滅願望 A強化前だから使わないかも),四夜の終末 EX,是非もなし A-
      const skillCardUnique3 = [199550, 458650, 619549];
      let foundSkill = asyncData.find(
        (obj) => obj.SkillName === skillName
      );
      if (foundSkill === undefined) {
        return "skillCard";
      }
      if (skillCardPreTextList.includes(Number(foundSkill.EntityID))) {
        return "skillCardPreText";
      }
      if (skillCardTarget2List.includes(Number(foundSkill.EntityID))) {
        return "skillCardTarget2";
      }
      if (skillCardUnique1.includes(Number(foundSkill.EntityID))) {
        return "skillCardUnique1";
      }
      if (skillCardUnique2.includes(Number(foundSkill.EntityID))) {
        return "skillCardUnique2";
      }
      if (skillCardUnique3.includes(Number(foundSkill.EntityID))) {
        return "skillCardUnique3";
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
