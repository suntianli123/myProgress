<template>
    <div class="div1">
        {{ unm }}
    </div>
</template>
  
<script setup lang='ts'>
    import {markRaw, reactive, ref} from 'vue'

    const unm = ref()
    setTimeout(() =>{
        unm.value = 1223
    },2000)
</script>

<style scoped lang='less'>
    .div1{
        height: 100px;
        background: red;
        color: white;
    }
</style>