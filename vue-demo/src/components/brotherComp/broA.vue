<template>
    <div class="outer1">
        <h3>A组件</h3>
        <button @click="emitaFn">派发一个事件</button>
       
    </div>
</template>
  
<script setup lang='ts'>

    const emitA = defineEmits(['emitA-fun'])
    let flag = false    
    const emitaFn = () => {
        flag = !flag
        emitA('emitA-fun', flag)
    }

</script>

<style scoped lang='less'>

</style>