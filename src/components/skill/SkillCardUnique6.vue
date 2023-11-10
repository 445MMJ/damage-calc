<script setup>
import { ref, watch, onMounted, computed } from "vue";

// 非同期データフェッチ
let asyncData = [];
const jsonUrl =
  "https://raw.githubusercontent.com/445MMJ/calc-data/main/skillListDuplicated.json"; // JSONファイルのURL
async function asyncGetData() {
  const data = await fetch(jsonUrl);
  const dataJson = await data.json();
  return dataJson;
}
onMounted(async () => {
  asyncData = await asyncGetData();
  handleSkillName(props.name, props.sNumber);
  bufftype();
});

// propsとemitsの定義
const props = defineProps({
  name: { default: "プレースホルダー" },
  sNumber: { default: 0 },
});
const emits = defineEmits(["skillValue", "skillValueSelf", "skillValueOther"]);

// propsの変更を監視
const skillData = ref(["空だよ"]);
const isActiveList = ref(Array(20).fill(true));
const isChecked = ref(true);
const isShow = ref(true);
watch(props, (newValue) => {
  handleSkillName(newValue.name, newValue.sNumber);
  bufftype();
});

// スキルレベルの変更を監視
const selectedNumber = ref(10);
const skillLevel = computed(() => {
  return `Value` + (selectedNumber.value - 1);
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

  //まずisActiveListを見て、チェックされているものだけを抽出
  const activeList = skillData.value[0].filter((item, index) => {
    return isActiveList.value[index];
  });

  //次に、チェックされているものの中から、効果範囲ごとに分ける
  activeList.forEach((item) => {
    const obj = {}; // 各ケースごとに新しいオブジェクトを作成
    switch (item.Target) {
      case "味方単体":
        obj[item.MainText] = parseFloatValue(item[skillLevel.value]);
        skillObjList.push(obj);
        break;
      case "味方全体":
        obj[item.MainText] = parseFloatValue(item[skillLevel.value]);
        skillObjList.push(obj);
        break;
      case "敵単体":
        obj[item.MainText] = -1 * parseFloatValue(item[skillLevel.value]);
        skillObjList.push(obj);
        break;
      case "敵全体":
        obj[item.MainText] = -1 * parseFloatValue(item[skillLevel.value]);
        skillObjList.push(obj);
        break;
      case "自身":
        obj[item.MainText] = parseFloatValue(item[skillLevel.value]);
        skillObjListSelf.push(obj);
        break;
      case "自身を除く味方全体":
        obj[item.MainText] = parseFloatValue(item[skillLevel.value]);
        skillObjListOther.push(obj);
        break;
      default:
        break;
    }
  });

  for (var i = 0; i < skillObjList.length; i++) {
    for (let key of Object.keys(skillObjList[i])) {
      if (skillValue[key] == undefined) {
        skillValue[key] = skillObjList[i][key];
      } else {
        skillValue[key] += skillObjList[i][key];
      }
    }
  }

  for (var i = 0; i < skillObjListSelf.length; i++) {
    for (let key of Object.keys(skillObjListSelf[i])) {
      if (skillValueSelf[key] == undefined) {
        skillValueSelf[key] = skillObjListSelf[i][key];
      } else {
        skillValueSelf[key] += skillObjListSelf[i][key];
      }
    }
  }

  for (var i = 0; i < skillObjListOther.length; i++) {
    for (let key of Object.keys(skillObjListOther[i])) {
      if (skillValueOther[key] == undefined) {
        skillValueOther[key] = skillObjListOther[i][key];
      } else {
        skillValueOther[key] += skillObjListOther[i][key];
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

const placeFolder = [
  {
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

function handleSkillName(item, servantNumber) {
  let numberString = "s" + servantNumber;
  if (asyncData.length === undefined) {
    skillData.value.splice(0);
  } else {
    skillData.value.splice(0);
    let filteredData = asyncData.filter((obj) => {
      return obj.SkillName === item;
    });
    filteredData = filteredData.filter((obj) => {
      return obj.Owners === numberString;
    });
    skillData.value.push(filteredData);
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

function toggleItem(index) {
  isActiveList.value[index] = !isActiveList.value[index];
  bufftype();
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
    ></v-select>{{  skillData[0] }}
    <v-list density="compact" class="pa-0">
      <v-list-item
        density="compact"
        v-for="(item, index) in skillData[0]"
        :key="index"
        @click="toggleItem(index)"
        class="pa-0"
      >
        <v-layout justify-center align-center>
          <div>
            <v-checkbox v-model="isActiveList[index]" hide-details />
          </div>
          <div
            style="
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
            "
          >
            {{ item.Target }}/{{ item.MainText }}{{ item.PostText }}/{{
              item[skillLevel]
            }}
          </div>
        </v-layout>
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
