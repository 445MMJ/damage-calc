<template>
  <v-container>
    <v-row align="center">
      <v-col cols="6" sm="3" >
        <v-select
          label="種別"
          v-model="selectedStatus"
          :items="statusList"
          variant="outlined"
          density="compact"
          hide-details="true"

        ></v-select
      ></v-col>
      <v-col cols="6" sm="3">
        <v-select
          label="礼装レベル"
          v-model="selectedLevel"
          :items="levelList"
          variant="outlined"
          density="compact"
          hide-details="true"
        ></v-select
      ></v-col>
      <v-col cols="6" sm="3">
        <v-text-field
          v-model="ATK"
          update:modelValue="handleATKInput"
          label="礼装ATK"
          type="number"
          hide-details="true"
        ></v-text-field
      ></v-col>
      <v-col cols="6" sm="3">
        <v-text-field
          v-model="textLevelInput"
          update:modelValue="handleLevelInput"
          label="礼装レベル"
          type="number"
          hide-details="true"
        ></v-text-field
      ></v-col>
    </v-row>
  </v-container>
</template>

<script>
//レベルについてはリストの内容→テキストボックスの内容とコピーしていき
//ATKについてはレベルのテキストボックス*ステータスの成長係数(リストから選んでる)をATKのテキストボックスに庫ピー
//最終的にATKのテキストボックスの内容を親に渡す

export default {
  emits: ["CEAtk"],
  data() {
    return {
      statusList: [
        { id: 1, title: "600-2400", value: 30 },
        { id: 2, title: "500-2000", value: 25 },
        { id: 3, title: "400-1500", value: 20 },
        { id: 4, title: "250-1000", value: 12.5 },
      ],
      levelList: [
        { id: 3, title: "20", value: 20 },
        { id: 1, title: "40", value: 40 },
        { id: 2, title: "60", value: 60 },
        { id: 4, title: "80", value: 80 },
      ],
      selectedStatus: 25, //ステータスの成長係数
      selectedLevel: 20, //リストから選ばれる方のレベル
      textLevelInput: 20, //直接入力される方のレベル
      ATK: 500, //計算されたor直接入力されたATK
    };
  },
  methods: {
    handleSelectedLevelChange() {
      this.textLevelInput = this.selectedLevel;
    },
    setATK(value) {
      this.ATK = value;
    },
  },
  watch: {
    selectedLevel: function (newVal) {
      this.textLevelInput = newVal;
    },
    ATK: function (newVal) {
      //直接入力するとATKに入れられる
      //newValがnullの場合のケアとNumberに変換して送る
      let ceAtkValue = newVal !== null ? newVal : 0;
      ceAtkValue = Number(ceAtkValue);
      this.$emit("CEAtk", ceAtkValue);
    },
    calcATK: function (newVal) {
      //算出した場合methodでATKを変更して、上の処理をトリガーして送る
      this.setATK(newVal);
    },
  },
  computed: {
    calcATK() {
      return this.textLevelInput * this.selectedStatus;
    },
  },
};
</script>
