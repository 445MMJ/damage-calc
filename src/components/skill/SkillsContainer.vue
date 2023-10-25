<script>
import { defineAsyncComponent } from "vue";
import { sumObjectValue } from "../../components/TotalSkillValue.js";
const skillCard = defineAsyncComponent(() => import("./SkillCard.vue"));
const skillCardPreText = defineAsyncComponent(() =>
  import("./SkillCardPreText.vue")
);
const skillCardTarget2 = defineAsyncComponent(() =>
  import("./SkillCardTarget2.vue")
);
const skillCardUnique1 = defineAsyncComponent(() =>
  import("./SkillCardUnique1.vue")
);
const skillCardUnique2 = defineAsyncComponent(() =>
  import("./SkillCardUnique2.vue")
);
const skillCardUnique3 = defineAsyncComponent(() =>
  import("./SkillCardUnique3.vue")
);

export default {
  props: ["items"],
  emits: ["skillValue", "skillValueSelf", "skillValueOther"],
  components: {
    skillCard,
    skillCardPreText,
    skillCardTarget2,
    skillCardUnique1,
    skillCardUnique2,
    skillCardUnique3,
  },
  data() {
    return {
      skillNames: [
        0,
        "プレースホルダー",
        "プレースホルダー",
        "プレースホルダー",
      ],
      skillValue: [0, 1, 2, 3],
      totalSkillValue: {},
      skillValueSelf: [0, 1, 2, 3],
      totalSkillValueSelf: {},
      skillValueOther: [0, 1, 2, 3],
      totalSkillValueOther: {},
      skillCardType: ["skillCard", "skillCard", "skillCard", "skillCard"],
    };
  },
  watch: {
    items(newValue) {
      //新しい値が来たら保存して
      this.skillNames[1] = newValue["保有スキル 1"];
      this.skillNames[2] = newValue["保有スキル 2"];
      this.skillNames[3] = newValue["保有スキル 3"];
      this.skillCardType[1] = this.isSkillCardType(newValue["保有スキル 1"]);
      this.skillCardType[2] = this.isSkillCardType(newValue["保有スキル 2"]);
      this.skillCardType[3] = this.isSkillCardType(newValue["保有スキル 3"]);
    },
  },
  methods: {
    updateSkillValue(option, index) {
      this.skillValue[index] = option;
      this.totalSkillValue = sumObjectValue(this.skillValue);
      this.$emit("skillValue", this.totalSkillValue);
    },
    updateSkillValueSelf(option, index) {
      this.skillValueSelf[index] = option;
      this.totalSkillValueSelf = sumObjectValue(this.skillValueSelf);
      this.$emit("skillValueSelf", this.totalSkillValueSelf);
    },
    updateSkillValueOther(option, index) {
      this.skillValueOther[index] = option;
      this.totalSkillValueOther = sumObjectValue(this.skillValueOther);
      this.$emit("skillValueOther", this.totalSkillValueOther);
    },
    isSkillCardType(skillName) {
      //Pretextに条件が入っているスキルのEntityIDリスト
      const skillCardPreTextNameList = [
        "富の杯 B",
        "聖者の数字 EX",
        "聖者の数字 B",
        "水辺の聖女（ドルフィン） A+",
        "ジャガー・アイ A+",
        "ジャガー・アイ A+",
        "夏の受肉精霊 A+",
        "夏の受肉精霊 A+",
        "熱砂の神王 A",
        "熱砂の神王 A",
        "嵐の航海者 C++",
        "旅の導き C++",
        "サマータイム・コンバット B+",
        "サマータイム・コンバット B+",
        "渚の第六天魔王 A-",
        "水辺の聖女 B+",
        "第六天魔王 EX",
        "夢幻の如く B++",
        "ファニー・ヴァンプ EX",
        "虚ろなる酷暑への嘆き A",
        "間際の一撃 C",
        "暴走特権 EX",
        "逆境のカリスマ A",
        "サマー・ガルバニズム B+",
        "女神の恩恵 A+",
        "閉じるは現実の帳 E",
        "蜘蛛糸の果て A++",
        "蜘蛛糸の果て A+++",
        "驕慢王の美酒 B+",
        "星の裁き A",
        "魔力放出（宝石） A+",
        "ロイヤルバニー A",
        "美しい手のガレス B",
        "間際の一撃 C",
        "血濡れの蛮勇 A",
        "血濡れの蛮勇 A+",
        "黄泉路の境界 C",
        "妖星の火輪 A",
        "至尊の戦士 A+",
        "透化 A+",
        "十歩殺一人 B+",
        "殺戮機巧 B+",
        "澪標の魂 EX",
        "姉妹の絆 A",
        "戯作三昧 A",
        "青ざめた死の舞踏 A",
        "雅号・異星蛸 B",
        "雅号・異星蛸 A",
        "姉妹の絆 A",
        "士道の蹂躙 A",
        "三星の弓人 A+",
        "縮地 B+",
        "ワイルドルール A",
        "略奪の鉾 B",
        "簒奪の鉾 A",
        "加虐体質 A+",
        "不屈の弓射 B",
        "三百の奮闘 A+",
        "不撓不屈 B+",
        "死の淵 EX",
        "不撓不屈 A",
        "死なずのバールー EX",
      ];
      //Target2に条件が入っているスキルEntityIDリスト
      const skillCardTarget2NameList = [
        "キス魔 B++",
        "賢王の萌芽 B",
        "女王の躰 A+",
        "鬨の声・梁山泊 EX",
        "女王の躾 A",
        "対英雄 A",
        "大江の鬼あばれ A+",
        "真夏の女神 B",
        "レディの衣装な愛情 EX",
        "我、魔天に殉ず B",
        "フェロモン B",
        "悪心祝祭 A",
        "紅顔の美少年 C",
        "友と征く遙かなる海路 B++",
        "回路接続 EX",
        "紅顔の美少年 B",
        "魅惑の美声 B",
        "機へ至る忍耐 B",
        "ヴィナス・ドライバー B",
        "紅顔の美少年（雷） A",
        "砂漠の夜の風 A",
        "神明裁決 C",
        "儚き姉妹 A",
        "ドミネイター・フォックス A",
        "皇帝道術 EX",
        "邪智のカリスマ A",
        "生存の閨 A+",
        "薔薇の眠り B",
        "殺戮獣団 A",
        "金眼神鶯 A",
        "嗜虐のカリスマ A",
        "愛しき私の蜂蜜酒 C",
        "魔の血脈 A",
        "紳士的な愛 C",
        "サマー・バケーション！（子供） A+",
        "芸術審美 B",
        "サーヴァント・チア！ B",
        "黒き命 A",
        "極大宴会・梁山泊 EX",
        "ビーチクライシス（ポセイドン） EX",
        "死の淵 EX",
        "サマータイムラバーズ EX",
        "大河の巨獣 B",
        "竜の魔女 EX",
        "聖骸布（偽） B",
        "対英雄（譚） EX",
        "ハロウィン・スター EX",
        "ファニー・ヴァンプ EX",
        "愛の黒子 C",
        "神明裁決（偽） C++",
        "数学的思考 A",
        "落日の帝国 EX",
        "闘争のカリスマ A",
        "花嫁の守護者 EX",
        "真名看破 B",
        "すべてを見たもの EX",
        "海百合のカリスマ C",
        "ビーチフラワー B",
        "クィリヌスの玉座 EX",
        "魅惑の美声 A",
        "魅惑の美声 C",
        "ワルキューレ式集団戦闘 B+",
        "ビーチフラワー EX",
        "王道踏破 C",
        "洗礼詠唱 B+",
        "軍師の本懐 A",
        "終末の巫女 C",
        "道満の呪 A++",
        "神明裁決 A",
        "徐福伝説 C",
        "ビーチフラワー A+",
        "芸術審美 E-",
        "魔眼 B+",
      ];
      //四枝の浅瀬 A,被虐体質 A+,局中法度 EX
      const skillCardUnique1 = ["四枝の浅瀬 A","被虐体質 A+","局中法度 EX"]
      //大河の巨獣 B
      const skillCardUnique2 = ["大河の巨獣 B"];
      //(死滅願望 A強化前だから使わないかも),四夜の終末 EX,是非もなし A-
      const skillCardUnique3 = ["死滅願望 A","四夜の終末 EX","是非もなし A-"];
      if (skillCardPreTextNameList.includes(skillName)) {
        return "skillCardPreText";
      }
      if (skillCardTarget2NameList.includes(skillName)) {
        return "skillCardTarget2";
      }
      if (skillCardUnique1.includes(skillName)) {
        return "skillCardUnique1";
      }
      if (skillCardUnique2.includes(skillName)) {
        return "skillCardUnique2";
      }
      if (skillCardUnique3.includes(skillName)) {
        return "skillCardUnique3";
      }
      return "skillCard";
    },
  },
};
</script>

<!-- テンプレートの定義 -->
<template>
  <v-container class="">
    <v-row>
      <v-col cols="12" sm="4"
        ><component
          :is="skillCardType[1]"
          :name="skillNames[1]"
          @skillValue="updateSkillValue($event, 0)"
          @skillValueSelf="updateSkillValueSelf($event, 0)"
          @skillValueOther="updateSkillValueOther($event, 0)"
      /></v-col>
      <v-col cols="12" sm="4">
        <component
          :is="skillCardType[2]"
          :name="skillNames[2]"
          @skillValue="updateSkillValue($event, 1)"
          @skillValueSelf="updateSkillValueSelf($event, 1)"
          @skillValueOther="updateSkillValueOther($event, 1)"
      /></v-col>
      <v-col cols="12" sm="4"
        ><component
          :is="skillCardType[3]"
          :name="skillNames[3]"
          @skillValue="updateSkillValue($event, 2)"
          @skillValueSelf="updateSkillValueSelf($event, 2)"
          @skillValueOther="updateSkillValueOther($event, 2)"
      /></v-col>
    </v-row>
  </v-container>
</template>

<style>
.flex {
  display: flex;
}
</style>
