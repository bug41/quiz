function priceToString(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function numberToKorean(number) {

    const numberString = number.replace(/[^0-9]/g, "");
    
    if(numberString.length >= 16){ 
        return 'ERR||== 범위 초과 값 처리불가 ==';
    }else if(numberString == ""){ 
        return 'ERR||== 변환 불가 자료형 ==';
    }

    const koreanNumbers = ['', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];
    const koreanUnits = ['', '십', '백', '천', '만', '십만', '백만', '천만', '억', '십억', '백억', '천억', '조', '십조', '백조'];

    //const numberString = number.toString().replace(',','');

    const koreanParts = [];

    // i = 11
    for (let i = numberString.length - 1; i >= 0; i--) {
        const digit = parseInt(numberString[i]); // 0 일때를 체크
        const unit = koreanUnits[(numberString.length - 1 - i) % 15];

        let numberWord = koreanNumbers[digit];

        //console.log(digit);

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

    console.log("wonArr : " + wonArr);

    if(wonArr.join('') == '일만'){
        return wonArr.join('').substr(1);
    }

    //조 단위
    trillion = wonArr.filter(item => item.endsWith('조'));
    let trillionResult = [];    
    for (let index = 0; index < trillion.length; index++) {
        const number = trillion[index];
        let price = number.slice(0, -1);
        
        if(price.indexOf('일') != -1 && !(index+1 === trillion.length)){
            price = price.substr(1);
        }
        
        if(price != ''){
            trillionResult.push(price);
        }
        
        //trillionResult.push(price);
        //if (index + 1 === trillion.length) {
        //    trillionResult.push('조 ');
        //}
    };

    if(trillionResult.length > 0){
        trillionResult.push('조 ');
    }

    console.log('trillionResult :' + trillionResult)


    let filteredWonArr = wonArr.filter(item => !item.endsWith('조'));

    // 억 단위
    hundredMillion = filteredWonArr.filter(item => item.endsWith('억'));
    let hundredMillionResult = [];
    for (let index = 0; index < hundredMillion.length; index++) {
        const number = hundredMillion[index];
        let price = number.slice(0, -1);
        
        //억 에서도 일을 빼주는게 맞는거냐
        //if(hundredMillion.length <= 1 || (price.indexOf('일') != -1 && !(index + 1 === hundredMillion.length))){
        //  price = price.substr(1);
        //}

        if (price.indexOf('일') != -1) {
            price = price.substr(1);
        } 

        if(price != ''){
            hundredMillionResult.push(price);
        }

        //hundredMillionResult.push(price);
        //if (index + 1 === hundredMillion.length) {
        //    hundredMillionResult.push('억 ');
        //}
    };

    if(hundredMillionResult.length > 0){
        hundredMillionResult.push('억 ');
    }

    console.log('hundredMillionResult :' + hundredMillionResult)
    
    let filteredWonArr1 = filteredWonArr.filter(item => !item.endsWith('억'));

    // 만 단위
    tenThousand = filteredWonArr1.filter(item => item.endsWith('만'));

    //console.log("111,111 원에서 노출 "  + tenThousand)
    //console.log("tenThousand : " + tenThousand);
    
    let tenThousandResult = [];    
    for (let index = 0; index < tenThousand.length; index++) {
        const number = tenThousand[index];
        let price = number.slice(0, -1); //맨 뒷글자 단위 삭제        
                
        if (index == 0 && price.indexOf('일') != -1) {
            price = price.substr(1);
        }            
        
        if(price != ''){
            if(price == '일십') price = '십';
            tenThousandResult.push(price);
        }

        //if (index + 1 === tenThousand.length) {
        //    console.log('뭐라고 오는지 체크 ' + price)
        //    tenThousandResult.push('만 ');
        //}        
    }

    if(tenThousandResult.length > 0){
        tenThousandResult.push('만 ');
    }

    console.log('tenThousandResult :' + tenThousandResult)

    // 천 이하 단위
    const filteredWonArr2 = filteredWonArr1.filter(item => !item.endsWith('만'));

    //console.log("###############")
    //console.log(filteredWonArr2);
    //console.log("###############")
        
    const filteredWonArr3 = filteredWonArr2.map(item => {
        if (item.endsWith('일천') || item.endsWith('일백') || item.endsWith('일십')) {
            return item.substr(1);        }
        return item;
    });

    console.log('========== for end =========== :::::::::: ' + wonArr)

    console.log(filteredWonArr3);
    
    return trillionResult.join('') + hundredMillionResult.join('') + tenThousandResult.join('') + filteredWonArr3.join('') ;
    //return wonArr.join('');
}