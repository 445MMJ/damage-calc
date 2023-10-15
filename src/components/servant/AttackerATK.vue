<script>
//レベルはprop OR リストの内容
//レベルとpropsでcalcStat.jsでATKを返してもらい、ATKのテキストボックスにコピー
//最終的にATKのテキストボックスの更新で値をemit
import { additionalServantATKMap } from "../../data/additionalServantATKMap.js";
export default {
  props: {
    attacker: {
      type: Object,
      required: true,
    },
  },
  emits: ["isATKChange"],
  data() {
    return {
      additionalAttacker: {},
      rareList: [65, 60, 65, 70, 80, 90],
      levelList: [
        { id: 0, title: "65", value: 65 },
        { id: 1, title: "60", value: 60 },
        { id: 2, title: "65", value: 65 },
        { id: 3, title: "70", value: 70 },
        { id: 4, title: "80", value: 80 },
        { id: 5, title: "90", value: 90 },
        { id: 6, title: "100", value: 100 },
        { id: 7, title: "110", value: 110 },
        { id: 8, title: "120", value: 120 },
      ],
      selectedLevel: 0, //リストから選ばれる方のレベル
      ATK: 0, //計算されたor直接入力されたATK
    };
  },
  mounted() {
    this.Update(this.attacker);
  },
  watch: {
    attacker: function (newVal) {
      this.Update(newVal);
    },
    selectedLevel: function (newVal) {
      let k = newVal;
      if (isNaN(k) || !isFinite(k)) {
        // kがNaN（Not a Number）または無限大の場合、あるいは数字でない場合
        k = 1;
      } else {
        k = Math.max(Math.floor(k), 1); // kを整数に丸めて1未満の場合は1にする
      }
      this.ATK = this.additionalAttacker["AtkGrowth"][k - 1];
    },
    ATK: function (newVal) {
      //直接入力するとATKに入れられる
      //newValがnullの場合のケアとNumberに変換して送る
      let AtkValue = newVal !== null ? newVal : 0;
      AtkValue = Number(AtkValue);
      AtkValue = Math.floor(AtkValue);
      this.$emit("isATKChange", AtkValue);
    },
  },
  methods: {
    Update(newVal) {
      let index = Number(newVal["Rare"]);
      this.selectedLevel = this.rareList[index];
      let foundObject = additionalServantATKMap.get(Number(newVal["No."]))
      this.additionalAttacker = { ...foundObject };
      this.ATK = this.additionalAttacker["AtkGrowth"][this.selectedLevel - 1];
    },
  },
};
</script>

<template>
  <v-col cols="6" sm="3">
    <v-select
      label="鯖レベル"
      v-model="selectedLevel"
      :items="levelList"
      variant="outlined"
      density="compact"
      hide-details="true"
    ></v-select
  ></v-col>
  <v-col cols="6" sm="3" class="text-no-wrap">
    <v-text-field
      v-model="ATK"
      label="鯖ATK"
      type="number"
      hide-details="true"
    ></v-text-field
  ></v-col>
</template>
