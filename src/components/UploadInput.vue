<template>
    <div>
        <input type="file" lang="en" @change="selectBigText">
    </div>
</template>

<script>
import Text from '@/assets/js/ClassText.js'
export default {
    methods: {
        selectBigText(evt) {
            let files = evt.target.files;
            let reader = new FileReader();
            reader.onload = (theFile => e => {
                let arrText = e.target.result.split('\n').join(' ').split(' ');
                let text = new Text(arrText);
                text.delSymbols();
                text.toStr();

                this.$emit('get-text', text)
            })(files[0]);
            reader.readAsText(files[0]);
        }
    }
}
</script>

<style>

</style>
