<script setup>
import { ref, watch, onMounted } from "vue";
import nobleSelect from "./NobleSelect.vue";

//非同期データフェッチ もっといい方法があるはず
let asyncData = [];
const jsonUrl =
  "https://raw.githubusercontent.com/445MMJ/calc-data/main/nobleList.json"; // JSONファイルのURL
async function asyncGetData() {
  const data = await fetch(jsonUrl);
  const dataJson = await data.json();
  return dataJson;
}
onMounted(async () => {
  asyncData = await asyncGetData();
});

// propsとemitsの定義
const props = defineProps(["items"]);
const emits = defineEmits(["nobleValue"]);

// propsの変更を監視
const servantIndex = ref(null);
const nobleData = ref([{ Detail: "ここに宝具の詳細" }]);
const nobleName = ref("サーヴァント未選択");
const isActiveList = ref(Array(20).fill(true));
watch(props, (newValue) => {
  servantIndex.value = "s" + newValue.items;
  const objectList = asyncData.filter(
    (obj) => obj.Owners === servantIndex.value
  );
  // 宝具強化等で1つの鯖が複数の宝具データを持つので。EntityIDが最大のオブジェクトを取得する
  // 本当に複数宝具を持っているやつのことは知らない。エッジケースは考えない。
  const maxId = Math.max(...objectList.map((obj) => obj.EntityID));
  nobleData.value = objectList.filter((obj) => obj.EntityID == maxId);
  nobleName.value = nobleData.value[0].SkillName;
  // isActiveListの初期化
  for (let i = 0; i < isActiveList.value.length; i++) {
    isActiveList.value[i] = true;
  }
  bufftype();
});

// 宝具レベルの変更を監視
const nobleLevel = ref("Value0");
function handleNobleLevel(item) {
  nobleLevel.value = `Value` + (item - 1);
  bufftype();
}

// 宝具OCの変更を監視
const nobleOC = ref("Value0");
function handleNobleOC(item) {
  nobleOC.value = `Value` + (item - 1);
  bufftype();
}

// 文字列を数値に変換したりしなかったり関数
function parseFloatValue(item) {
  const value = parseFloat(item);
  if (isNaN(value)) {
    return item;
  } else {
    return value;
  }
}

// 宝具の効果を計算する関数
function bufftype() {
  const nobleObjList = []; // 宝具情報のの配列を初期化
  const nobleValue = {}; // 最終的な効果の配列を初期化
  //生データからOCやLvを反映した実バフ値を取り出し、オブジェクトに変換
  nobleData.value.forEach((item) => {
    const obj = {}; // 各ケースごとに新しいオブジェクトを作成
    switch (item.Grow) {
      case "Lv":
        obj[item.MainText] = parseFloatValue(item[nobleLevel.value]);
        nobleObjList.push(obj);
        break;
      case "OC":
        obj[item.MainText] = parseFloatValue(item[nobleOC.value]);
        nobleObjList.push(obj);
        break;
      default:
        obj[item.MainText] = parseFloatValue(item["Value3"]);
        nobleObjList.push(obj);
        break;
    }
  });
  for (var i = 0; i < nobleObjList.length; i++) {
    if (isActiveList.value[i] == false) {
      continue;
    }
    for (var key in nobleObjList[i]) {
      if (nobleValue[key] == undefined) {
        nobleValue[key] = nobleObjList[i][key];
      } else {
        nobleValue[key] += nobleObjList[i][key];
      }
    }
  }
  //console.log("Noble処理前", nobleObjList);
  //console.log("Noble処理後", nobleValue);
  emits("nobleValue", nobleValue);
}
</script>

<!-- テンプレートの定義 -->
<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6" align-self="center">
        <v-list density="compact">
          <v-list-group value="Users">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props"
                ><span v-html="nobleName"></span
              ></v-list-item>
            </template>
            <v-list-item v-for="(item, index) in nobleData" :key="item"
              ><v-layout>
                <v-checkbox-btn
                  v-model="isActiveList[index]"
                  @change="bufftype"
                  hide-details
                ></v-checkbox-btn>
                {{ item.Detail }}
                <span v-if="item.Grow == 'Lv'">{{ item[nobleLevel] }}</span>
                <span v-if="item.Grow == 'OC'">{{
                  item[nobleOC]
                }}</span></v-layout
              ></v-list-item
            >
          </v-list-group>
        </v-list>
      </v-col>
      <v-col cols="6" sm="3">
        <nobleSelect labelText="Lv" @selectednumber="handleNobleLevel"
      /></v-col>
      <v-col cols="6" sm="3">
        <nobleSelect labelText="OC" @selectednumber="handleNobleOC"
      /></v-col>
    </v-row>
    <v-row> </v-row>
  </v-container>
</template>
