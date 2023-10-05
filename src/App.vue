<!-- コンポーネントの定義 -->
<script>
import myHeader from "./components/MyHeader.vue";
import calc from "./components/calc/Calc.vue";
import servantContainer from "./components/servant/ServantContainer.vue";
import attacker from "./components/servant/Attacker.vue";
import skillsContainer from "./components/skill/SkillsContainer.vue";
import nobleContainer from "./components/noble/NobleContainer.vue";
import userInput from "./components/UserInput.vue";

import { sumObjectValue } from "./components/TotalSkillValue.js";

export default {
  components: {
    myHeader,
    servantContainer,
    skillsContainer,
    nobleContainer,
    calc,
    attacker,
    userInput,
  },
  data() {
    return {
      selectedServant: [0, 1, 2, 3, 4, 5],
      //0-3skillValue,6-9skillValue(Other),12手動入力
      activeSkillValue: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      nobleValue: {},
      totalSkillValue: {},
      userInputValue: {},
      fouValue: 1000,
      CEAtk: 0,
      isShowModal: [false, false, false, false],
      servantInit: {
        "No.": "1",
        Name: "DATA LOST",
        Class: "盾",
        Attri: "地",
        Grow: "平均",
        min_H: "1854",
        min_A: "1261",
        ExpType: "3",
        max_H: "10302",
        max_A: "6791",
        Noble: "補助Ａ",
        "保有スキル 1": "プレースホルダー",
        "保有スキル 2": "プレースホルダー",
        "保有スキル 3": "プレースホルダー",
      },
      tab: null,
    };
  },
  created() {
    this.selectedServant[0] = { ...this.servantInit };
  },
  methods: {
    // servantコンテナから選ばれた鯖を受け取る
    // 受け取った鯖の盛ってるスキル名を探してきて送る
    updataselectedServant(item, index) {
      this.closeModal();
      this.selectedServant[index] = item;
    },
    updatedSkillValue(item, index) {
      this.activeSkillValue[index] = item;
      this.totalSkillValue = sumObjectValue(this.activeSkillValue);
    },
    updatedNobleValue(item) {
      let list = [];
      list.push(item);
      this.nobleValue = sumObjectValue(list);
    },
    updatedFouValue(item) {
      this.fouValue = item;
    },
    updatedCEAtk(item) {
      this.CEAtk = item;
    },
    updateUserInput(item) {
      this.userInputValue = item;
      this.activeSkillValue[12] = item;
      this.totalSkillValue = sumObjectValue(this.activeSkillValue);
    },
    showModal(buttonIndex) {
      this.isShowModal[buttonIndex] = true;
    },
    closeModal() {
      this.isShowModal = [false, false, false, false];
    },
    deleteServant(index) {
      this.selectedServant[index] = { ...this.servantInit };
    },
  },
};
</script>

<!-- テンプレートの定義 -->
<template>
  <v-app>
    <myHeader />
    <v-main>
      <v-sheet :elevation="10" border="true" class="pa-2 ma-6">
        <calc
          :attacker="selectedServant[0]"
          :skillvalue="totalSkillValue"
          :noblevalue="nobleValue"
          :fouValue="fouValue"
          :CEAtk="CEAtk"
        />
      </v-sheet>

      <v-sheet :elevation="10" border="true" class="pa-2 ma-6">
        <v-container class="">
          <v-row class="justify-start">
            <v-col
              cols="12"
              sm="4"
              class="d-inline-block text-truncate"
              align-self="center"
              >アタッカー:{{ selectedServant[0]["Name"] }}</v-col
            >
            <v-col sm="1" class="mx-1"
              ><v-btn @click="showModal(0)">変更</v-btn></v-col
            >
            <v-col sm="1" class="mx-1">
              <v-btn @click="deleteServant(0)">削除</v-btn></v-col
            >
          </v-row>
        </v-container>
        <attacker
          :attcker="selectedServant[0]"
          @CEAtk="updatedCEAtk($event)"
          @fouValue="updatedFouValue($event)"
        />
        <nobleContainer
          :items="selectedServant[0]['No.']"
          @skillValue="updatedNobleValue($event)"
        />
        <skillsContainer
          :items="selectedServant[0]"
          @skillValue="updatedSkillValue($event, 0)"
          @skillValueSelf="updatedSkillValue($event, 6)"
        />
      </v-sheet>

      <v-sheet :elevation="10" border class="pa-2 ma-6">
        <v-container class="">
          <v-row class="justify-start">
            <v-col
              cols="12"
              md="4"
              class="d-inline-block text-truncate"
              align-self="center"
              >サポ1:{{ selectedServant[1]["Name"] }}</v-col
            >
            <v-col md="1" class="mx-1"
              ><v-btn @click="showModal(1)">変更</v-btn></v-col
            >
            <v-col md="1" class="mx-1">
              <v-btn @click="deleteServant(1)">削除</v-btn></v-col
            >
          </v-row>
        </v-container>

        <skillsContainer
          :items="selectedServant[1]"
          @skillValue="updatedSkillValue($event, 1)"
          @skillValueOther="updatedSkillValue($event, 7)"
        />
      </v-sheet>

      <v-sheet :elevation="10" border class="pa-2 ma-6">
        <v-container class="">
          <v-row class="justify-start">
            <v-col
              cols="12"
              md="4"
              class="d-inline-block text-truncate"
              align-self="center"
              >サポ2:{{ selectedServant[2]["Name"] }}</v-col
            >
            <v-col md="1" class="mx-1"
              ><v-btn @click="showModal(2)">変更</v-btn></v-col
            >
            <v-col md="1" class="mx-1">
              <v-btn @click="deleteServant(2)">削除</v-btn></v-col
            >
          </v-row>
        </v-container>

        <skillsContainer
          :items="selectedServant[2]"
          @skillValue="updatedSkillValue($event, 2)"
          @skillValueOther="updatedSkillValue($event, 8)"
        />
      </v-sheet>

      <v-sheet :elevation="10" border class="pa-2 ma-6">
        <v-container class="">
          <v-row class="justify-start">
            <v-col
              cols="12"
              md="4"
              class="d-inline-block text-truncate"
              align-self="center"
              >サポ3:{{ selectedServant[3]["Name"] }}</v-col
            >
            <v-col md="1" class="mx-1"
              ><v-btn @click="showModal(3)">変更</v-btn></v-col
            >
            <v-col md="1" class="mx-1">
              <v-btn @click="deleteServant(3)">削除</v-btn></v-col
            >
          </v-row>
        </v-container>

        <skillsContainer
          :items="selectedServant[3]"
          @skillValue="updatedSkillValue($event, 3)"
          @skillValueOther="updatedSkillValue($event, 9)"
        />
      </v-sheet>

      <v-sheet :elevation="10" border="true" class="pa-2 ma-6">
        <userInput @updateUserInput="updateUserInput($event)" />
      </v-sheet>

      <v-dialog v-model="isShowModal[0]" width="600">
        <servantContainer
          @selectedServant="updataselectedServant($event, 0)"
          class="modal-container"
        />
      </v-dialog>
      <v-dialog v-model="isShowModal[1]" width="600">
        <servantContainer
          @selectedServant="updataselectedServant($event, 1)"
          class="modal-container"
        />
      </v-dialog>
      <v-dialog v-model="isShowModal[2]" width="600">
        <servantContainer
          @selectedServant="updataselectedServant($event, 2)"
          class="modal-container"
        />
      </v-dialog>
      <v-dialog v-model="isShowModal[3]" width="600">
        <servantContainer
          @selectedServant="updataselectedServant($event, 3)"
          class="modal-container"
        />
      </v-dialog>
    </v-main>
  </v-app>
</template>

<style></style>
