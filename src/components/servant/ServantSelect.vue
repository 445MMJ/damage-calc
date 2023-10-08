<script>
export default {
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
  emits: ["selectedServant"],
  data() {
    return {
      selectedItemName: "",
      selectedItem: "",
      localList: [],
      visibleList: [],
      isIntersecting: false,
      loadText: "続きを見る",
    };
  },
  mounted() {
    // Call load() method on component mount for the initial load
    this.localList = this.list;
    this.visibleList = this.localList.slice(0, 10);
  },
  watch: {
    list(newval) {
      this.localList = newval;
      this.visibleList = this.localList.slice(0, 10);
    },
  },
  methods: {
    updataSelectedServant() {
      this.list.filter((item) => {
        if (item.Name === this.selectedItemName) {
          this.selectedItem = item;
        }
      });
      this.$emit("selectedServant", this.selectedItem);
    },
    load() {
      this.isIntersecting = !this.isIntersecting;
      if (!this.isIntersecting) return;
      console.log("load");
      let visibleListLength = this.visibleList.length;
      let localListLength = this.localList.length;
      //やろうとしたこと先呼んでくるじゃん
      if (visibleListLength + 10 > localListLength) {
        let arr = this.localList.slice(visibleListLength, localListLength + 1);
        this.visibleList = this.visibleList.concat(arr);
        this.loadText = "これ以上ありません";
      } else {
        let arr = this.localList.slice(
          visibleListLength,
          visibleListLength + 10
        );
        this.visibleList = this.visibleList.concat(arr);
        this.loadText = "続きを見る";
      }
    },
  },
};
</script>

<template>
  <v-select
    v-model="selectedItemName"
    @update:modelValue="updataSelectedServant"
    :items="visibleList"
    item-title="Name"
    label="サーヴァント"
    variant="outlined"
    density="compact"
  >
    <template v-slot:append-item>
      <v-list-item
        @click="load"
        v-intersect="{
          handler: load,
          options: {
            threshold: 0.5,
          },
        }"
      >
        <template v-slot:prepend>{{ loadText }}  </template>
      </v-list-item>
    </template></v-select
  >
</template>
