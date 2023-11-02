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

const props = defineProps(["items"]);
const emits = defineEmits(["skillValue"]);

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
  bufftype();
});

const servantIndex = ref(null);
const nobleData = ref([{ Detail: "ここに宝具の詳細" }]);
const nobleName = ref("サーヴァント未選択");
const nobleLevel = ref("Value0");
const nobleOC = ref("Value0");
const init = {
  宝具攻撃: 0,
  攻撃力: 0,
  Busterカード性能: 0,
  Quickカード性能: 0,
  Artsカード性能: 0,
  宝具威力: 0,
};
const nobleValue = ref(null);

function handleNobleLevel(item) {
  nobleLevel.value = `Value` + (item - 1);
  bufftype();
}
function handleNobleOC(item) {
  nobleOC.value = `Value` + (item - 1);
  bufftype();
}
function bufftype() {
  const result = []; // 結果の配列を初期化
  nobleData.value.forEach((item) => {
    const obj = {}; // 各ケースごとに新しいオブジェクトを作成
    switch (item.Grow) {
      case "Lv":
        obj[item.MainText] = item[nobleLevel.value];
        result.push(obj);
        break;
      case "OC":
        obj[item.MainText] = item[nobleOC.value];
        result.push(obj);
        break;
      default:
        obj[item.MainText] = item["Value3"];
        result.push(obj);
        break;
    }
  });
  nobleValue.value = result; // 最終的な結果を代入
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
            <v-list-item v-for="item in nobleData"
              >{{ item.Detail }}
              <span v-if="item.Grow == 'Lv'">{{ item[nobleLevel] }}</span>
              <span v-if="item.Grow == 'OC'">{{
                item[nobleOC]
              }}</span></v-list-item
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

