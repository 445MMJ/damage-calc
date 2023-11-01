<script>
export default {
  data() {
    return {
      parametersAll: {
        攻撃力: 0,
        Busterカード性能: 0,
        Quickカード性能: 0,
        Artsカード性能: 0,
        クリティカル威力: 0,
        宝具威力: 0,
        特攻威力: 0,
        "〔状態〕威力": 0,
        防御力: 0,
        Busterカード耐性: 0,
        Quickカード耐性: 0,
        Artsカード耐性: 0,
        敵特防: 0,
        特殊耐性: 0,
      },
    };
  },
  created() {
    this.parametersBuffList = [
      "攻撃力",
      "Busterカード性能",
      "Quickカード性能",
      "Artsカード性能",
      "クリティカル威力",
      "宝具威力",
      "特攻威力",
      "〔状態〕威力",
    ];
    this.parametersDebuffList = [
      "防御力",
      "Busterカード耐性",
      "Quickカード耐性",
      "Artsカード耐性",
      "敵特防",
      "特殊耐性",
    ];
  },
  methods: {
    handleInput() {
      for (const key of Object.keys(this.parametersAll)) {
        //nullや空白やundifinedの場合は0にする
        if (
          this.parametersAll[key] === null ||
          this.parametersAll[key] === ""
        ) {
          this.parametersAll[key] = 0;
        }
        this.parametersAll[key] = parseFloat(this.parametersAll[key]);
      }
      this.$emit("updateUserInput", this.parametersAll);
    },
  },
};
</script>

<template>
  <div>
    バフ情報
    <div v-for="key in parametersBuffList" :key="key" class="input-group">
      <v-text-field
        v-model="this.parametersAll[key]"
        :label="key"
        @input="handleInput"
        clearable
        type="number"
        hide-details="auto"
        hint="単位%で記入"
      ></v-text-field>
    </div>
    デバフ情報
  </div>
</template>
