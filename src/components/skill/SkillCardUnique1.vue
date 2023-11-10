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
      isLoad: false, //ロードのチェック
      HP: 1,
      MaxHP: 10000,
      filteredList: [],
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
    skillLevel() {
      return `Value` + (this.selectedNumber - 1);
    },
  },
  methods: {
    unique() {
      if (this.HP < 1) {
        this.HP = 1;
      }
      this.HP = Math.round(this.HP);
      this.MaxHP = Math.round(this.MaxHP);
      this.skillValue = { ...this.init };
      this.skillValueSelf = { ...this.init };
      this.skillValueOther = { ...this.init };

      if (this.name === "四枝の浅瀬 A") {
        this.filteredList = [ { "SkillName": "四枝の浅瀬 A", "CT": "8", "Target": "自身", "Target2": "-", "PreText": "-", "MainText": "ガッツ", "PostText": "(5T/1回)", "Grow": "Lv", "Value0": "HP1000", "Value1": "HP1150", "Value2": "HP1300", "Value3": "HP1450", "Value4": "HP1600", "Value5": "HP1750", "Value6": "HP1900", "Value7": "HP2050", "Value8": "HP2200", "Value9": "HP2500", "Detail": "自身にガッツ状態(1回・5T)を付与[Lv]", "EntityID": "759550" }, { "SkillName": "四枝の浅瀬 A", "CT": "8", "Target": "自身", "Target2": "-", "PreText": "-", "MainText": "HPが少ないほど攻撃力", "PostText": "アップ(3T)", "Grow": "-", "Value0": "20%～50%", "Value1": "20%～50%", "Value2": "20%～50%", "Value3": "20%～50%", "Value4": "20%～50%", "Value5": "20%～50%", "Value6": "20%～50%", "Value7": "20%～50%", "Value8": "20%～50%", "Value9": "20%～50%", "Detail": "＆HPが少ないほど攻撃力がアップする状態を付与(3T)", "EntityID": "759550" } ]
        let result = 20 + (1 - this.HP / this.MaxHP) * 30;
        result = Number(result);
        result = Math.round(result);
        this.skillValueSelf["攻撃力"] = result;
      }
      if (this.name === "被虐体質 A+") {
        this.filteredList = [ { "SkillName": "被虐体質 A+", "CT": "6", "Target": "自身", "Target2": "-", "PreText": "-", "MainText": "ターゲット集中", "PostText": "(1T)", "Grow": "-", "Value0": "3000", "Value1": "3000", "Value2": "3000", "Value3": "3000", "Value4": "3000", "Value5": "3000", "Value6": "3000", "Value7": "3000", "Value8": "3000", "Value9": "3000", "Detail": "自身にターゲット集中状態を付与(1T)", "EntityID": "355551" }, { "SkillName": "被虐体質 A+", "CT": "6", "Target": "自身", "Target2": "-", "PreText": "-", "MainText": "防御力", "PostText": "アップ(1T)", "Grow": "Lv", "Value0": "10%", "Value1": "12%", "Value2": "14%", "Value3": "16%", "Value4": "18%", "Value5": "20%", "Value6": "22%", "Value7": "24%", "Value8": "26%", "Value9": "30%", "Detail": "＆防御力をアップ[Lv](1T)", "EntityID": "355551" }, { "SkillName": "被虐体質 A+", "CT": "6", "Target": "自身", "Target2": "-", "PreText": "HPが1200%以下の間<HP5000%以下の間>", "MainText": "HPが少ないほど攻撃力", "PostText": "アップ(3T)", "Grow": "-", "Value0": "10%～30%", "Value1": "12%～32%", "Value2": "14%～34％", "Value3": "16%～36%", "Value4": "18%～38%", "Value5": "20%～40%", "Value6": "22%～42%", "Value7": "24%～44%", "Value8": "26%～46%", "Value9": "30%～50%", "Detail": "＆HPが50%以下の時、HPが少ないほど攻撃力がアップする状態を付与[Lv](3T)", "EntityID": "355551" } ]
        const base = [0, 10, 12, 14, 16, 18, 20, 22, 24, 26, 30];
        let result =
          base[this.selectedNumber] + (1 - this.HP / (this.MaxHP / 2)) * 20;
        result = Number(result);
        result = Math.round(result);
        this.skillValueSelf["攻撃力"] = result;
        //HPが50%以下の間チェック
        if (this.HP > this.MaxHP / 2) {
          this.skillValueSelf["攻撃力"] = 0;
        }
      }
      if (this.name === "局中法度 EX") {
        this.filteredList = [ { "SkillName": "局中法度 EX", "CT": "7", "Target": "自身", "Target2": "-", "PreText": "-", "MainText": "スター集中度", "PostText": "アップ(3T)", "Grow": "Lv", "Value0": "2000%", "Value1": "2200%", "Value2": "2400%", "Value3": "2600%", "Value4": "2800%", "Value5": "3000%", "Value6": "3200%", "Value7": "3400%", "Value8": "3600%", "Value9": "4000%", "Detail": "自身のスター集中度をアップ[Lv](3T)", "EntityID": "344650" }, { "SkillName": "局中法度 EX", "CT": "7", "Target": "自身", "Target2": "-", "PreText": "-", "MainText": "HPが少ないほどクリティカル威力", "PostText": "アップ(3T)", "Grow": "-", "Value0": "20%～100%", "Value1": "20%～100%", "Value2": "20%～100%", "Value3": "20%～100%", "Value4": "20%～100%", "Value5": "20%～100%", "Value6": "20%～100%", "Value7": "20%～100%", "Value8": "20%～100%", "Value9": "20%～100%", "Detail": "＆HPが少ないほどクリティカル威力がアップする状態を付与(3T)", "EntityID": "344650" }, { "SkillName": "局中法度 EX", "CT": "7", "Target": "自身", "Target2": "-", "PreText": "-", "MainText": "HP", "PostText": "減少", "Grow": "-", "Value0": "-1000", "Value1": "-1000", "Value2": "-1000", "Value3": "-1000", "Value4": "-1000", "Value5": "-1000", "Value6": "-1000", "Value7": "-1000", "Value8": "-1000", "Value9": "-1000", "Detail": "＆HPを減少【デメリット】", "EntityID": "344650" } ]
        let result = 20 + (1 - this.HP / this.MaxHP) * 80;
        result = Number(result);
        result = Math.round(result);
        this.skillValueSelf["クリティカル威力"] = result;
      }

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
    <v-text-field
      v-model="HP"
      @update:modelValue="unique"
      label="HP"
      density="compact"
      type="number"
      hide-details="auto"
    ></v-text-field>
    <v-text-field
      v-model="MaxHP"
      @update:modelValue="unique"
      label="最大HP"
      density="compact"
      type="number"
      hide-details="auto"
    ></v-text-field>
  </div>
</template>

<style scoped>
span {
  color: rgba(var(--v-theme-text), 1) !important;
  font-weight: 700;
}
</style>
