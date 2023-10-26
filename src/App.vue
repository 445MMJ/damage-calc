<script>
import { defineAsyncComponent } from "vue";
import myHeader from "./components/MyHeader.vue";
import myFooter from "./components/MyFooter.vue";
const calc = defineAsyncComponent(() => import("./components/calc/Calc.vue"));
const servantContainer = defineAsyncComponent(() =>
  import("./components/servant/ServantContainer.vue")
);
const attacker = defineAsyncComponent(() =>
  import("./components/servant/attacker/Attacker.vue")
);
const skillsContainer = defineAsyncComponent(() =>
  import("./components/skill/SkillsContainer.vue")
);
const classSkillsContainer = defineAsyncComponent(() =>
  import("./components/classSkill/ClassskillsContainer.vue")
);
const nobleContainer = defineAsyncComponent(() =>
  import("./components/noble/NobleContainer.vue")
);
const userInput = defineAsyncComponent(() =>
  import("./components/UserInput.vue")
);
import { sumObjectValue } from "./components/TotalSkillValue.js";
import { mdiPencil, mdiMenuDown } from "@mdi/js";

export default {
  components: {
    myHeader,
    myFooter,
    servantContainer,
    skillsContainer,
    classSkillsContainer,
    nobleContainer,
    calc,
    attacker,
    userInput,
  },
  data() {
    return {
      mdiPencil,
      mdiMenuDown,
      selectedServant: [0, 1, 2, 3, 4, 5],
      //skillValueは味方単体/全体
      //Selfは自分自身
      //Otherは自分以外の味方単体/全体
      //0-5 atk/sup のskillValue
      //6-11 atk/sup のskillValue(Self/Other)
      //12-13 classSkillのvale,self
      //14手動入力
      activeSkillValue: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 16],
      nobleValue: {},
      totalSkillValue: {},
      userInputValue: {},
      ATKValue: 0,
      fouValue: 1000,
      CEAtk: 0,
      isShowModal: [false, false, false, false, false],
      servantInit: {
        "No.": "1",
        Name: "DATA LOST",
        Rare: "5",
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
      isLoadSkillDetail: [false, false, false, false, false],
      isShowSkillDetail: [false, false, false, false, false],
      isManiac: false,
    };
  },
  created() {
    this.selectedServant[0] = { ...this.servantInit };
    let arr = localStorage.getItem("isShowSkillDetail");
    let arr2 = JSON.parse(arr);
    if (arr2 != null) {
      this.isLoadSkillDetail = arr2;
      this.isShowSkillDetail = arr2;
    }
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
    updatedATKValue(item) {
      this.ATKValue = item;
    },
    updateUserInput(item) {
      console.log(item);
      this.userInputValue = item;
      this.activeSkillValue[14] = item;
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
    saveLocalStrage() {
      localStorage.setItem("isAdvanced", isAdvanced);
    },
    invertSkillDetail(item) {
      const Booleanitem = this.isShowSkillDetail[item];
      this.isShowSkillDetail[item] = !Booleanitem;
      localStorage.setItem(
        "isShowSkillDetail",
        JSON.stringify(this.isShowSkillDetail)
      );
    },
    showSkillDetail() {
      this.isShowSkillDetail = [true, true, true, true, true];
      localStorage.setItem(
        "isShowSkillDetail",
        JSON.stringify(this.isShowSkillDetail)
      );
    },
    hideSkillDetail() {
      this.isShowSkillDetail = [false, false, false, false, false];
      localStorage.setItem(
        "isShowSkillDetail",
        JSON.stringify(this.isShowSkillDetail)
      );
    },
  },
};
</script>

<template>
  <v-app>
    <myHeader />

    <v-main class="bg">
      <v-sheet :elevation="10" border="true" class="ma-6" id="calc">
        <calc
          :attacker="selectedServant[0]"
          :skillvalue="totalSkillValue"
          :noblevalue="nobleValue"
          :ATKValue="ATKValue"
          :isManiac="isManiac"
        />
      </v-sheet>
      <v-sheet :elevation="10" border="true" class="ma-6" id="servant0">
        <v-container @click="invertSkillDetail(0)">
          <v-row justify="start" align="center">
            <v-col
              cols="5"
              md="8"
              class="d-inline-block text-truncate"
              align-self="center"
              >{{ selectedServant[0]["Name"] }}</v-col
            ><v-spacer></v-spacer>
            <v-col cols="2" md="1" class="mx-1"
              ><v-btn variant="outlined" @click.stop="showModal(0)"
                >変更</v-btn
              ></v-col
            >
            <v-col cols="2" md="1" class="mx-1">
              <v-btn variant="outlined" @click.stop="deleteServant(0)"
                >削除</v-btn
              ></v-col
            ><v-col cols="2" md="1" class="mx-1"
              ><v-icon
                size="x-large"
                :icon="this.isShowSkillDetail[0] ? mdiPencil : mdiMenuDown"
              ></v-icon
            ></v-col>
          </v-row>
        </v-container>
        <v-divider></v-divider>
        <v-expand-transition>
          <attacker
            :v-show="isShowSkillDetail[0]"
            :attacker="selectedServant[0]"
            @ATK="updatedATKValue($event)"
        /></v-expand-transition>
        <nobleContainer
          :items="selectedServant[0]['No.']"
          @skillValue="updatedNobleValue($event)"
        /><v-expand-transition>
          <skillsContainer
            v-show="isShowSkillDetail[0]"
            :items="selectedServant[0]"
            @skillValue="updatedSkillValue($event, 0)"
            @skillValueSelf="updatedSkillValue($event, 6)"
        /></v-expand-transition>
      </v-sheet>

      <v-sheet :elevation="10" border class="ma-6" id="servant1">
        <v-container @click="invertSkillDetail(1)">
          <v-row no-gutters class="justify-start">
            <v-col
              cols="5"
              md="8"
              class="d-inline-block text-truncate"
              align-self="center"
              >サポ1:{{ selectedServant[1]["Name"] }}</v-col
            ><v-spacer></v-spacer>
            <v-col cols="2" md="1" class="mx-1"
              ><v-btn variant="outlined" @click.stop="showModal(1)"
                >変更</v-btn
              ></v-col
            >
            <v-col cols="2" md="1" class="mx-1">
              <v-btn variant="outlined" @click.stop="deleteServant(1)"
                >削除</v-btn
              ></v-col
            ><v-col cols="2" md="1" class="mx-1"
              ><v-icon
                size="x-large"
                :icon="this.isShowSkillDetail[1] ? mdiPencil : mdiMenuDown"
              ></v-icon
            ></v-col>
          </v-row>
        </v-container>
        <v-divider></v-divider>
        <v-expand-transition>
          <skillsContainer
            v-show="isShowSkillDetail[1]"
            :items="selectedServant[1]"
            @skillValue="updatedSkillValue($event, 1)"
            @skillValueOther="updatedSkillValue($event, 7)"
          />
        </v-expand-transition>
      </v-sheet>

      <v-sheet :elevation="10" border class="ma-6" id="servant2">
        <v-container @click="invertSkillDetail(2)">
          <v-row no-gutters class="justify-start">
            <v-col
              cols="5"
              md="8"
              class="d-inline-block text-truncate"
              align-self="center"
              >サポ2:{{ selectedServant[2]["Name"] }}</v-col
            ><v-spacer></v-spacer>
            <v-col cols="2" md="1" class="mx-1"
              ><v-btn variant="outlined" @click.stop="showModal(2)"
                >変更</v-btn
              ></v-col
            >
            <v-col cols="2" md="1" class="mx-1">
              <v-btn variant="outlined" @click.stop="deleteServant(2)"
                >削除</v-btn
              ></v-col
            ><v-col cols="2" md="1" class="mx-1"
              ><v-icon
                size="x-large"
                :icon="this.isShowSkillDetail[2] ? mdiPencil : mdiMenuDown"
              ></v-icon
            ></v-col>
          </v-row>
        </v-container>
        <v-divider></v-divider>
        <v-expand-transition>
          <skillsContainer
            v-show="isShowSkillDetail[2]"
            :items="selectedServant[2]"
            @skillValue="updatedSkillValue($event, 2)"
            @skillValueOther="updatedSkillValue($event, 8)"
          />
        </v-expand-transition>
      </v-sheet>

      <v-sheet :elevation="10" border class="ma-6" id="servant3">
        <v-container @click="invertSkillDetail(3)">
          <v-row no-gutters class="justify-start">
            <v-col
              cols="5"
              md="8"
              class="d-inline-block text-truncate"
              align-self="center"
              >サポ3:{{ selectedServant[3]["Name"] }}</v-col
            ><v-spacer></v-spacer>
            <v-col cols="2" md="1" class="mx-1"
              ><v-btn variant="outlined" @click.stop="showModal(3)"
                >変更</v-btn
              ></v-col
            >
            <v-col cols="2" md="1" class="mx-1">
              <v-btn variant="outlined" @click.stop="deleteServant(3)"
                >削除</v-btn
              ></v-col
            ><v-col cols="2" md="1" class="mx-1"
              ><v-icon
                size="x-large"
                :icon="this.isShowSkillDetail[3] ? mdiPencil : mdiMenuDown"
              ></v-icon
            ></v-col>
          </v-row>
        </v-container>
        <v-divider></v-divider>
        <v-expand-transition>
          <skillsContainer
            v-show="isShowSkillDetail[3]"
            :items="selectedServant[3]"
            @skillValue="updatedSkillValue($event, 3)"
            @skillValueOther="updatedSkillValue($event, 9)"
          />
        </v-expand-transition>
      </v-sheet>

      <v-sheet :elevation="10" border class="ma-6" id="self">
        <v-container @click="invertSkillDetail(4)">
          <v-row no-gutters class="justify-start">
            <v-col
              cols="5"
              md="8"
              class="d-inline-block text-truncate"
              align-self="center"
              >手動バフ入力</v-col
            ><v-spacer></v-spacer><v-col cols="2" md="1" class="mx-1"></v-col
            ><v-col cols="2" md="1" class="mx-1">
              <v-btn variant="outlined" @click.stop="deleteServant(3)"
                >削除</v-btn
              ></v-col
            ><v-spacer></v-spacer
            ><v-col cols="2" md="1" class="mx-1"
              ><v-icon
                size="x-large"
                :icon="this.isShowSkillDetail[4] ? mdiPencil : mdiMenuDown"
              ></v-icon></v-col></v-row
        ></v-container>
        <v-divider></v-divider>
        <v-expand-transition>
          <userInput
            v-show="isShowSkillDetail[4]"
            @updateUserInput="updateUserInput($event)"
          />
        </v-expand-transition>
      </v-sheet>

      <v-sheet :elevation="10" border class="ma-6">
        スキル欄開けたり閉めたり
        <v-btn @click.stop="showSkillDetail()">全開</v-btn>
        <v-btn @click.stop="hideSkillDetail()">全閉</v-btn
        ><v-switch
          color="primary"
          v-model="isManiac"
          label="詳細モード"
        ></v-switch>
        <classSkillsContainer
          v-show="isManiac"
          :items="selectedServant[0]"
          @skillValue="updatedSkillValue($event, 12)"
          @skillValueSelf="updatedSkillValue($event, 13)"
        />
      </v-sheet>

      <!-- モーダルウィンドウ -->
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
    <myFooter />
  </v-app>
</template>

<style>
.bg {
  background-image: url("bg.gif");
  background-repeat: repeat;
  /* 他の背景スタイルを設定する場合はここに追加します */
}
</style>
