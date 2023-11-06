template
<script setup>
import { ref, watch, onMounted } from "vue";

// 非同期データフェッチ
let asyncData = [];
const jsonUrl =
  "https://raw.githubusercontent.com/445MMJ/calc-data/main/classSkillList.json"; // JSONファイルのURL
async function asyncGetData() {
  const data = await fetch(jsonUrl);
  const dataJson = await data.json();
  const dataMap = new Map(Object.entries(dataJson));
  return dataMap;
}

onMounted(async () => {
  asyncData = await asyncGetData();
  handleSkillName(props.name);
  bufftype();
});

// propsとemitsの定義
const props = defineProps({ name: { default: "プレースホルダー" } });
const emits = defineEmits(["skillValue", "skillValueSelf", "skillValueOther"]);

// propsの変更を監視
const skillData = ref(["空だよ"]);
const isChecked = ref(true);
watch(props, (newValue) => {
  handleSkillName(newValue.name);
  bufftype();
});

// 宝具の効果値を合計する関数
//スキル効果は範囲が"味方単体or全体効果"/"自身"/"自身以外"で分けて管理
function bufftype() {
  const skillObjList = [];
  const skillObjListSelf = [];
  const skillObjListOther = [];
  let skillValue = {};
  let skillValueSelf = {};
  let skillValueOther = {};

  //次に、チェックされているものの中から、効果範囲ごとに分ける
  skillData.value[0].forEach((item) => {
    const obj = {}; // 各ケースごとに新しいオブジェクトを作成
    obj[item.MainText] = parseFloatValue(item["Value0"]);
    skillObjListSelf.push(obj);
  });

  for (var i = 0; i < skillObjListSelf.length; i++) {
    for (let key of Object.keys(skillObjListSelf[i])) {
      if (skillValueSelf[key] == undefined) {
        skillValueSelf[key] = skillObjListSelf[i][key];
      } else {
        skillValueSelf[key] += skillObjListSelf[i][key];
      }
    }
  }
  //根幹がチェック状態であれば、そのまま送信。非チェック状態であれば初期値に戻して送信
  if (isChecked.value) {
    emits("skillValue", skillValue);
    emits("skillValueSelf", skillValueSelf);
    emits("skillValueOther", skillValueOther);
  } else {
    const zero = { "-": "-" };
    skillValue = { ...zero };
    skillValueSelf = { ...zero };
    skillValueOther = { ...zero };
    emits("skillValue", skillValue);
    emits("skillValueSelf", skillValueSelf);
    emits("skillValueOther", skillValueOther);
  }
}

const placeFolder = [
  {
    SkillName: "プレースホルダー EX",
    CT: "7",
    Target: "味方単体",
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
  },
]; // プレースホルダー

// 文字列を数値に変換したりしなかったり関数
function parseFloatValue(item) {
  const value = parseFloat(item);
  if (!isNaN(value)) {
    return value;
  } else {
    return item;
  }
}

function handleSkillName(item) {
  if (asyncData.size === undefined) {
    skillData.value.splice(0);
  } else {
    skillData.value.splice(0);
    let stat = asyncData.get(item);
    skillData.value.push(stat);
    if (item === "プレースホルダー" || item === "--") {
      skillData.value.splice(0);
      skillData.value.push(placeFolder);
    }
  }
  isChecked.value = true;
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
    <v-list density="compact" class="pa-0">
      <v-list-item
        v-for="(item, index) in skillData[0]"
        :key="index"
        density="compact"
        class="pa-0"
      >
        <p>
          {{ item.Target }}/{{ item.MainText }}{{ item.PostText
          }}/{{ item["Value0"] }}
        </p>
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
