<script>
export default {
  props: ["name"],
  emits: ["skillValue", "skillValueSelf", "skillValueOther"],
  data() {
    return {
      selectedNumber: 10, // 選択したリストボックスの値を保持
      levelNumber: [
        { title: "1", value: 1 },
        { title: "2", value: 2 },
        { title: "3", value: 3 },
        { title: "4", value: 4 },
        { title: "5", value: 5 },
        { title: "6", value: 6 },
        { title: "7", value: 7 },
        { title: "8", value: 8 },
        { title: "9", value: 9 },
        { title: "10", value: 10 },
      ], // リストボックスの選択肢
      init: {
        攻撃力: 0,
        Busterカード性能: 0,
        Quickカード性能: 0,
        Artsカード性能: 0,
        宝具威力: 0,
        NP獲得量: 0,
        クリティカル威力: 0,
      },
      //スキル効果は味方単体/全体効果と自身を対象にとるもので分けて管理
      skillValue: {},
      skillValueSelf: {},
      skillValueOther: {},
      isChecked: true, // チェックボックスの状態を保持
      isShow: false, // 表示/非表示の状態を保持
    };
  },
  mounted() {
    //Mountタイミングで初期化処理を行う
    this.isChecked = true;
    this.unique();
  },
  watch: {
    name(newValue) {
      //値が変わった時も自動処理する
      this.isChecked = true;
      if (newValue === "プレースホルダー") {
        this.isShow = false;
      } else {
        this.isShow = true;
      }
      this.unique();
    },
  },
  computed: {
    filteredList() {
      let name = this.name; //nameに依存していることを明示しないとリアクティブしてくれない
      const filteredList = [
        {
          SkillName: "影郷の武練 B+",
          CT: "8",
          Target: "自身",
          Target2: "-",
          PreText: "-",
          MainText: "クリティカル威力",
          PostText: "アップ(3T/rate:LV変動)",
          Grow: "Lv",
          Value0: "30%",
          Value1: "31%",
          Value2: "32%",
          Value3: "33%",
          Value4: "34%",
          Value5: "35%",
          Value6: "36%",
          Value7: "37%",
          Value8: "38%",
          Value9: "40%",
          Detail: "自身のクリティカル威力を確率[Lv]でアップ[Lv](3T)",
          EntityID: "2212451",
        },
        {
          SkillName: "影郷の武練 B+",
          CT: "8",
          Target: "自身",
          Target2: "-",
          PreText: "-",
          MainText: "スター集中度",
          PostText: "アップ(3T/rate:LV変動)",
          Grow: "Lv",
          Value0: "300%(rate:60%)",
          Value1: "310%(rate:64%)",
          Value2: "320%(rate:68%)",
          Value3: "330%(rate:72%)",
          Value4: "340%(rate:76%)",
          Value5: "350%(rate:80%)",
          Value6: "360%(rate:84%)",
          Value7: "370%(rate:88%)",
          Value8: "380%(rate:92%)",
          Value9: "400%(rate:100%)",
          Detail: "＆スター集中度を確率[Lv]でアップ[Lv](3T)",
          EntityID: "2212451",
        },
        {
          SkillName: "影郷の武練 B+",
          CT: "8",
          Target: "自身",
          Target2: "-",
          PreText: "-",
          MainText: "回避",
          PostText: "(3T/2回)",
          Grow: "-",
          Value0: "-",
          Value1: "-",
          Value2: "-",
          Value3: "-",
          Value4: "-",
          Value5: "-",
          Value6: "-",
          Value7: "-",
          Value8: "-",
          Value9: "-",
          Detail: "＆回避状態を付与(2回・3T)",
          EntityID: "2212451",
        },
      ];
      return filteredList
    },
    skillLevel() {
      return `Value` + (this.selectedNumber - 1);
    },
  },
  methods: {
    unique() {
      this.skillValue = { ...this.init };
      this.skillValueSelf = { ...this.init };
      this.skillValueOther = { ...this.init };
      //ここから下に特殊なスキルの処理を書く
      const value = [0,30,31,32,33,34,35,36,37,38,40]
      this.skillValueSelf["クリティカル威力"] = value[this.selectedNumber];
      //チェック状態であれば、そのまま送信。非チェック状態であれば初期値に戻して送信
      if (this.isChecked) {
        this.$emit("skillValue", this.skillValue);
        this.$emit("skillValueSelf", this.skillValueSelf);
        this.$emit("skillValueOther", this.skillValueOther);
      } else {
        this.skillValue = { ...this.init };
        this.skillValueSelf = { ...this.init };
        this.skillValueOther = { ...this.init };
        this.$emit("skillValue", this.skillValue);
        this.$emit("skillValueSelf", this.skillValueSelf);
        this.$emit("skillValueOther", this.skillValueOther);
      }
    },
  },
};
</script>

<template>
  <div>
    <v-checkbox
      input-value="true"
      v-model="isChecked"
      @update:modelValue="unique"
      color="primary"
      hide-details="auto"
    >
      <template v-slot:label
        ><span> {{ name }} </span></template
      >
    </v-checkbox>

    <v-select
      v-model="selectedNumber"
      @update:modelValue="unique"
      :items="levelNumber"
      label="Lv"
      variant="outlined"
      density="compact"
    ></v-select>
    <v-list density="compact">
      <v-list-item v-for="item in filteredList" :key="item.id">
        {{ item.Target }}/{{ item.MainText }}{{ item.PostText
        }}{{ item[this.skillLevel] }}
      </v-list-item>
    </v-list>
  </div>
</template>

<style scoped>
span {
  color: rgba(var(--v-theme-text), 1) !important;
  font-weight: 700;
}
</style>
