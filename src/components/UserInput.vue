<script>
export default {
  data() {
    return {
      parameters: {
        攻撃力: 0,
        Busterカード性能: 0,
        Quickカード性能: 0,
        Artsカード性能: 0,
        クリティカル威力: 0,
        宝具威力: 0,
        特攻威力: 0,
        "〔状態〕威力": 0,
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
    <div v-for="(value, key) in parameters" :key="key" class="input-group">
      <v-text-field
        v-model="parameters[key]"
        :label="key"
        @input="handleInput(key)"
        clearable
        type="number"
        hide-details="true"
      ></v-text-field>
    </div>
  </div>
</template>