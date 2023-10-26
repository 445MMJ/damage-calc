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
    this.parametersBuff = {
      攻撃力: 0,
      Busterカード性能: 0,
      Quickカード性能: 0,
      Artsカード性能: 0,
      クリティカル威力: 0,
      宝具威力: 0,
      特攻威力: 0,
      "〔状態〕威力": 0,
    };
    this.parametersDebuff = {
      防御力: 0,
      Busterカード耐性: 0,
      Quickカード耐性: 0,
      Artsカード耐性: 0,
      敵特防: 0,
      特殊耐性: 0,
    };
  },
  methods: {
    handleInput(key, value) {
      this.parametersAll[key] = parseFloat(value);
      console.log(this.parametersAll);
      //値がNaNでないというチェックをしてから送信
      this.$emit("updateUserInput", this.parametersAll);
    },
  },
};
</script>

<template>
  <div>
    バフ情報
    <div v-for="(value, key) in parametersBuff" :key="key" class="input-group">
      <v-text-field
        v-model="parametersBuff[key]"
        :label="key"
        @input="handleInput(key, value)"
        clearable
        type="number"
        hide-details="auto"
        hint="単位%で記入"
      ></v-text-field>
    </div>
    デバフ情報
    <div
      v-for="(value, key) in parametersDebuff"
      :key="key"
      class="input-group"
    >
      <v-text-field
        v-model="parametersDebuff[key]"
        :label="key"
        @input="handleInput(key, value)"
        clearable
        type="number"
        hide-details="auto"
        hint="単位%。デバフが正、バフが負"
      ></v-text-field>
    </div>
  </div>
</template>
