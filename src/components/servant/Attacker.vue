<script>
import isFou from "./IsFou.vue";
import craftEssenceSelect from "./CraftEssenceSelect.vue";
import AttackerATK from "./AttackerATK.vue";
export default {
  components: {
    AttackerATK,
    isFou,
    craftEssenceSelect,
  },
  props: {
    attacker: {
      type: Object,
      required: true,
    },
  },
  emits: ["ATK"],
  data() {
    return {
      pureATK: 0,
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
      this.$emit("ATK", this.ATK);
    },
    handleCEAtkChange(item) {
      this.CEAtk = item;
      this.$emit("ATK", this.ATK);
    },
    handleATKChange(item) {
      this.pureATK = item;
      this.$emit("ATK", this.ATK);
    },
  },
  computed: {
    ATK() {
      return this.pureATK + this.fouValue + this.CEAtk;
    },
  },
};
</script>

<template>
  <v-container >
    <v-row justify="start" align="center">
        <AttackerATK :attacker="attacker" @isATKChange="handleATKChange" />
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
