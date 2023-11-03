function priceToString(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function numToKor(number) {

    const numberString = number.replace(/[^0-9]/g, "");
    
    if(numberString.length >= 16){ 
        return 'ERR||== 범위 초과 값 처리불가 ==';
    }else if(numberString == ""){ 
        return 'ERR||== 변환 불가 자료형 ==';
    }

    const koreanNumbers = ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];
    const koreanUnits = ['', '십', '백', '천', '만', '십만', '백만', '천만', '억', '십억', '백억', '천억', '조', '십조', '백조'];

    const koreanParts = [];

    for (let i = numberString.length - 1; i >= 0; i--) {
        const digit = parseInt(numberString[i]); // 0 일때를 체크
        const unit = koreanUnits[(numberString.length - 1 - i) % 15];

        let numberWord = koreanNumbers[digit];

        if (digit === 0) {
            if (unit === '만' || unit === '십만' || unit === '백만' || unit === '천만') {
                koreanParts.push('만');
            } else if (unit === '억' || unit === '십억' || unit === '백억' || unit === '천억') {
                koreanParts.push('억');
            } else if (unit === '조' || unit === '십조' || unit === '백조') {
                koreanParts.push('조');
            }
        } else {                     
            console.log(numberWord , unit);
            koreanParts.push(numberWord + unit);
        }
    }

    //앞뒤에 같은단위가 있으면 뒤에것만 남겨주고 앞에껄 빼야함
    const wonArr = koreanParts.reverse();

    //console.log("wonArr : " + wonArr);

    if(wonArr.join('') == '일만'){
        return wonArr.join('').substr(1);
    }


    // 조 단위
    trillionResult = handlingMoney(wonArr, '조');

    // 억 단위
    hundredMillionResult = handlingMoney(wonArr, '억');

    // 만 단위
    tenThousandResult = handlingMoney(wonArr, '만');

    // 천 이하 단위    
    let filteredWonArr = wonArr.filter(item => {
        return !item.endsWith('조') && !item.endsWith('억') && !item.endsWith('만');
    });

    const lastResult = filteredWonArr.map(item => {
        if (item.endsWith('일천') || item.endsWith('일백') || item.endsWith('일십')) {
            return item.substr(1);        }
        return item;
    });
    
    return trillionResult.join('') + hundredMillionResult.join('') + tenThousandResult.join('') + lastResult.join('') ;
}

// 단위별 정제 함수
function handlingMoney(arr, unit) {
    const filteredArr = arr.filter(item => item.endsWith(unit));
    let result = [];
    
    for (let index = 0; index < filteredArr.length; index++) {
        const number = filteredArr[index];
        let price = number.slice(0, -1);
        
        if(unit === '만'){
            if (index == 0 && price.indexOf('일') != -1) price = price.substr(1);            
            if (price != ''){ if(price == '일십') price = '십'; result.push(price); }
        }else{
            if (price.indexOf('일') != -1) price = price.substr(1);        
            if (price != '') result.push(price);
        }        
    }

    if (result.length > 0) {
        result.push(unit + ' ');
    }

    return result;
}