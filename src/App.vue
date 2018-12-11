<template>
  <div>
    <div class="container">
      <div class="container__header">
        <h1>Analysis of the plaintext frequency characteristics</h1>
      </div>
        <p>The program based on the existing text on Markov chains (the k-gram parameter is set by entering) builds readable (not meaningful) text</p>
      <box title="Upload text for analysis">
        <p>Upload file text file in utf-8 russian language</p>
        <div class="flex">
          <upload-input @get-text="getText"></upload-input>
        </div>
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
          <button @click="start">Start</button>
        </div>
      </box>
      <box v-if="is_processing" title="Loading...">
        <loader-circle></loader-circle>
      </box>
      <box v-if="final_text" title="Result">
        {{final_text}}
      </box>
    </div>
  </div>
</template>

<script>
import Box from '@/components/Box'
import LoaderCircle from '@/components/LoaderCircle'
import UploadInput from '@/components/UploadInput'

import {getRandom, getRandomFull, findnGrams} from '@/assets/js/helpers.js'
export default {
  name: 'app',
  components: {
    Box,
    UploadInput,
    LoaderCircle
  },
  data(){
    return {
      text_length: 40,
      n_gram: 8,
      text_arr: null,
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
      this.text_arr = text;
    },
    start() {
      this.is_processing = true;
      setTimeout(() => {
        this.buildText()
      }, 10)
    },
    buildText() {
      const promiseText = new Promise((resolve, reject) => {
        let arr_text = this.text_arr;
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
        resolve(prev)
      })

      promiseText
      .then(res => this.result_text = res)
      .finally(() => this.is_processing = false)
    }
  }
}
</script>

<style lang="scss">

</style>
