<template>
    <div class="outer1">
        <h3>mittB组件</h3>
       
    </div>
</template>
  
<script setup lang='ts'>
import { getCurrentInstance } from 'vue'
const instance = getCurrentInstance()
// instance?.proxy?.$Bus.on('on-mittcl',(str) => {
//     console.log(str, '======>mittB')
// })

// instance?.proxy?.$Bus.on('*',(typeName, str) => {
//     console.log(typeName, str, '======>mittB')
// })

const MitFn = (str: any) => {
    console.log(str, '======>mittB')
}

instance?.proxy?.$Bus.on('on-mittcl',MitFn)
// off 取消指定的mitt事件
instance?.proxy?.$Bus.off('on-mittcl',MitFn)
// 清除所以mitt事件
instance?.proxy?.$Bus.all.clear()
</script>

<style scoped lang='less'>

</style>