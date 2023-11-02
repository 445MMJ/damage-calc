<script setup>
import { ref, watch, onMounted } from "vue";

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

const items = defineProps(["items"]);
const emits = defineEmits(["skillValue"]);

watch(items, (newValue) => {
  servantIndex.value = "s" + newValue;
  const objectList = asyncData.filter(
    (obj) => obj.Owners === servantIndex.value
  );
  // 宝具強化等で1つの鯖が複数の宝具データを持つので。EntityIDが最大のオブジェクトを取得する
  // 本当に複数宝具を持っているやつのことは知らない。エッジケースは考えない。
  const maxId = Math.max(...objectList.map((obj) => obj.EntityID));
  nobleData.value = objectList.filter((obj) => obj.EntityID == maxId);
  nobleName.value = nobleData[0].SkillName;
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
  let result = [];
  let obj = {};
  nobleData.value.forEach((item) => {
    switch (item.Grow) {
      case "Lv":
        obj[item.MainText] = item[nobleLevel];
        list.push(obj);
        break;
      case "OC":
        obj[item.MainText] = item[nobleOC];
        list.push(obj);
        break;
      case "default":
        obj[item.MainText] = item["Value3"];
        list.push(obj);
        break;
    }
  });
  nobleValue.value = { ...result };
  this.$emit("skillValue", skillValue.value);
}
</script>

<!-- テンプレートの定義 -->
<template>
  <div>
    servantIndex : {{ servantIndex }}<br />
    nobleData : {{ nobleData }}<br />
    nobleName : {{ nobleName }}<br />
    nobleLevel : {{ nobleLevel }}<br />
    nobleOC : {{ nobleOC }}<br />
    nobleValue : {{ nobleValue }}<br />
  </div>
</template>
