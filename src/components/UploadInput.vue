<template>
    <div>
        <input type="file" lang="en" @change="selectBigText">
    </div>
</template>

<script>
import {delSymbols} from '@/assets/js/helpers.js'
export default {
  methods: {
    selectBigText(evt) {
      let files = evt.target.files;
      console.log(files)
      let reader = new FileReader();
      reader.readAsText(files[0]);
      reader.onload = (() => e => {
        let arrText = e.target.result.split('\n').join(' ').split(' ');
        let text =  delSymbols(arrText);

        console.log(text)

        this.$emit('get-text', text)
      })(files[0]);
    }
  }
}
</script>

<style>

</style>
