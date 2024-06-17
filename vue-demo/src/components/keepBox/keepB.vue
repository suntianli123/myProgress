<template>
    <div class="outer1">
        我是B组件
        <input type="text"  v-model="input2">
    </div>
</template>
  
<script setup lang='ts'>
    import {markRaw, reactive, ref} from 'vue'

    const input2 = ref()
</script>

<style scoped lang='less'>

</style>