<script>
export default {
  data() {
    return {
      parametersBuff: {
        攻撃力: 0,
        Busterカード性能: 0,
        Quickカード性能: 0,
        Artsカード性能: 0,
        クリティカル威力: 0,
        宝具威力: 0,
        特攻威力: 0,
        "〔状態〕威力": 0,
      },
      parametersDebuff: {
        敵防御力:0,
        Busterカード性能: 0,
        Quickカード性能: 0,
        Artsカード性能: 0,
        敵特防: 0,
        特殊耐性: 0,
      },
    };
  },
  methods: {
    handleInput(item) {
      for (const prop in this.parameters) {
        if (this.parameters.hasOwnProperty(prop)) {
          this.parameters[prop] = this.parameters[prop] === null ? 0 : Number(this.parameters[prop]);
        }
      }
      this.$emit("updateUserInput", this.parameters);
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
        @input="handleInput(key)"
        clearable
        type="number"
        hide-details="auto"
        hint="単位%で記入"
      ></v-text-field>
    </div>
    デバフ情報
    <div v-for="(value, key) in parametersDebuff" :key="key" class="input-group">
      <v-text-field
        v-model="parametersDebuff[key]"
        :label="key"
        @input="handleInput(key)"
        clearable
        type="number"
        hide-details="auto"
        hint="単位%。絶対値で記入"
      ></v-text-field>
    </div>
  </div>
</template>