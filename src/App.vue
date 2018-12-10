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
          <button @click="test">Test</button>
        </div>
        <div>
          <p>is_processing: {{is_processing}}</p>
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

      is_processing: false
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
    test() {
      const testPromise = () => {
        return new Promise(resolve => {
          // for(let n = 1; n <= this.n_gram*2; n++) {
          //   let obj = findnGrams(this.text_obj.arrText, n, true);
          //   resolve(obj)
          // }
          
          // return setTimeout(() => {
          //   resolve('x')
          // }, 2000)

          for(let n = 1; n <= this.n_gram*2; n++) {
            let obj = findnGrams(this.text_obj.arrText, n, true);
            return resolve(obj)
          }
          // return resolve('x')
        })
      }

      this.is_processing = true;
      testPromise().then(res => this.result_text = 'the end')
      .finally(() => {this.is_processing = false})
    },





    buildText() {
      const promiseText = () => {
        return new Promise((resololve, reject) => {
          let arr_text = this.text_obj.arrText;
          let processing_text = ''

          // Построение первых н букв
          for(let n = 1; n <= this.n_gram; n++) {
            let obj = findnGrams(arr_text, n, true);

            let random = Math.random(),
                sum = 0,
                maxRand = 0;

            for(let key in obj) {
              if(key.substr(0, n).indexOf(processing_text.slice(-n)) == 0 ){
                maxRand +=obj[key]
              }
            }

            maxRand = getRandom(0, maxRand);

            for(let key in obj) {
              if(n == 1) {
                sum += obj[key];
                if(sum > maxRand) {
                  processing_text = key
                  break;
                }
              } else {
                if(key.substr(0, n).indexOf(processing_text.slice(-n)) == 0 ){
                  sum += obj[key];
                  if(sum > maxRand) {
                    processing_text += key.slice(-1)
                      break;
                  }
                }
              }
            }
            console.log(processing_text)
          }


          // Построение остального текста
          let ngram = findnGrams(arr_text, this.n_gram),
              prev = '',
              
              m = 0,
              u = 0,

              sum = 0,
              maxRand = 0;
          while(processing_text.length < this.text_length) {
            for(let key in ngram) {
              if(key.indexOf(processing_text.slice(-this.n_gram)) == 0) {
                maxRand += ngram[key]
              }
            }

            maxRand = getRandomFull(0, maxRand);

            for(let key in ngram) {
              if(processing_text.slice(-this.n_gram+1) == key.substr(0, this.n_gram-1)) {
                if(sum <= maxRand) {
                  sum += ngram[key];
                }
                if(sum > maxRand) {
                  processing_text += key.slice(-1);
                  break;
                }
                if(processing_text == prev) {
                  m++;
                  if (m > 5) {
                    processing_text += key.slice(-1);
                    break;
                  }
                }
              }
            }
            prev = processing_text;
            console.log(processing_text)
          }
          resololve(prev)
        })
      }

      this.is_processing = true
      promiseText()
      .then(res => this.result_text = res)
      .finally(() => this.is_processing = false)
    }
  }
}
</script>

<style lang="scss">

</style>
