<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  emits: ["selected-items"],
  data() {
    return {
      selectedItems: [],
    };
  },
  watch: {
    selectedItems() {
      this.$emit("selected-items", this.selectedItems);
    },
  },
};
</script>

<template>
  <div>
    <v-chip-group selected-class="text-primary" column v-model="selectedItems">
      <v-chip v-for="item in items" :key="item" :value="item" filter>
        {{ item }}
      </v-chip>
    </v-chip-group>
  </div>
</template>
