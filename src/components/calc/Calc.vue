<script>
import { totalSpecialValue } from "../TotalSpecialValue.js";
import { additionalServantMap } from "../../data/additionalServantMap.js";
export default {
  components: {},
  props: {
    attacker: {
      type: Object,
      required: true,
    },
    skillvalue: {
      type: Object,
      required: true,
    },
    noblevalue: {
      type: Object,
      required: true,
    },
    ATKValue: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      tab: 1,
      classModifier: 1,
      classAffinityModifier: 1,
      classAffinityModifierList: [
        { id: 1, title: "2倍有利", value: 2 },
        { id: 1, title: "1.5倍有利", value: 1.5 },
        { id: 2, title: "等倍", value: 1 },
        { id: 3, title: "不利", value: 0.5 },
      ],
      attributeAffinityModifier: 1,
      attributeAffinityModifierList: [
        { id: 1, title: "有利", value: 1.1 },
        { id: 2, title: "等倍", value: 1 },
        { id: 3, title: "不利", value: 0.9 },
      ],
      DTDR: 1,
      DTDRList: [
        { id: 1, title: "他全部", value: 1 },
        { id: 1, title: "狂", value: 0.8 },
        { id: 2, title: "殺", value: 0.9 },
        { id: 3, title: "騎", value: 1.1 },
        { id: 3, title: "月術", value: 1.2 },
        { id: 3, title: "騎", value: 0.9 },
      ],
      // DTDRが特別に1.2倍の*14 スケルトン、竜牙兵、ゾンビ、海賊ゾンビ、ゴースト系、七人御佐姫、スケアクロウ のこと
      isSpecialEnemy: 0, // 0 or 1
      DSR: 0,
      DSRList: [
        { id: 1, title: "他全部", value: 1 },
        { id: 1, title: "狂", value: 0.8 },
        { id: 2, title: "殺", value: 0.9 },
        { id: 3, title: "騎", value: 1.1 },
        { id: 3, title: "月術", value: 1.2 },
        { id: 3, title: "騎", value: 0.9 },
      ],
      isOberon: 0, // 0 or 1
      isNobleSpecial: 0, // 0 or 1
      isCritical: 0, // 0 or 1
      buffCardType: "Busterカード性能",
      cardModifierATK: 0,
      cardModifierATKList: {
        Arts: [0, 100, 120, 140],
        Buster: [0, 150, 180, 210],
        Quick: [0, 80, 96, 112],
      },
      cardModifierNPList: {
        Arts: [0, 300, 450, 600],
        Buster: [0, 0, 0, 0],
        Quick: [0, 100, 150, 200],
      },
      cardModifierStarList: {
        Arts: [0, 0, 0, 0],
        Buster: [0, 10, 15, 20],
        Quick: [0, 80, 130, 180],
      },
      firstCard: "None",
      firstCardList: [
        { id: 1, title: "Buster", value: "Buster" },
        { id: 1, title: "Arts", value: "Arts" },
        { id: 2, title: "Quick", value: "Quick" },
        { id: 3, title: "Mighty", value: "Mighty" },
      ],
      firstBounsATKList: {
        Arts: [0, 0, 0, 0],
        Buster: [0, 0.5, 0.5, 0.5],
        Quick: [0, 0, 0, 0],
        None: [0, 0, 0, 0],
        Mighty: [0, 0, 0.5, 0.5],
      },
      firstBounsNPList: {
        Arts: [0, 100, 100, 100],
        Buster: [0, 0, 0, 0],
        Quick: [0, 0, 0, 0],
        None: [0, 0, 0, 0],
        Mighty: [0, 100, 100, 100],
      },
      firstBounsStarList: {
        Arts: [0, 0, 0, 0],
        Buster: [0, 0, 0, 0],
        Quick: [0, 20, 20, 20],
        None: [0, 0, 0, 0],
        Mighty: [0, 20, 20, 20],
      },
      BusterChainList: {
        Arts: 0,
        Buster: 1,
        Quick: 0,
      },
      isBusterChain: 0,
      slider: 1,
      additionalData: 0,
      overHitCount: 0,
    };
  },
  mounted: function () {
    this.fetchAdditionalData();
  },
  watch: {
    attacker: function (newVal) {
      this.fetchAdditionalData();
    },
  },
  methods: {
    calcCardDamage(cardtype, index) {
      //下処理
      let result = 0;
      let buffCardType = "";
      let specialValue = totalSpecialValue(this.skillvalue);
      if (cardtype == "Buster") {
        buffCardType = "Busterカード性能";
      } else if (cardtype == "Arts") {
        buffCardType = "Artsカード性能";
      } else if (cardtype == "Quick") {
        buffCardType = "Quickカード性能";
      }
      result =
        //A項
        this.ATKValue *
          0.23 *
          ((this.cardModifierATKList[cardtype][index] / 100) *
            Math.min(5, 1 + this.skillvalue[buffCardType] / 100) +
            this.firstBounsATKList[this.firstCard][index]) *
          this.classAffinityModifier *
          this.attributeAffinityModifier *
          //B項
          (1 + this.skillvalue["攻撃力"] / 100) *
          Math.max(1, 2 * this.isCritical) *
          //C項
          (1 + specialValue / 100) *
          Math.max(
            1,
            this.isCritical * (1 + this.skillvalue["クリティカル威力"] / 100)
          ) +
        //E項
        Number(this.isBusterChain) *
          this.BusterChainList[cardtype] *
          this.ATKValue *
          0.2;

      result = Math.floor(Number(result));
      return result;
    },
    calcNobleDamage() {
      //下処理
      let result = 0;
      let cardtype = "";
      let buffCardType = "";
      let specialValue = totalSpecialValue(this.skillvalue);
      if (this.attacker["Noble"].includes("Ｂ")) {
        buffCardType = "Busterカード性能";
        cardtype = "Buster";
      } else if (this.attacker["Noble"].includes("Ａ")) {
        buffCardType = "Artsカード性能";
        cardtype = "Arts";
      } else if (this.attacker["Noble"].includes("Ｑ")) {
        buffCardType = "Quickカード性能";
        cardtype = "Quick";
      }
      result =
        //A項
        ((((this.ATKValue * this.noblevalue["宝具攻撃"]) / 100) *
          this.cardModifierATKList[cardtype][1]) /
          100) *
        Math.min(5, 1 + this.skillvalue[buffCardType] / 100) *
        Math.min(5, 1 + this.noblevalue[buffCardType] / 100) *
        this.classAffinityModifier *
        this.attributeAffinityModifier *
        this.slider * //仮置きの乱数
        //B項
        (1 +
          this.skillvalue["攻撃力"] / 100 +
          this.noblevalue["攻撃力"] / 100) *
        //C項
        (1 + specialValue / 100) *
        (1 +
          (this.skillvalue["宝具威力"] / 100) * (1 + Number(this.isOberon)) +
          (this.noblevalue["宝具威力"] / 100) * (1 + Number(this.isOberon))) *
        //D項
        Math.max(
          1,
          (this.noblevalue["特攻"] / 100) * Number(this.isNobleSpecial)
        );
      //E項は無し
      result = Math.floor(Number(result));
      return result;
    },
    calcCardNPGain(cardtype, index) {
      //下処理
      let result = 0;
      let buffCardType = "";
      if (cardtype == "Buster") {
        buffCardType = "Busterカード性能";
      } else if (cardtype == "Arts") {
        buffCardType = "Artsカード性能";
      } else if (cardtype == "Quick") {
        buffCardType = "Quickカード性能";
      }
      result =
        this.additionalData["N/A "] *
        ((this.cardModifierNPList[cardtype][index] / 100) *
          Math.min(5, 1 + this.skillvalue[buffCardType] / 100) +
          this.firstBounsNPList[this.firstCard][index] / 100) *
        this.DTDR *
        Math.min(5, 1 + this.skillvalue["NP獲得量"] / 100) *
        Math.max(1, 2 * this.isCritical) *
        (this.additionalData[cardtype] + this.overHitCount * 0.5);
      result = result * 100;
      result = Math.round(result);
      result = result / 100;
      return result;
    },
    calcNobleNPGain() {
      //下処理
      let result = 0;
      let cardtype = "";
      let buffCardType = "";
      if (this.attacker["Noble"].includes("Ｂ")) {
        buffCardType = "Busterカード性能";
        cardtype = "Buster";
      } else if (this.attacker["Noble"].includes("Ａ")) {
        buffCardType = "Artsカード性能";
        cardtype = "Arts";
      } else if (this.attacker["Noble"].includes("Ｑ")) {
        buffCardType = "Quickカード性能";
        cardtype = "Quick";
      }
      result =
        this.additionalData["N/A "] *
        (this.cardModifierNPList[cardtype][1] / 100) *
        Math.min(
          5,
          1 +
            this.skillvalue[buffCardType] / 100 +
            this.noblevalue[buffCardType] / 100
        ) *
        this.DTDR *
        Math.min(
          5,
          1 +
            this.skillvalue["NP獲得量"] / 100 +
            this.noblevalue["NP獲得量"] / 100
        ) *
        (this.additionalData["NP "] + this.overHitCount * 0.5);
      result = result * 100;
      result = Math.round(result);
      result = result / 1000;
      return result;
    },
    calcCardStarGain(cardtype, index) {
      //下処理
      let result = 0;
      let buffCardType = "";
      if (cardtype == "Buster") {
        buffCardType = "Busterカード性能";
      } else if (cardtype == "Arts") {
        buffCardType = "Artsカード性能";
      } else if (cardtype == "Quick") {
        buffCardType = "Quickカード性能";
      }
      result =
        this.additionalData["SR"] / 100 +
        (this.cardModifierStarList[cardtype][index] / 100) *
          Math.min(5, 1 + this.skillvalue[buffCardType] / 100) +
        this.firstBounsStarList[this.firstCard][index] / 100 +
        this.DSR +
        Math.min(5, this.skillvalue["スター発生率"] / 100) +
        Math.max(0, 0.2 * this.isCritical);
      result = result * 100; //※パーセンテージにしてから切り捨てを行う
      result = Math.round(result);
      let Star =
        "確定" + Math.floor(result / 100) + "個 確率" + (result % 100) + "%";
      return Star;
    },
    calcNobleStarGain() {
      //下処理
      let result = 0;
      let cardtype = "";
      let buffCardType = "";
      if (this.attacker["Noble"].includes("Ｂ")) {
        buffCardType = "Busterカード性能";
        cardtype = "Buster";
      } else if (this.attacker["Noble"].includes("Ａ")) {
        buffCardType = "Artsカード性能";
        cardtype = "Arts";
      } else if (this.attacker["Noble"].includes("Ｑ")) {
        buffCardType = "Quickカード性能";
        cardtype = "Quick";
      }
      result =
        this.additionalData["SR"] *
        (this.cardModifierNPList[cardtype][1] / 100) *
        Math.min(
          5,
          1 +
            this.skillvalue[buffCardType] / 100 +
            this.noblevalue[buffCardType] / 100
        ) *
        this.DTDR *
        Math.min(
          5,
          1 +
            this.skillvalue["スター発生率"] / 100 +
            this.noblevalue["スター発生率"] / 100
        ) *
        (this.additionalData["NP "] + this.overHitCount * 0.5);
      result = result * 100; //※パーセンテージにしてから切り捨てを行う
      result = Math.round(result);
      result = result / 100;
      let Star =
        "確定" + Math.floor(result / 100) + "個 確率" + (result % 100) + "%";
      return Star;
    },
    fetchAdditionalData() {
      this.additionalData = {
        ...additionalServantMap.get(this.attacker["No."]),
      };
      this.additionalData["N/A "] = Number(this.additionalData["N/A "]);
      this.additionalData["SR"] = Number(this.additionalData["SR"]);
      this.additionalData["Buster"] = Number(this.additionalData["Buster"]);
      this.additionalData["Arts"] = Number(this.additionalData["Arts"]);
      this.additionalData["Quick"] = Number(this.additionalData["Quick"]);
      this.additionalData["Noble"] = Number(this.additionalData["Noble"]);
    },
  },
};
</script>

<template>
  <v-tabs v-model="tab" bg-color="primary" show-arrows>
    <v-tab value="1">宝具計算</v-tab>
    <v-tab value="2">カードダメージ</v-tab>
    <v-tab value="3">NP獲得量</v-tab>
    <v-tab value="4">スター獲得量</v-tab>
    <v-tab value="5">コマンドカード計算</v-tab>
    <v-tab value="99">内部データ</v-tab>
    <v-tab value="999">撃破率</v-tab>
  </v-tabs>

  <v-window v-model="tab">
    <v-window-item value="1">
      <v-container>
        <v-row>
          <v-col cols="6" sm="3">
            <v-select
              label="クラス相性"
              v-model="classAffinityModifier"
              :items="classAffinityModifierList"
              variant="outlined"
              density="compact"
              hide-details="auto"
            ></v-select
          ></v-col>
          <v-col cols="6" sm="3">
            <v-select
              label="天地人相性"
              v-model="attributeAffinityModifier"
              :items="attributeAffinityModifierList"
              variant="outlined"
              density="compact"
              hide-details="auto"
            ></v-select
          ></v-col>
          <v-col>
            <v-checkbox
              label="オベロン"
              v-model="isOberon"
              false-value="0"
              true-value="1"
              color="primary"
              hide-details="auto"
            >
            </v-checkbox>
          </v-col>
          <v-col>
            <v-checkbox
              label="宝具特攻"
              v-model="isNobleSpecial"
              false-value="0"
              true-value="1"
              color="primary"
              hide-details="auto"
            >
            </v-checkbox>
          </v-col>
        </v-row>
        <v-row class="text-h3">ダメージ:{{ calcNobleDamage() }}</v-row>
        <v-row class="text-h3">NP獲得/エネミー:{{ calcNobleNPGain() }}</v-row>
        <v-row class="text-h3"
          >スター獲得/エネミー:{{ calcNobleStarGain() }}</v-row
        >

        <v-row>
          <v-slider
            v-model="slider"
            thumb-label="always"
            track-color="grey"
            min="0.9"
            max="1.099"
            :step="0.001"
          ></v-slider>
        </v-row>
        <v-row
          ><v-col> <v-btn @click="() => (slider = 0.9)"> 最小 </v-btn></v-col>
          <v-col> <v-btn @click="() => (slider = 1)"> 平均 </v-btn></v-col>
          <v-col> <v-btn @click="() => (slider = 1.099)"> 最大 </v-btn></v-col>
        </v-row>
      </v-container>
    </v-window-item>

    <v-window-item value="2">
      <v-container>
        <v-row>
          <v-col cols="6" sm="3">
            <v-select
              label="クラス相性"
              v-model="classAffinityModifier"
              :items="classAffinityModifierList"
              variant="outlined"
              density="compact"
              hide-details="auto"
            ></v-select
          ></v-col>
          <v-col cols="6" sm="3">
            <v-select
              label="天地人相性"
              v-model="attributeAffinityModifier"
              :items="attributeAffinityModifierList"
              variant="outlined"
              density="compact"
              hide-details="auto"
            ></v-select
          ></v-col>
          <v-col cols="4" sm="2">
            <v-checkbox
              v-model="isCritical"
              false-value="0"
              true-value="1"
              color="primary"
              hide-details="auto"
            >
              <template v-slot:label
                ><span class="text-no-wrap">クリティカル</span></template
              >
            </v-checkbox></v-col
          >
          <v-col cols="4" sm="2">
            <v-checkbox
              v-model="firstCard"
              false-value="None"
              true-value="Buster"
              color="primary"
              hide-details="auto"
            >
              <template v-slot:label
                ><span class="text-no-wrap">1st Buster</span></template
              >
            </v-checkbox>
          </v-col>
          <v-col cols="4" sm="2">
            <v-checkbox
              v-model="isBusterChain"
              false-value="0"
              true-value="1"
              color="primary"
              hide-details="auto"
            >
              <template v-slot:label
                ><span class="text-no-wrap">Bチェイン</span></template
              >
            </v-checkbox>
          </v-col>
        </v-row>
        <v-row
          ><v-col>Card</v-col><v-col>1st</v-col><v-col>2nd</v-col
          ><v-col>3rd</v-col></v-row
        >
        <v-row
          ><v-col>Buster</v-col> <v-col>{{ calcCardDamage("Buster", 1) }}</v-col
          ><v-col>{{ calcCardDamage("Buster", 2) }}</v-col
          ><v-col>{{ calcCardDamage("Buster", 3) }}</v-col></v-row
        >
        <v-row>
          <v-col>Arts</v-col> <v-col>{{ calcCardDamage("Arts", 1) }}</v-col
          ><v-col>{{ calcCardDamage("Arts", 2) }}</v-col
          ><v-col>{{ calcCardDamage("Arts", 3) }}</v-col></v-row
        >
        <v-row>
          <v-col>Quick</v-col> <v-col>{{ calcCardDamage("Quick", 1) }}</v-col
          ><v-col>{{ calcCardDamage("Quick", 2) }}</v-col
          ><v-col>{{ calcCardDamage("Quick", 3) }}</v-col></v-row
        >
      </v-container>
    </v-window-item>

    <v-window-item value="3">
      <v-container>
        <v-row>
          <v-col cols="6" sm="3">
            <v-select
              label="敵クラスNP補正 DTDR"
              v-model="DTDR"
              :items="DTDRList"
              variant="outlined"
              density="compact"
              hide-details="auto"
            ></v-select
          ></v-col>
          <v-col cols="4" sm="2">
            <v-checkbox
              v-model="isCritical"
              false-value="0"
              true-value="1"
              color="primary"
              hide-details="auto"
            >
              <template v-slot:label
                ><span class="text-no-wrap">クリティカル</span></template
              >
            </v-checkbox></v-col
          >
          <v-col cols="4" sm="2">
            <v-checkbox
              v-model="firstCard"
              false-value="None"
              true-value="Arts"
              color="primary"
              hide-details="auto"
            >
              <template v-slot:label
                ><span class="text-no-wrap">1st Arts</span></template
              >
            </v-checkbox> </v-col
          ><v-col cols="4" sm="2">
            <v-checkbox
              v-model="isSpecialEnemy"
              false-value="0"
              true-value="1"
              color="primary"
              hide-details="auto"
            >
              <template v-slot:label
                ><span class="text-no-wrap">特殊エネミー</span></template
              >
            </v-checkbox></v-col
          >
        </v-row>
        <v-row
          ><v-col>Card</v-col><v-col>1st</v-col><v-col>2nd</v-col
          ><v-col>3rd</v-col></v-row
        >
        <v-row
          ><v-col>Buster</v-col> <v-col>{{ calcCardNPGain("Buster", 1) }}</v-col
          ><v-col>{{ calcCardNPGain("Buster", 2) }}</v-col
          ><v-col>{{ calcCardNPGain("Buster", 3) }}</v-col></v-row
        >
        <v-row>
          <v-col>Arts</v-col> <v-col>{{ calcCardNPGain("Arts", 1) }}</v-col
          ><v-col>{{ calcCardNPGain("Arts", 2) }}</v-col
          ><v-col>{{ calcCardNPGain("Arts", 3) }}</v-col></v-row
        >
        <v-row>
          <v-col>Quick</v-col> <v-col>{{ calcCardNPGain("Quick", 1) }}</v-col
          ><v-col>{{ calcCardNPGain("Quick", 2) }}</v-col
          ><v-col>{{ calcCardNPGain("Quick", 3) }}</v-col></v-row
        >
      </v-container>
    </v-window-item>

    <v-window-item value="4">
      <v-container>
        <v-row>
          <v-col cols="6" sm="3">
            <v-select
              label="敵クラスNP補正 DTDR"
              v-model="DTDR"
              :items="DTDRList"
              variant="outlined"
              density="compact"
              hide-details="auto"
            ></v-select
          ></v-col>
          <v-col cols="4" sm="2">
            <v-checkbox
              v-model="isCritical"
              false-value="0"
              true-value="1"
              color="primary"
              hide-details="auto"
            >
              <template v-slot:label
                ><span class="text-no-wrap">クリティカル</span></template
              >
            </v-checkbox></v-col
          >
          <v-col cols="4" sm="2">
            <v-checkbox
              v-model="firstCard"
              false-value="None"
              true-value="Quick"
              color="primary"
              hide-details="auto"
            >
              <template v-slot:label
                ><span class="text-no-wrap">1st Quick</span></template
              >
            </v-checkbox>
          </v-col>
        </v-row>
        <v-row
          ><v-col>Card</v-col><v-col>1st</v-col><v-col>2nd</v-col
          ><v-col>3rd</v-col></v-row
        >
        <v-row
          ><v-col>Buster</v-col>
          <v-col>{{ calcCardStarGain("Buster", 1) }}</v-col
          ><v-col>{{ calcCardStarGain("Buster", 2) }}</v-col
          ><v-col>{{ calcCardStarGain("Buster", 3) }}</v-col></v-row
        >
        <v-row>
          <v-col>Arts</v-col> <v-col>{{ calcCardStarGain("Arts", 1) }}</v-col
          ><v-col>{{ calcCardStarGain("Arts", 2) }}</v-col
          ><v-col>{{ calcCardStarGain("Arts", 3) }}</v-col></v-row
        >
        <v-row>
          <v-col>Quick</v-col> <v-col>{{ calcCardStarGain("Quick", 1) }}</v-col
          ><v-col>{{ calcCardStarGain("Quick", 2) }}</v-col
          ><v-col>{{ calcCardStarGain("Quick", 3) }}</v-col></v-row
        >
      </v-container>
    </v-window-item>

    <v-window-item value="5">
      <v-container>
        <v-row>
          <v-col cols="6" sm="3">
            <v-select
              label="クラス相性"
              v-model="classAffinityModifier"
              :items="classAffinityModifierList"
              variant="outlined"
              density="compact"
              hide-details="auto"
            ></v-select
          ></v-col>
          <v-col cols="6" sm="3">
            <v-select
              label="天地人相性"
              v-model="attributeAffinityModifier"
              :items="attributeAffinityModifierList"
              variant="outlined"
              density="compact"
              hide-details="auto"
            ></v-select
          ></v-col>
          <v-col cols="6" sm="3">
            <v-select
              label="敵クラススター補正 DSR"
              v-model="DSR"
              :items="DSRList"
              variant="outlined"
              density="compact"
              hide-details="auto"
            ></v-select
          ></v-col>

          <v-col cols="6" sm="3">
            <v-select
              label="敵クラスNP補正 DTDR"
              v-model="DTDR"
              :items="DTDRList"
              variant="outlined"
              density="compact"
              hide-details="auto"
            ></v-select
          ></v-col>
          <v-col cols="6" sm="3">
            <v-select
              label="1stCard"
              v-model="firstCard"
              :items="firstCardList"
              variant="outlined"
              density="compact"
              hide-details="auto"
            ></v-select
          ></v-col>
          <v-col cols="4" sm="2">
            <v-checkbox
              v-model="isCritical"
              false-value="0"
              true-value="1"
              color="primary"
              hide-details="auto"
            >
              <template v-slot:label
                ><span class="text-no-wrap">クリティカル</span></template
              >
            </v-checkbox></v-col
          >
          <v-col cols="4" sm="2">
            <v-checkbox
              v-model="isBusterChain"
              false-value="0"
              true-value="1"
              color="primary"
              hide-details="auto"
            >
              <template v-slot:label
                ><span class="text-no-wrap">Bチェイン</span></template
              >
            </v-checkbox>
          </v-col>
          <v-col cols="4" sm="2">
            <v-checkbox
              v-model="isSpecialEnemy"
              false-value="0"
              true-value="1"
              color="primary"
              hide-details="auto"
            >
              <template v-slot:label
                ><span class="text-no-wrap">特殊エネミー</span></template
              >
            </v-checkbox></v-col
          >
        </v-row>
        <v-row
          ><v-col>Card</v-col><v-col>1st</v-col><v-col>2nd</v-col
          ><v-col>3rd</v-col></v-row
        >
        <v-row
          ><v-col>Buster</v-col> <v-col>{{ calcCardDamage("Buster", 1) }}<br>
            {{ calcCardNPGain("Buster", 1) }}<br>
            {{ calcCardStarGain("Buster", 1) }}</v-col
          ><v-col>{{ calcCardDamage("Buster", 2) }}</v-col
          ><v-col>{{ calcCardDamage("Buster", 3) }}</v-col></v-row
        >
        <v-row>
          <v-col>Arts</v-col> <v-col>{{ calcCardDamage("Arts", 1) }}</v-col
          ><v-col>{{ calcCardDamage("Arts", 2) }}</v-col
          ><v-col>{{ calcCardDamage("Arts", 3) }}</v-col></v-row
        >
        <v-row>
          <v-col>Quick</v-col> <v-col>{{ calcCardDamage("Quick", 1) }}</v-col
          ><v-col>{{ calcCardDamage("Quick", 2) }}</v-col
          ><v-col>{{ calcCardDamage("Quick", 3) }}</v-col></v-row
        >
      </v-container>
    </v-window-item>

    <v-window-item value="999">
      <v-container><v-row> 撃破率 作りたい </v-row> </v-container>
    </v-window-item>

    <v-window-item value="99">
      <v-container>
        <v-row>
          サーヴァント<br />
          {{ attacker }} <br />
          ATK<br />
          {{ ATKValue }} <br />
          バフ情報<br />
          {{ skillvalue }} <br />
          宝具性能<br />
          {{ noblevalue }}<br />
          オベロン<br />
          {{ isOberon }}<br />
          追加鯖データ<br />
          {{ additionalData }}
        </v-row>
      </v-container>
    </v-window-item>
  </v-window>
</template>
