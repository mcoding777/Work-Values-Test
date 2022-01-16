// 객체를 value 기준으로 오름차순 정렬해서 문자열로 반환하는 함수
// 객체가 순서대로 있지 않은 경우 처음부터 사용!

// 인자 값 {'B3':'3', 'B1':'1', 'B2':'2', ...}

export function objectToString(object) {
    const array = [];

    for (let i in object) {
        array.push([i, object[i]]);
    }

    const sort_array = array.sort((a, b) => {
      return a[1] - b[1]
    }); // 반환 값 [['B1', '1'], ['B2', '2'], ['B3', '3'], ...]
    
    // 객체가 순서대로 있는 경우에는 여기서부터 사용!
    let string = "";

    for (let j in sort_array) {
        string = string.concat(" ", `${sort_array[j][0]}=${sort_array[j][1]}`);
    }

    return string.trim(); // 처음에 오는 공백 제거
}

// 최종 반환 값 "B1=1 B2=2 B3=3 ..."