<script>
//宝具レベルを選択するコンポーネント
export default {
  props: ["labelText"],
  emits: ["selectednumber"],
  data() {
    return {
      numberList: [
        { id: 1, label: "1", value: 1 },
        { id: 2, label: "2", value: 2 },
        { id: 3, label: "3", value: 3 },
        { id: 4, label: "4", value: 4 },
        { id: 5, label: "5", value: 5 },
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
  <div>
    {{ labelText }}
    <select v-model="selectedNumber">
      <option v-for="item in numberList" :key="item.id" :value="item.value">
        {{ item.label }}
      </option>
    </select>
  </div>
</template>
