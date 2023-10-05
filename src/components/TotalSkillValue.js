//masterSkillValueが持つkeyと同じkeyのvalue同士を足し算する

// オブジェクトのリストを足し合わせる関数v2
export function sumObjectValue(objectArray) {
    let masterSkillValue = {
        "宝具攻撃": 0,
        "特攻": 0,
        "攻撃力": 0,
        "Busterカード性能": 0,
        "Quickカード性能": 0,
        "Artsカード性能": 0,
        "宝具威力": 0,
        "NP獲得量": 0,
        "クリティカル威力": 0,
        "〔状態〕威力": 0,
        "通常威力": 0,
        "通常Arts威力": 0,
        "〔超巨大〕威力": 0,
        "〔死霊〕威力": 0,
        "〔魔性〕威力": 0,
        "〔猛獣〕威力": 0,
        "〔男性〕威力": 0,
        "〔神性〕威力": 0,
        "〔猛獣と魔性〕威力": 0,
        "〔秩序〕威力": 0,
        "〔善〕威力": 0,
        "〔混沌〕威力": 0,
        "〔悪〕威力": 0,
        "〔地の力〕威力": 0,
        "〔サーヴァント〕威力": 0,
        "〔ローマ〕威力": 0,
        "〔王〕威力": 0,
        "〔セイバー〕威力": 0,
        "〔人の力〕威力": 0,
        "〔人間〕威力": 0,
        "〔巨人〕威力": 0,
        "〔ギリシャ神話系男性〕威力": 0,
        "〔解除可能な弱体〕威力": 0,
        "〔秩序かつ善〕威力": 0,
        "〔神性と死霊と悪魔〕威力": 0,
        "〔キャスター〕威力": 0,
        "〔源氏〕威力": 0,
        "〔愛炎状態〕威力": 0,
        "〔機械〕威力": 0,
        "Busterカード耐性": 0,
        "Quickカード耐性": 0,
        "Artsカード耐性": 0,
        "敵防御力": 0,
        "敵特防": 0,
        "敵特殊耐性": 0,
    }

        ;

    for (const obj of objectArray) {
        if (typeof obj !== 'object') {
            continue;
        }
        for (const key in obj) {
            if (obj.hasOwnProperty(key) && key in masterSkillValue) {
                masterSkillValue[key] += obj[key];
            }
        }
    }
    return masterSkillValue;
}