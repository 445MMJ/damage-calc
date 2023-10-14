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
      cards: ["Buster", "Arts", "Quick"],
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
        { id: 1, title: "剣弓槍など", value: 1 },
        { id: 2, title: "騎", value: 1.1 },
        { id: 3, title: "術月", value: 1.3 },
        { id: 4, title: "殺", value: 0.9 },
        { id: 5, title: "狂", value: 0.8 },
      ],
      // DTDRが特別に1.2倍の*14 スケルトン、竜牙兵、ゾンビ、海賊ゾンビ、ゴースト系、七人御佐姫、スケアクロウ のこと
      isSpecialEnemy: 0, // 0 or 1
      DSR: 0,
      DSRList: [
        { id: 1, title: "基本", value: 0 },
        { id: 1, title: "殺讐詐", value: -0.1 },
        { id: 2, title: "槍", value: -0.05 },
        { id: 3, title: "弓分", value: 0.05 },
        { id: 3, title: "騎", value: 0.1 },
        { id: 3, title: "降", value: 0.2 },
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
      enemyNumber: 3,
      enemyNumberList: [
        { id: 1, title: "1体", value: 1 },
        { id: 2, title: "2体", value: 2 },
        { id: 3, title: "3体", value: 3 },
        { id: 4, title: "4体", value: 4 },
        { id: 5, title: "5体", value: 5 },
        { id: 6, title: "6体", value: 6 },
      ],
      isBusterChain: 0,
      slider: 1,
      additionalData: 0,
      overHitCount: 0,
      tab: 100,
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
        (this.additionalData["NP "] + this.overHitCount * 0.5) *
        this.enemyNumber;
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
      let Star = [
        Math.floor(result / 100) *
          this.enemyNumber *
          Number(this.additionalData[cardtype]),
        result % 100,
        this.enemyNumber * Number(this.additionalData[cardtype]),
        result * Number(this.additionalData[cardtype]) * this.enemyNumber,
      ];
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
        this.additionalData["SR"]/100 +
        (this.cardModifierStarList[cardtype][1] / 100) *
          Math.min(
            5,
            1 +
              this.skillvalue[buffCardType] / 100 +
              this.noblevalue[buffCardType] / 100
          ) +
        this.DSR +
        Math.min(
          5,
            this.skillvalue["スター発生率"] / 100 +
            this.noblevalue["スター発生率"] / 100
        );
      result = result * 100; //※パーセンテージにしてから切り捨てを行う
      result = Math.round(result);
      let Star = [
        Math.floor(result / 100) *
          this.enemyNumber *
          Number(this.additionalData["NP "]),//確定数
        result % 100,//確率数
        this.enemyNumber * Number(this.additionalData["NP "]),//確率試行数
        result * Number(this.additionalData["NP "]) * this.enemyNumber,//期待値
      ];
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
      this.additionalData["NP "] = Number(this.additionalData["NP "]);
    },
    getInitialLetter(item) {
      return item.slice(0, 1);
    },
  },
};
</script>

<template>
  <v-tabs v-model="tab" bg-color="primary" show-arrows>
    <v-tab value="777" disabled> </v-tab>
    <v-tab value="100">宝具ダメージ</v-tab>
    <v-tab value="101">宝具NP/スター</v-tab>
    <v-tab value="200">カードダメージ</v-tab>
    <v-tab value="201">カードNP/スター</v-tab>
    <v-tab value="999">内部データ</v-tab>
  </v-tabs>

  <v-window v-model="tab">
    <v-window-item value="100">
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
        <v-row justify="center" class="text-h6 align-center">
          <v-col class="pr-0"> <v-icon icon="mdi-fast-forward"></v-icon></v-col>
          <v-col class="pl-0 text-no-wrap">平均</v-col>
          <v-col align-self="center" class="text-h3 damage">{{
            calcNobleDamage().toLocaleString()
          }}</v-col
          ><v-col></v-col><v-col></v-col>
        </v-row>
        <v-row
          ><v-divider :thickness="2" class="border-opacity-100"></v-divider>
        </v-row>
        <v-row class="text-h6" justify="center"
          ><v-col cols="4"
            >最小
            {{ Math.round(calcNobleDamage() * 0.9).toLocaleString() }}</v-col
          ><v-col cols="4"
            >最大
            {{ Math.round(calcNobleDamage() * 1.099).toLocaleString() }}</v-col
          >
        </v-row>
      </v-container>
    </v-window-item>

    <v-window-item value="101">
      <v-container>
        <v-row>
          <v-col cols="6" sm="3">
            <v-select
              label="敵スター補正"
              v-model="DSR"
              :items="DSRList"
              variant="outlined"
              density="compact"
              hide-details="auto"
            ></v-select
          ></v-col>

          <v-col cols="6" sm="3">
            <v-select
              label="敵NP補正"
              v-model="DTDR"
              :items="DTDRList"
              variant="outlined"
              density="compact"
              hide-details="auto"
            ></v-select
          ></v-col>
          <v-col cols="6" sm="3">
            <v-select
              label="エネミー数"
              v-model="enemyNumber"
              :items="enemyNumberList"
              variant="outlined"
              density="compact"
              hide-details="auto"
            ></v-select
          ></v-col>
          <v-col cols="3" sm="2"
            ><v-tooltip location="top">
              <template #activator="{ props }">
                <v-checkbox
                  v-bind="props"
                  v-model="isSpecialEnemy"
                  false-value="0"
                  true-value="1"
                  color="primary"
                  hide-details="auto"
                >
                  <template v-slot:label
                    ><span v-bind="props" class="text-no-wrap"
                      >特殊エネミー</span
                    ></template
                  >
                </v-checkbox>
              </template>
              <span
                >敵NP補正が高い一部のエネ三ー（スケルトン、竜牙兵、ゾンビ、海賊ゾンビ、ゴースト系、七人御佐姫、スケアクロウ）</span
              >
            </v-tooltip>
          </v-col>
        </v-row>

        <v-row justify="center" class="text-h6 align-center">
          <v-spacer></v-spacer>
          <v-col class="pr-0">
            <v-icon icon="mdi-battery-charging"></v-icon
          ></v-col>
          <v-col class="pl-0 text-no-wrap">{{ calcNobleNPGain() }}%</v-col>
          <v-col class="pr-0">
            <v-icon icon="mdi-star-four-points"></v-icon
          ></v-col>
          <v-col class="pl-0 text-no-wrap"
            >{{ calcNobleStarGain()[0] }}個 ＆ {{ calcNobleStarGain()[1] }}%
            {{ calcNobleStarGain()[2] }}回
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
      </v-container>
    </v-window-item>

    <v-window-item value="200">
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
        <v-table class="text-center">
          <thead>
            <tr>
              <th class="text-center">Card</th>
              <th class="text-center">1st</th>
              <th class="text-center">2nd</th>
              <th class="text-center">3rd</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cards">
              <td>{{ item }}</td>
              <td>{{ calcCardDamage(item, 1) }}</td>
              <td>
                {{ calcCardDamage(item, 2) }}
              </td>
              <td>
                {{ calcCardDamage(item, 3) }}
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-container>
    </v-window-item>

    <v-window-item value="201">
      <v-container>
        <v-row>
          <v-col cols="6" sm="3">
            <v-select
              label="敵スター補正"
              v-model="DSR"
              :items="DSRList"
              variant="outlined"
              density="compact"
              hide-details="auto"
            ></v-select
          ></v-col>

          <v-col cols="6" sm="3">
            <v-select
              label="敵NP補正"
              v-model="DTDR"
              :items="DTDRList"
              variant="outlined"
              density="compact"
              hide-details="auto"
            ></v-select
          ></v-col>
          <v-col cols="5" sm="2">
            <v-select
              label="1stCard"
              v-model="firstCard"
              :items="firstCardList"
              variant="outlined"
              density="compact"
              hide-details="auto"
            ></v-select
          ></v-col>
          <v-col cols="3" sm="2">
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
          <v-col cols="3" sm="2">
            <v-tooltip location="top">
              <template #activator="{ props }">
                <v-checkbox
                  v-bind="props"
                  v-model="isSpecialEnemy"
                  false-value="0"
                  true-value="1"
                  color="primary"
                  hide-details="auto"
                >
                  <template v-slot:label
                    ><span v-bind="props" class="text-no-wrap"
                      >特殊エネミー</span
                    ></template
                  >
                </v-checkbox>
              </template>
              <span
                >敵NP補正が高い一部のエネ三ー（スケルトン、竜牙兵、ゾンビ、海賊ゾンビ、ゴースト系、七人御佐姫、スケアクロウ）</span
              >
            </v-tooltip></v-col
          >
        </v-row>
        <v-table class="text-center">
          <thead>
            <tr>
              <th class="text-center">Card</th>
              <th class="text-center">1st</th>
              <th class="text-center">2nd</th>
              <th class="text-center">3rd</th>
            </tr>
          </thead>
          <tbody class="justify-center">
            <tr v-for="item in cards">
              <td>
                <v-icon :color="item" icon="mdi-battery-charging"></v-icon
                ><v-divider class="border-opacity-50"></v-divider>
                <v-icon :color="item" icon="mdi-star-four-points"></v-icon>
              </td>
              <td>
                {{ calcCardNPGain(item, 1) }}%
                <v-divider class="border-opacity-50"></v-divider>
                {{ calcCardStarGain(item, 1)[0] }}個＆
                {{ calcCardStarGain(item, 1)[1] }}%
                {{ calcCardStarGain(item, 1)[2] }}回
              </td>
              <td>
                {{ calcCardNPGain(item, 2) }}%
                <v-divider class="border-opacity-50"></v-divider>
                {{ calcCardStarGain(item, 2)[0] }}個＆
                {{ calcCardStarGain(item, 2)[1] }}%
                {{ calcCardStarGain(item, 2)[2] }}回
              </td>
              <td>
                {{ calcCardNPGain(item, 3) }}%
                <v-divider class="border-opacity-50"></v-divider>
                {{ calcCardStarGain(item, 3)[0] }}個＆
                {{ calcCardStarGain(item, 3)[1] }}%
                {{ calcCardStarGain(item, 3)[2] }}回
              </td>
            </tr>
            <tr>
              <td>OK</td>
              <td>Hit</td>
              <td>Hit</td>
              <td>Hit</td>
            </tr>
          </tbody>
        </v-table>
      </v-container>
    </v-window-item>

    <v-window-item value="999">
      <v-container>
        <v-row>
          サーヴァント
          {{ attacker }}
          <v-divider></v-divider>
          追加鯖データ
          {{ additionalData }}
          <v-divider></v-divider>
          ATK
          {{ ATKValue }}
          <v-divider></v-divider>
          バフ情報
          {{ skillvalue }}
          <v-divider></v-divider>
          宝具性能
          {{ noblevalue }}
          <v-divider></v-divider>
        </v-row>
      </v-container>
    </v-window-item>
  </v-window>
</template>

<style scoped>
.damage {
  text-shadow: 1px 1px 0px #1f5185;
}
</style>
