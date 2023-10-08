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
      List: [],
    };
  },
  mounted() {
    //この処理をすると軽くなる
    //v-forでprppsのitemsを使うと重くなるが、一旦Listに入れると軽くなる
    //なんで？どっちもリアクティブなのに
    this.List = this.items;
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
      <v-chip v-for="item in this.List" :key="item" :value="item" filter>
        {{ item }}
      </v-chip>
    </v-chip-group>
  </div>
</template>
