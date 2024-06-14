<template>
  <input v-model='aa' type='text'>
  <div>{{ aa }}</div>
  <div :key="index" v-for="(item, index) in testArr">
    {{item}}
  </div>
</template>

<script setup lang='ts'>
  import {ref} from 'vue'
  const aa: any = ref('111')
  const testArr = ['qq','ww','ee']
</script>

<style scoped lang='less'>

</style>