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
      rankList: [
        { title: "通常時", value: 0 },
        { title: "〔スキルランクアップ〕状態1つ", value: 1 },
        { title: "〔スキルランクアップ〕状態1つ", value: 2 },
      ],
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
      rank: 0,
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
        [
          {
            SkillName: "蛤御殿 A",
            CT: "8",
            Target: "味方全体",
            Target2: "-",
            PreText: "-",
            MainText: "回避",
            PostText: "(3T/1回)",
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
            Detail: "味方全体に回避状態を付与(1回・3T)",
            EntityID: "768550",
          },
          {
            SkillName: "蛤御殿 A",
            CT: "8",
            Target: "敵全体",
            Target2: "-",
            PreText: "-",
            MainText: "〔必中〕状態を解除",
            PostText: "-",
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
            Detail: "＋ 敵全体の必中状態を解除",
            EntityID: "768550",
          },
          {
            SkillName: "蛤御殿 A",
            CT: "8",
            Target: "敵全体",
            Target2: "-",
            PreText: "-",
            MainText: "幻惑（クリティカル発生率）",
            PostText: "ダウン(3T)",
            Grow: "-",
            Value0: "-10%",
            Value1: "-10%",
            Value2: "-10%",
            Value3: "-10%",
            Value4: "-10%",
            Value5: "-10%",
            Value6: "-10%",
            Value7: "-10%",
            Value8: "-10%",
            Value9: "-10%",
            Detail:
              "＆〔幻惑〕状態「精神異常扱いのクリティカル発生率ダウン状態」を1個付与(3T)",
            EntityID: "768550",
          },
          {
            SkillName: "蛤御殿 A",
            CT: "8",
            Target: "敵全体",
            Target2: "-",
            PreText: "-",
            MainText: "防御力",
            PostText: "ダウン(3T)",
            Grow: "Lv",
            Value0: "-10%",
            Value1: "-11%",
            Value2: "-12%",
            Value3: "-13%",
            Value4: "-14%",
            Value5: "-15%",
            Value6: "-16%",
            Value7: "-17%",
            Value8: "-18%",
            Value9: "-20%",
            Detail: "＆防御力をダウン[Lv](3T)",
            EntityID: "768550",
          },
          {
            SkillName: "蛤御殿 A",
            CT: "8",
            Target: "敵全体",
            Target2: "-",
            PreText: "-",
            MainText: "Artsカード耐性",
            PostText: "ダウン(3T)",
            Grow: "-",
            Value0: "-20%",
            Value1: "-20%",
            Value2: "-20%",
            Value3: "-20%",
            Value4: "-20%",
            Value5: "-20%",
            Value6: "-20%",
            Value7: "-20%",
            Value8: "-20%",
            Value9: "-20%",
            Detail: "＆Arts攻撃耐性をダウン(3T)",
            EntityID: "768550",
          },
        ],
        [
          {
            SkillName: "蛤御殿 A",
            CT: "8",
            Target: "味方全体",
            Target2: "-",
            PreText: "-",
            MainText: "回避",
            PostText: "(3T/1回)",
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
            Detail: "味方全体に回避状態を付与(1回・3T)",
            EntityID: "768550",
          },
          {
            SkillName: "蛤御殿 A",
            CT: "8",
            Target: "敵全体",
            Target2: "-",
            PreText: "-",
            MainText: "〔必中〕状態を解除",
            PostText: "-",
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
            Detail: "＋ 敵全体の必中状態を解除",
            EntityID: "768550",
          },
          {
            SkillName: "蛤御殿 A",
            CT: "8",
            Target: "敵全体",
            Target2: "-",
            PreText: "-",
            MainText: "幻惑（クリティカル発生率）",
            PostText: "ダウン(3T)",
            Grow: "-",
            Value0: "-20%",
            Value1: "-20%",
            Value2: "-20%",
            Value3: "-20%",
            Value4: "-20%",
            Value5: "-20%",
            Value6: "-20%",
            Value7: "-20%",
            Value8: "-20%",
            Value9: "-20%",
            Detail:
              "＆〔幻惑〕状態「精神異常扱いのクリティカル発生率ダウン状態」を2個付与(3T)",
            EntityID: "768550",
          },
          {
            SkillName: "蛤御殿 A",
            CT: "8",
            Target: "敵全体",
            Target2: "-",
            PreText: "-",
            MainText: "防御力",
            PostText: "ダウン(3T)",
            Grow: "Lv",
            Value0: "-15%",
            Value1: "-16%",
            Value2: "-17%",
            Value3: "-18%",
            Value4: "-19%",
            Value5: "-20%",
            Value6: "-21%",
            Value7: "-22%",
            Value8: "-23%",
            Value9: "-25%",
            Detail: "＆防御力をダウン[Lv](3T)",
            EntityID: "768550",
          },
          {
            SkillName: "蛤御殿 A",
            CT: "8",
            Target: "敵全体",
            Target2: "-",
            PreText: "-",
            MainText: "Artsカード耐性",
            PostText: "ダウン(3T)",
            Grow: "-",
            Value0: "-25%",
            Value1: "-25%",
            Value2: "-25%",
            Value3: "-25%",
            Value4: "-25%",
            Value5: "-25%",
            Value6: "-25%",
            Value7: "-25%",
            Value8: "-25%",
            Value9: "-25%",
            Detail: "＆Arts攻撃耐性をダウン(3T)",
            EntityID: "768550",
          },
        ],
        [
          {
            SkillName: "蛤御殿 A",
            CT: "8",
            Target: "味方全体",
            Target2: "-",
            PreText: "-",
            MainText: "回避",
            PostText: "(3T/1回)",
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
            Detail: "味方全体に回避状態を付与(1回・3T)",
            EntityID: "768550",
          },
          {
            SkillName: "蛤御殿 A",
            CT: "8",
            Target: "敵全体",
            Target2: "-",
            PreText: "-",
            MainText: "〔必中〕状態を解除",
            PostText: "-",
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
            Detail: "＋ 敵全体の必中状態を解除",
            EntityID: "768550",
          },
          {
            SkillName: "蛤御殿 A",
            CT: "8",
            Target: "敵全体",
            Target2: "-",
            PreText: "-",
            MainText: "幻惑（クリティカル発生率）",
            PostText: "ダウン(3T)",
            Grow: "-",
            Value0: "-30%",
            Value1: "-30%",
            Value2: "-30%",
            Value3: "-30%",
            Value4: "-30%",
            Value5: "-30%",
            Value6: "-30%",
            Value7: "-30%",
            Value8: "-30%",
            Value9: "-30%",
            Detail:
              "＆〔幻惑〕状態「精神異常扱いのクリティカル発生率ダウン状態」を1個付与(3T)",
            EntityID: "768550",
          },
          {
            SkillName: "蛤御殿 A",
            CT: "8",
            Target: "敵全体",
            Target2: "-",
            PreText: "-",
            MainText: "防御力",
            PostText: "ダウン(3T)",
            Grow: "Lv",
            Value0: "-20%",
            Value1: "-21%",
            Value2: "-22%",
            Value3: "-23%",
            Value4: "-24%",
            Value5: "-25%",
            Value6: "-26%",
            Value7: "-27%",
            Value8: "-28%",
            Value9: "-30%",
            Detail: "＆防御力をダウン[Lv](3T)",
            EntityID: "768550",
          },
          {
            SkillName: "蛤御殿 A",
            CT: "8",
            Target: "敵全体",
            Target2: "-",
            PreText: "-",
            MainText: "Artsカード耐性",
            PostText: "ダウン(3T)",
            Grow: "-",
            Value0: "-30%",
            Value1: "-30%",
            Value2: "-30%",
            Value3: "-30%",
            Value4: "-30%",
            Value5: "-30%",
            Value6: "-30%",
            Value7: "-30%",
            Value8: "-30%",
            Value9: "-30%",
            Detail: "＆Arts攻撃耐性をダウン(3T)",
            EntityID: "768550",
          },
        ],
      ];
      let AA = filteredList[this.rank];
      return AA;
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
      const value1 = [
        [0, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20],
        [0, 15, 16, 17, 18, 19, 20, 21, 22, 23, 25],
        [0, 20, 21, 22, 23, 24, 25, 26, 27, 28, 30],
      ];
      const value2 = [20, 25, 30];
      this.skillValue["防御力"] = value1[this.rank][this.selectedNumber];
      this.skillValue["Artsカード耐性"] = value2[this.rank];
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
    <v-select
      v-model="rank"
      @update:modelValue="unique"
      :items="rankList"
      label="スキルランクアップ"
      variant="outlined"
      density="compact"
    ></v-select>
    <ul>
      <li v-for="item in filteredList" :key="item.id">
        {{ item.Target }}/{{ item.MainText }}{{ item.PostText
        }}{{ item[this.skillLevel] }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
span {
  color: rgba(var(--v-theme-text), 1) !important;
  font-weight: 700;
}
</style>
