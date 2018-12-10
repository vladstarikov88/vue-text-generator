<template>
  <div>
    <div class="container">
      <div class="container__header">
        <h1>Analysis of the plaintext frequency characteristics</h1>
      </div>
      <box title="Upload text for analysis">
        <upload-input @get-text="getText"></upload-input>
        <div>
          <input 
            class="small" 
            type="text"
            placeholder="Text length"
            v-model.number="text_length">
          <input 
            class="small" 
            type="text"
            placeholder="Parametr N"
            v-model.number="n_gram">
          <button @click="buildText">Start</button>
        </div>
      </box>
      <box v-if="final_text" title="Result">
        {{final_text}}
      </box>
    </div>
  </div>
</template>

<script>
import Box from '@/components/Box'
import UploadInput from '@/components/UploadInput'

import {getRandom, getRandomFull, findnGrams} from '@/assets/js/methods.js'
export default {
  name: 'app',
  components: {
    Box,
    UploadInput
  },
  data(){
    return {
      text_length: 40,
      n_gram: 5,
      text_obj: null,
      result_text: '',
    }
  },
  computed: {
    final_text() {
      return this.result_text.split('_').join(' ')
    }
  },
  methods: {
    getText(text) {
      this.text_obj = text;
    },
    buildText() {
      let arr_text = this.text_obj.arrText;

      // Построение первых н букв
      for(let n = 1; n <= this.n_gram; n++) {
        let obj = findnGrams(arr_text, n, true);

        let random = Math.random(),
            sum = 0,
            maxRand = 0;

        for(let key in obj) {
          if(key.substr(0, n).indexOf(this.result_text.slice(-n)) == 0 ){
            maxRand +=obj[key]
          }
        }

        maxRand = getRandom(0, maxRand);

        for(let key in obj) {
          if(n == 1) {
            sum += obj[key];
            if(sum > maxRand) {
              this.result_text = key
              break;
            }
          } else {
            if(key.substr(0, n).indexOf(this.result_text.slice(-n)) == 0 ){
              sum += obj[key];
              if(sum > maxRand) {
                this.result_text += key.slice(-1)
                  break;
              }
            }
          }
        }
        console.log(this.result_text)
      }


      // Построение остального текста
      let ngram = findnGrams(arr_text, this.n_gram);
      var prev = '';
      
      for(let u = this.n_gram - 1; u < this.text_length; u++){
        var m = 0;
        let sum = 0,
            maxRand = 0;

        for(let key in ngram) {
          if(key.indexOf(this.result_text.slice(-this.n_gram)) == 0) {
            maxRand += ngram[key]
          }
        }

        maxRand = getRandomFull(0, maxRand);

        for(let key in ngram) {
          if(this.result_text.slice(-this.n_gram+1) == key.substr(0, this.n_gram-1)) {
            if(sum <= maxRand) {
              sum += ngram[key];
            }
            if(sum > maxRand) {
              this.result_text += key.slice(-1);
              break;
            }
            if(this.result_text == prev) {
              m++;
              // u--;
              if (m > 5) {
                this.result_text += key.slice(-1);
                break;
              }
            }
          }
        }
        prev = this.result_text;
        console.log(this.result_text)
      }
      this.result_text = prev
    }
  }
}
</script>

<style lang="scss">

</style>
