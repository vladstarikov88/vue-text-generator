export default class Text {
    constructor(arrText) {
        this.arrText = arrText;
        this.stringText;
    }

    delSymbols() {
        var arr = this.arrText;

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

        this.arrText = arr.slice();
        return this.arrText;
    }

    toStr(){
        this.stringText = this.arrText.join('').substr(0);
        return this.stringText;
    }

    findnGrams(n, frequency) {
        var arr = this.arrText.join('_').split('');

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

        return this.nGrams = bigrams;
    }
}