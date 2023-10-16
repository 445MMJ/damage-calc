//各種スキルデータ、宝具データを扱うコンポーネントで使われる
export function sumSkillValue(list, level, range, OC) {
  let filteredList = [];
  let result = {};
  filteredList = list
  switch (range) {
    case "default":
      filteredList = filteredList.filter(
        (obj) => obj.Target === "味方単体" || obj.Target === "味方全体" || obj.Target === "敵単体" || obj.Target === "敵全体"
      );
      break;
    case "self":
      filteredList = filteredList.filter((obj) => obj.Target === "自身");
      break;
    case "other":
      filteredList = filteredList.filter(
        (obj) => obj.Target === "自身を除く味方全体"
      );
      break;
    case "default-Target2":
      filteredList = filteredList.filter(
        (obj) => obj.Target === "味方単体" || obj.Target === "味方全体"
      );
      filteredList = filteredList.filter((obj) => obj.Target2 === "-");
      break;
    case "self-Target2":
      filteredList = filteredList.filter((obj) => obj.Target === "自身");
      filteredList = filteredList.filter((obj) => obj.Target2 === "-");
      break;
    case "other-Target2":
      filteredList = filteredList.filter((obj) => obj.Target === "自身");
      filteredList = filteredList.filter((obj) => obj.Target2 === "-");
      break;
    case "default-preText":
      filteredList = filteredList.filter(
        (obj) => obj.Target === "味方単体" || obj.Target === "味方全体"
      );
      filteredList = filteredList.filter((obj) => obj.preText === "-");
      break;
    case "self-preText":
      filteredList = filteredList.filter((obj) => obj.Target === "自身");
      filteredList = filteredList.filter((obj) => obj.preText === "-");
      break;
    case "other-preText":
      filteredList = filteredList.filter((obj) => obj.Target === "自身");
      filteredList = filteredList.filter((obj) => obj.preText === "-");
      break;
    case "Noble":
      let result1 = {}
      let result2 = {}
      let result3 = {}
      let list1, list2, list3 = []
      list1 = filteredList.filter((obj) => obj.Grow === 'Lv');
      filterSkillList(list1, level, result1);
      list2 = filteredList.filter((obj) => obj.Grow === 'OC');
      filterSkillList(list2, OC, result2);
      list3 = filteredList.filter(
        (obj) => obj.Grow !== "Lv" && obj.Grow !== "OC"
      );
      filterSkillList(list3, "Value3", result3);
      result = sumObject(result, result1)
      result = sumObject(result, result2)
      result = sumObject(result, result3)
      return result
    default:
      filteredList = filteredList.filter(
        (obj) => obj.Target === "味方単体" || obj.Target === "味方全体" || obj.Target === "敵単体" || obj.Target === "敵全体"
      );
  }
  filterSkillList(filteredList, level, result);
  return result

}


//与えられたスキルデータ配列から必要なバフ項目だけを抜き出す共通処理
function filterSkillList(list, level, result) {
  for (const obj of list) {
    let str = obj[level];
    if (str === undefined) {
      str = "0";
    }
    if (obj.MainText === "防御力無視宝具攻撃") {
      if (result["宝具攻撃"] === undefined) {
        result["宝具攻撃"] = 0;
      }
      result["宝具攻撃"] = +parseFloat(extractNumbers(str)[0]);
    }
    ////////////////////////////////////////////////
    //                ここからコピペ
    ////////////////////////////////////////////////





    if (obj.MainText === "宝具攻撃") { if (result["宝具攻撃"] === undefined) { result["宝具攻撃"] = 0; } result["宝具攻撃"] = + parseFloat(extractNumbers(str)[0]); }
    if (obj.MainText === "特攻") { if (result["特攻"] === undefined) { result["特攻"] = 0; } result["特攻"] = + parseFloat(extractNumbers(str)[0]); }
    if (obj.MainText === "攻撃力") { if (result["攻撃力"] === undefined) { result["攻撃力"] = 0; } result["攻撃力"] = + parseFloat(extractNumbers(str)[0]); }
    if (obj.MainText === "Busterカード性能") { if (result["Busterカード性能"] === undefined) { result["Busterカード性能"] = 0; } result["Busterカード性能"] = + parseFloat(extractNumbers(str)[0]); }
    if (obj.MainText === "Quickカード性能") { if (result["Quickカード性能"] === undefined) { result["Quickカード性能"] = 0; } result["Quickカード性能"] = + parseFloat(extractNumbers(str)[0]); }
    if (obj.MainText === "Artsカード性能") { if (result["Artsカード性能"] === undefined) { result["Artsカード性能"] = 0; } result["Artsカード性能"] = + parseFloat(extractNumbers(str)[0]); }
    if (obj.MainText === "宝具威力") { if (result["宝具威力"] === undefined) { result["宝具威力"] = 0; } result["宝具威力"] = + parseFloat(extractNumbers(str)[0]); }
    if (obj.MainText === "NP獲得量") { if (result["NP獲得量"] === undefined) { result["NP獲得量"] = 0; } result["NP獲得量"] = + parseFloat(extractNumbers(str)[0]); }
    if (obj.MainText === "スター発生率") { if (result["スター発生率"] === undefined) { result["スター発生率"] = 0; } result["スター発生率"] = + parseFloat(extractNumbers(str)[0]); }
    if (obj.MainText === "クリティカル威力") { if (result["クリティカル威力"] === undefined) { result["クリティカル威力"] = 0; } result["クリティカル威力"] = + parseFloat(extractNumbers(str)[0]); }
    if (obj.MainText === "〔状態〕威力") { if (result["〔状態〕威力"] === undefined) { result["〔状態〕威力"] = 0; } result["〔状態〕威力"] = + parseFloat(extractNumbers(str)[0]); }
    if (obj.MainText === "通常威力") { if (result["通常威力"] === undefined) { result["通常威力"] = 0; } result["通常威力"] = + parseFloat(extractNumbers(str)[0]); }
    if (obj.MainText === "通常Arts威力") { if (result["通常Arts威力"] === undefined) { result["通常Arts威力"] = 0; } result["通常Arts威力"] = + parseFloat(extractNumbers(str)[0]); }
    if (obj.MainText === "〔超巨大〕威力") { if (result["〔超巨大〕威力"] === undefined) { result["〔超巨大〕威力"] = 0; } result["〔超巨大〕威力"] = + parseFloat(extractNumbers(str)[0]); }
    if (obj.MainText === "〔死霊〕威力") { if (result["〔死霊〕威力"] === undefined) { result["〔死霊〕威力"] = 0; } result["〔死霊〕威力"] = + parseFloat(extractNumbers(str)[0]); }
    if (obj.MainText === "〔魔性〕威力") { if (result["〔魔性〕威力"] === undefined) { result["〔魔性〕威力"] = 0; } result["〔魔性〕威力"] = + parseFloat(extractNumbers(str)[0]); }
    if (obj.MainText === "〔猛獣〕威力") { if (result["〔猛獣〕威力"] === undefined) { result["〔猛獣〕威力"] = 0; } result["〔猛獣〕威力"] = + parseFloat(extractNumbers(str)[0]); }
    if (obj.MainText === "〔男性〕威力") { if (result["〔男性〕威力"] === undefined) { result["〔男性〕威力"] = 0; } result["〔男性〕威力"] = + parseFloat(extractNumbers(str)[0]); }
    if (obj.MainText === "〔神性〕威力") { if (result["〔神性〕威力"] === undefined) { result["〔神性〕威力"] = 0; } result["〔神性〕威力"] = + parseFloat(extractNumbers(str)[0]); }
    if (obj.MainText === "〔猛獣と魔性〕威力") { if (result["〔猛獣と魔性〕威力"] === undefined) { result["〔猛獣と魔性〕威力"] = 0; } result["〔猛獣と魔性〕威力"] = + parseFloat(extractNumbers(str)[0]); }
    if (obj.MainText === "〔秩序〕威力") { if (result["〔秩序〕威力"] === undefined) { result["〔秩序〕威力"] = 0; } result["〔秩序〕威力"] = + parseFloat(extractNumbers(str)[0]); }
    if (obj.MainText === "〔善〕威力") { if (result["〔善〕威力"] === undefined) { result["〔善〕威力"] = 0; } result["〔善〕威力"] = + parseFloat(extractNumbers(str)[0]); }
    if (obj.MainText === "〔混沌〕威力") { if (result["〔混沌〕威力"] === undefined) { result["〔混沌〕威力"] = 0; } result["〔混沌〕威力"] = + parseFloat(extractNumbers(str)[0]); }
    if (obj.MainText === "〔悪〕威力") { if (result["〔悪〕威力"] === undefined) { result["〔悪〕威力"] = 0; } result["〔悪〕威力"] = + parseFloat(extractNumbers(str)[0]); }
    if (obj.MainText === "〔地の力〕威力") { if (result["〔地の力〕威力"] === undefined) { result["〔地の力〕威力"] = 0; } result["〔地の力〕威力"] = + parseFloat(extractNumbers(str)[0]); }
    if (obj.MainText === "〔サーヴァント〕威力") { if (result["〔サーヴァント〕威力"] === undefined) { result["〔サーヴァント〕威力"] = 0; } result["〔サーヴァント〕威力"] = + parseFloat(extractNumbers(str)[0]); }
    if (obj.MainText === "〔ローマ〕威力") { if (result["〔ローマ〕威力"] === undefined) { result["〔ローマ〕威力"] = 0; } result["〔ローマ〕威力"] = + parseFloat(extractNumbers(str)[0]); }
    if (obj.MainText === "〔王〕威力") { if (result["〔王〕威力"] === undefined) { result["〔王〕威力"] = 0; } result["〔王〕威力"] = + parseFloat(extractNumbers(str)[0]); }
    if (obj.MainText === "〔セイバー〕威力") { if (result["〔セイバー〕威力"] === undefined) { result["〔セイバー〕威力"] = 0; } result["〔セイバー〕威力"] = + parseFloat(extractNumbers(str)[0]); }
    if (obj.MainText === "〔人の力〕威力") { if (result["〔人の力〕威力"] === undefined) { result["〔人の力〕威力"] = 0; } result["〔人の力〕威力"] = + parseFloat(extractNumbers(str)[0]); }
    if (obj.MainText === "〔人間〕威力") { if (result["〔人間〕威力"] === undefined) { result["〔人間〕威力"] = 0; } result["〔人間〕威力"] = + parseFloat(extractNumbers(str)[0]); }
    if (obj.MainText === "〔巨人〕威力") { if (result["〔巨人〕威力"] === undefined) { result["〔巨人〕威力"] = 0; } result["〔巨人〕威力"] = + parseFloat(extractNumbers(str)[0]); }
    if (obj.MainText === "〔ギリシャ神話系男性〕威力") { if (result["〔ギリシャ神話系男性〕威力"] === undefined) { result["〔ギリシャ神話系男性〕威力"] = 0; } result["〔ギリシャ神話系男性〕威力"] = + parseFloat(extractNumbers(str)[0]); }
    if (obj.MainText === "〔解除可能な弱体〕威力") { if (result["〔解除可能な弱体〕威力"] === undefined) { result["〔解除可能な弱体〕威力"] = 0; } result["〔解除可能な弱体〕威力"] = + parseFloat(extractNumbers(str)[0]); }
    if (obj.MainText === "〔秩序かつ善〕威力") { if (result["〔秩序かつ善〕威力"] === undefined) { result["〔秩序かつ善〕威力"] = 0; } result["〔秩序かつ善〕威力"] = + parseFloat(extractNumbers(str)[0]); }
    if (obj.MainText === "〔神性と死霊と悪魔〕威力") { if (result["〔神性と死霊と悪魔〕威力"] === undefined) { result["〔神性と死霊と悪魔〕威力"] = 0; } result["〔神性と死霊と悪魔〕威力"] = + parseFloat(extractNumbers(str)[0]); }
    if (obj.MainText === "〔キャスター〕威力") { if (result["〔キャスター〕威力"] === undefined) { result["〔キャスター〕威力"] = 0; } result["〔キャスター〕威力"] = + parseFloat(extractNumbers(str)[0]); }
    if (obj.MainText === "〔源氏〕威力") { if (result["〔源氏〕威力"] === undefined) { result["〔源氏〕威力"] = 0; } result["〔源氏〕威力"] = + parseFloat(extractNumbers(str)[0]); }
    if (obj.MainText === "〔愛炎状態〕威力") { if (result["〔愛炎状態〕威力"] === undefined) { result["〔愛炎状態〕威力"] = 0; } result["〔愛炎状態〕威力"] = + parseFloat(extractNumbers(str)[0]); }
    if (obj.MainText === "〔機械〕威力") { if (result["〔機械〕威力"] === undefined) { result["〔機械〕威力"] = 0; } result["〔機械〕威力"] = + parseFloat(extractNumbers(str)[0]); }
    if (obj.MainText === "Busterカード耐性" && (obj.Target === "敵単体" || obj.Target === "敵全体")) { if (result["Busterカード耐性"] === undefined) { result["Busterカード耐性"] = 0; } result["Busterカード耐性"] = + parseFloat(extractNumbers(str)[0]); }
    if (obj.MainText === "Quickカード耐性" && (obj.Target === "敵単体" || obj.Target === "敵全体")) { if (result["Quickカード耐性"] === undefined) { result["Quickカード耐性"] = 0; } result["Quickカード耐性"] = + parseFloat(extractNumbers(str)[0]); }
    if (obj.MainText === "Artsカード耐性" && (obj.Target === "敵単体" || obj.Target === "敵全体")) { if (result["Artsカード耐性"] === undefined) { result["Artsカード耐性"] = 0; } result["Artsカード耐性"] = + parseFloat(extractNumbers(str)[0]); }
    if (obj.MainText === "防御力" && (obj.Target === "敵単体" || obj.Target === "敵全体")) { if (result["防御力"] === undefined) { result["防御力"] = 0; } result["防御力"] = + parseFloat(extractNumbers(str)[0]); console.log("ほげ")}
    if (obj.MainText === "敵特防") { if (result["敵特防"] === undefined) { result["敵特防"] = 0; } result["敵特防"] = + parseFloat(extractNumbers(str)[0]); }
    if (obj.MainText === "敵特殊耐性") { if (result["敵特殊耐性"] === undefined) { result["敵特殊耐性"] = 0; } result["敵特殊耐性"] = + parseFloat(extractNumbers(str)[0]); }













    ////////////////////////////////////////////////
    //                     ここまで
    ////////////////////////////////////////////////
  }
}

function extractNumbers(str) {
  const regex = /(\d+(\.\d+)?)/g;
  const matches = str.match(regex);
  if (matches) {
    return matches.map((match) => parseFloat(match));
  }
  return [];
}

//オブジェクト同士の足し算をする
function sumObject(obj1, obj2) {
  let result = {};
  for (const key in obj1) {
    if (obj2[key] === undefined) {
      result[key] = obj1[key];
    } else {
      result[key] = obj1[key] + obj2[key];
    }
  }
  for (const key in obj2) {
    if (obj1[key] === undefined) {
      result[key] = obj2[key];
    }
  }
  return result;
}