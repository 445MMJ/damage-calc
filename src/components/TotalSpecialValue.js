export function totalSpecialValue(obj) {
    let keyword = '〕威力'
    let total = 0;
    // オブジェクトの各キーに対して処理を行う
    for (const key in obj) {
        if (key.includes(keyword)) {
            total += obj[key];
        }
    }
    return total;
}


