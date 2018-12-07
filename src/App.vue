<template>
  <div>
    <div class="container">
      <div class="container__header">
        <h1>Analysis of the plaintext frequency characteristics</h1>
      </div>
      <box title="Upload text for analysis">
        <input type="file">
        <div>
          <input class="small" type="text">
          <input class="small" type="text">
          <button>Start</button>
        </div>
      </box>
      <box title="Result">

      </box>
    </div>
  </div>
</template>

<script>
import Box from '@/components/Box'
export default {
  name: 'app',
  components: {
    Box
  }
}
</script>

<style lang="scss">

</style>
