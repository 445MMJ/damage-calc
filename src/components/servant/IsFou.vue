<script>
export default {
  props: {
    labelText: {
      type: String,
      required: true,
    },
  },
  emits: ["isFouChange"],
  data() {
    return {
      isChecked: false,
    };
  },
  mounted() {
    if (this.labelText === "銀フォウ") {
      this.isChecked = true;
    }
    this.$emit("isFouChange", this.isChecked);
  },
  methods: {
    handleCheckboxChange() {
      this.$emit("isFouChange", this.isChecked);
    },
  },
};
</script>

<template>
  <v-checkbox
    v-model="isChecked"
    @update:modelValue="handleCheckboxChange"
    color="primary"
    hide-details="auto"
  >
    <template v-slot:label
      ><span class="text-no-wrap"> {{ labelText }} </span></template
    >
  </v-checkbox>
</template>

<style scoped>
span {
  color: rgba(var(--v-theme-text),1)!important;
  font-weight: 600;
}
</style>