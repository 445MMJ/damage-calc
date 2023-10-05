<script>
export default {
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selectedItemName: "",
      selectedItem: "",
    };
  },
  emits: ["selectedServant"],
  methods: {
    updataSelectedServant() {
      this.list.filter((item) => {
        if (item.Name === this.selectedItemName) {
          this.selectedItem = item;
        }
      });
      this.$emit("selectedServant", this.selectedItem);
    },
  },
};
</script>

<template>
  <v-select
    v-model="selectedItemName"
    @update:modelValue="updataSelectedServant"
    :items="list"
    item-title="Name"
    label="サーヴァント"
    variant="outlined"
    density="compact"
  ></v-select>
</template>
