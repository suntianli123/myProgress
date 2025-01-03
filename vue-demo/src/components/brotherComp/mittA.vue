<template>
    <div class="outer1">
        <h3>mittA组件</h3>
        <button @click="emitFun">派发一个事件</button>
       
    </div>
</template>
  
<script setup lang='ts'>
import { getCurrentInstance } from 'vue'
const instance = getCurrentInstance()

const emitFun = () =>{
    instance?.proxy?.$Bus.emit('on-mittcl', '点击了mitt111')
    instance?.proxy?.$Bus.emit('on-mittcl2', '点击了mitt222')
}

</script>

<style scoped lang='less'>

</style>