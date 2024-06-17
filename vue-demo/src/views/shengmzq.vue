<template>
    <h1>生命周期</h1>
    <hr>
    <Atest v-if="flag"></Atest>
    <button @click="flag = !flag">创建和销毁</button>
</template>
  
<script setup lang='ts'>
    import { ref,isRef,shallowRef,triggerRef,customRef } from 'vue'
    import Atest from '../components/Atest.vue'
    const flag = ref<boolean>(true)
</script>

<style scoped lang='less'>

</style>