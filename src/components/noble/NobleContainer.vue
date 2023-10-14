<script>
import { nobleList } from "../../data/nobleList.js";
import { sumSkillValue } from "../script/sumSkillValue.js";
import nobleSelect from "./NobleSelect.vue";

export default {
  props: ["items"],
  emits: ["skillValue"],
  components: {
    nobleSelect,
  },
  data() {
    return {
      servantIndex: null,
      nobleData: null,
      nobleLevel: "Value0",
      nobleOC: "Value0",
      nobleName: null,
      init: {
        宝具攻撃: 0,
        攻撃力: 0,
        Busterカード性能: 0,
        Quickカード性能: 0,
        Artsカード性能: 0,
        宝具威力: 0,
      },
      skillValue: null,
    };
  },
  created() {
    this.nobleData = [
      {
        SkillName:
          '<ruby class="tdruby"><rb>いまに在りし夢想の城&nbsp;C</rb><rt>ロード・キャメロット</ruby></rt>',
        Owners: "s1",
        EntityID: "800106",
      },
    ];
    this.bufftype();
  },
  watch: {
    items(newValue) {
      this.servantIndex = "s" + newValue;
      const objectList = nobleList.nobleList.filter(
        (obj) => obj.Owners === this.servantIndex
      );
      // 宝具強化等で1つの鯖が複数の宝具データを持つので。EntityIDが最大のオブジェクトを取得する
      // 本当に複数宝具を持っているやつのことは知らない。エッジケースは考えない。
      const maxId = Math.max(...objectList.map((obj) => obj.EntityID));
      this.nobleData = objectList.filter((obj) => obj.EntityID == maxId);
      this.nobleName = this.nobleData[0].SkillName;
      this.bufftype();
    },
  },
  methods: {
    handleNobleLevel(item) {
      this.nobleLevel = `Value` + (item - 1);
      this.bufftype();
    },
    handleNobleOC(item) {
      this.nobleOC = `Value` + (item - 1);
      this.bufftype();
    },
    bufftype() {
      const result1 = sumSkillValue(this.nobleData, this.nobleLevel, "Noble" , this.nobleOC);
      console.log(result1);
      this.skillValue = { ...result1 };
      this.$emit("skillValue", this.skillValue);
    },
  },
  computed: {},
};
</script>

<!-- テンプレートの定義 -->
<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" align-self="center"
        ><span v-html="nobleName"></span
      ></v-col>
      <v-col cols="6" sm="3">
        <nobleSelect labelText="Lv" @selectednumber="handleNobleLevel"
      /></v-col>
      <v-col cols="6" sm="3">
        <nobleSelect labelText="OC" @selectednumber="handleNobleOC"
      /></v-col>
    </v-row>
    <v-row>
      <v-col>
        <ul>
          <li v-for="item in nobleData">
            {{ item.Detail }}
            <span v-if="item.Grow == 'Lv'">{{ item[this.nobleLevel] }}</span>
            <span v-if="item.Grow == 'OC'">{{ item[this.nobleOC] }}</span>
          </li>
        </ul>
      </v-col>
    </v-row>
  </v-container>
</template>
