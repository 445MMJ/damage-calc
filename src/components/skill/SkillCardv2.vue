<script setup>
import { ref, watch, onMounted, computed, reactive } from "vue";

// 非同期データフェッチ
let asyncData = [];
const jsonUrl =
  "https://gist.githubusercontent.com/445MMJ/b4887f5b82b28f98b36608a131962fdb/raw/5f7f69693c0990739154ebdd2bd086905af27816/skillList.json"; // JSONファイルのURL
async function asyncGetData() {
  const data = await fetch(jsonUrl);
  const dataJson = await data.json();
  const dataMap = new Map(Object.entries(dataJson));
  return dataMap;
}
onMounted(async () => {
  asyncData = await asyncGetData();
  console.log("マウンテッド", props.name);
  handleSkillName(props.name);
  bufftype();
});

// propsとemitsの定義
const props = defineProps({ name: { default: "プレースホルダー" } });
const emits = defineEmits(["skillValue", "skillValueSelf", "skillValueOther"]);

// propsの変更を監視
const skillData = ref([]);
const isActiveList = ref(Array(20).fill(true));
const isChecked = ref(true);
const isShow = ref(true);
watch(props, (newValue) => {
  handleSkillName(newValue.name);
  bufftype();
});

// スキルレベルの変更を監視
const selectedNumber = ref(10);
const skillLevel = computed(() => {
  return `Value` + (selectedNumber.value - 1);
});

// 宝具の効果値を合計する関数
//スキル効果は範囲が"味方単体or全体効果"/"自身"/"自身以外"で分けて管理
const skillValue = ref({});
const skillValueSelf = ref({});
const skillValueOther = ref({});
function bufftype() {
  console.log("フィルタ前", skillData.value);
  //まずisActiveListを見て、チェックされているものだけを抽出
  const activeList = skillData.value.filter((item, index) => {
    return isActiveList.value[index];
  });
  console.log("フィルタ後", activeList);

  //チェック状態であれば、そのまま送信。非チェック状態であれば初期値に戻して送信
  if (isChecked) {
    emits("skillValue", skillValue);
    emits("skillValueSelf", skillValueSelf);
    emits("skillValueOther", skillValueOther);
  } else {
    skillValue = { ...init };
    skillValueSelf = { ...init };
    skillValueOther = { ...init };
    emits("skillValue", skillValue);
    emits("skillValueSelf", skillValueSelf);
    emits("skillValueOther", skillValueOther);
  }
}

const levelNumber = [
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
]; // リストボックスの選択肢

const placeFolder = [{
  SkillName: "プレースホルダー EX",
  CT: "7",
  Target: "自身",
  Target2: "-",
  PreText: "-",
  MainText: "-",
  PostText: "-",
  Grow: "Lv",
  Value0: "20%",
  Value1: "21%",
  Value2: "22%",
  Value3: "23%",
  Value4: "24%",
  Value5: "25%",
  Value6: "26%",
  Value7: "27%",
  Value8: "28%",
  Value9: "30%",
  Detail: "-",
  EntityID: "-",
}]; // プレースホルダー

// 文字列を数値に変換したりしなかったり関数
function parseFloatValue(item) {
  const value = parseFloat(item);
  if (isNaN(value)) {
    return item;
  } else {
    return value;
  }
}

function handleSkillName(item) {
  if (asyncData.size === undefined) {
    skillData.value.splice(0);
  } else {
    console.log("データが読み込まれました", item);
    skillData.value.splice(0);
    skillData.value.push(asyncData.get(item));
    if (item === "プレースホルダー") {
      skillData.value.splice(0);
      skillData.value.push(placeFolder);
    }
  }
  isChecked.value = true;
  isShow.value = true;
  if (item === "プレースホルダー") {
    isShow.value = false;
  }
}
</script>

<template>
  <div>
    <v-checkbox
      input-value="true"
      v-model="isChecked"
      @update:modelValue="bufftype"
      color="primary"
      hide-details="auto"
    >
      <template v-slot:label
        ><span> {{ name }} </span></template
      >
    </v-checkbox>

    <v-select
      v-model="selectedNumber"
      @update:modelValue="bufftype"
      :items="levelNumber"
      label="Lv"
      variant="outlined"
      density="compact"
    ></v-select>{{ skillData }}
    <v-list density="compact">
      <v-list-item v-for="(item, index) in skillData[0]" :key="index">
        {{ item.Target }}/{{ item.MainText }}{{ item.PostText
        }}{{ item[skillLevel] }}
      </v-list-item></v-list
    >
  </div>
</template>

<style scoped>
span {
  color: rgba(var(--v-theme-text), 1) !important;
  font-weight: 700;
}
</style>
