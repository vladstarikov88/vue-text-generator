export function coincidenceIndex(anon) {
    var letters = anon.join('').substr(0)
    var frequency = {};
    var count = {}
    for(var i = 0; i < letters.length; i++) {

        var fr = letters[i].toLowerCase();
        if(fr in frequency) {
            frequency[fr]++
        } else {
            frequency[fr] = 0;
            frequency[fr]++
        }
    }
    for(let key in frequency) {
        count[key] = frequency[key]
        frequency[key] = Math.round( (frequency[key] / letters.length)*100000 ) / 100000
    }

    var sum = 0;
    for(let key in count) {
        sum += count[key]*(count[key] -1)/ letters.length / (letters.length -1)
    }

    sum = Math.round(sum *1000)/1000

    return sum
}

export function setToPage(text, gram, time) {
    document.getElementById('header').innerHTML += " при n = " + gram
    document.getElementById('result').innerHTML  = text
    document.getElementById('time').innerHTML  = "Время работы программы " + time + ' секунд'
}

export function getRandom(min, max){
    return Math.random() * (max - min) + min;
}

export function getRandomFull(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function compare(a, b){
    return b - a;
}

export function compareRandom() {
    return Math.random() - 0.5;
}

export function getClass(obj) {
    return ({}.toString.call(obj).slice(8, -1))
}

export function allConcidence(text, letter) {
    var position = 0,
        positionArray = [];

    while(position <= text.length) {
        var found = text.indexOf(letter, position);

        if (found == -1)  break;
        positionArray.push(found);
        position = found + 1;

    }
    return positionArray;
}

export function find(array, value) {

  for (var i = 0; i < array.length; i++) {
    if (array[i] == value) return i;
  }

  return -1;
}


export function strCompare(str1, str2) {
    var fs = '' + str1.localeCompare(str2);
    var x = '';

    switch(fs) {
        case '-1':
            x = 'меньше';
            break;
        case '1':
            x = 'больше';
            break;
        case '0':
            x = 'равно';
            break;
    }
    return x;
}

export function findnGrams(arr_text, n, frequency) {
    var arr = arr_text.join('_').split('');

    var bigrams = {};
    for(let i = 0; i < arr.length - n+1; i++) {
        let bigr = '';
        for(let s = 0; s < n; s++) {
            bigr += arr[i+s]
        }
        if(bigr in bigrams) {
            bigrams[bigr]++;
        } else{
            bigrams[bigr] = 0;
            bigrams[bigr]++;
        }
    }
    if(frequency === true) {
        for(var key in bigrams) {
            bigrams[key] = bigrams[key] / arr.length
        }
    }

    return bigrams;
}

export function delSymbols(arr) {
  for(var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].toLowerCase();
    for(var j = 0; j<arr[i].length; j++) {
      if ( (arr[i][j].charCodeAt(0) < 'а'.charCodeAt(0) || arr[i][j].charCodeAt(0) > 'я'.charCodeAt(0))) {
        arr[i] = arr[i].replace(arr[i][j], '');
        j--;
      }
    }
    if(arr[i] == ''){
      arr.splice(i, 1);
      i--;
    }
  }
  return arr.slice();
}

export function toStr(arr){
  return arr.join('').substr(0);
}