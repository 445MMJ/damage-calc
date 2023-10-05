<script>
import isFou from "./IsFou.vue";
import craftEssenceSelect from "./CraftEssenceSelect.vue";
export default {
  components: {
    isFou,
    craftEssenceSelect,
  },
  props: {
    attcker: {
      type: Object,
      required: true,
    },
  },
  emits: ["fouValue", "CEAtk"],
  data() {
    return {
      fouValue: 1000,
      CEAtk: 500,
    };
  },
  methods: {
    handleFouChange(item) {
      if (item) {
        this.fouValue += 1000;
      } else {
        this.fouValue -= 1000;
      }
      this.$emit("fouValue", this.fouValue);
    },

    handleCEAtkChange(item) {
      this.CEAtk = item;
      this.$emit("CEAtk", this.CEAtk);
    },
  },
};
</script>

<template>
  <v-container>
    <v-row justify="start" align="center">
      <v-col cols="3" sm="2" class="ma-1 text-no-wrap"
        >ATK {{ attcker["max_A"] }}
      </v-col>
      <v-col cols="2" sm="1" class="ma-1 text-no-wrap">+ {{ fouValue }}</v-col>
      <v-col cols="2" sm="2" class="ma-1 text-no-wrap"
        ><isFou labelText="銀フォウ" @isFouChange="handleFouChange"
      /></v-col>
      <v-col cols="2" sm="2" class="ma-1 text-no-wrap"
        ><isFou labelText="金フォウ" @isFouChange="handleFouChange"
      /></v-col>
      <v-col></v-col>
    </v-row>  
    <v-row><craftEssenceSelect @CEAtk="handleCEAtkChange" /></v-row>
  </v-container>
</template>
