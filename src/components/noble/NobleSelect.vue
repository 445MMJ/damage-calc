<script>
//宝具レベルを選択するコンポーネント
export default {
  props: ["labelText"],
  emits: ["selectednumber"],
  data() {
    return {
      numberList: [
        { title: "1", value: 1 },
        { title: "2", value: 2 },
        { title: "3", value: 3 },
        { title: "4", value: 4 },
        { title: "5", value: 5 },
      ],
      selectedNumber: 1,
    };
  },
  watch: {
    selectedNumber: function () {
      this.$emit("selectednumber", this.selectedNumber);
    },
  },
};
</script>

<template>
  <v-select
    v-model="selectedNumber"
    :items="numberList"
    :label="labelText"
    variant="outlined"
    density="compact"
    hide-details="auto"
  ></v-select>
</template>
