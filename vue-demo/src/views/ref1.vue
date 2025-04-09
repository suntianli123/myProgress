<template>
    <div>{{ bb }}</div>
    <div>{{ cc }}</div>
    <button @click="change">修改</button>

    <div ref='readDm'> 读取dom </div>

    <div>{{ qq }}</div>
</template>
  
<script setup lang='ts'>
    import { aA } from 'vitest/dist/reporters-w_64AS5f.js'
import { ref,isRef,shallowRef,triggerRef,customRef } from 'vue'

    // ref：深层次 。 shallowRef：浅层次的响应， 只能改变到cc.value, 无法改变bb.value.name 
    // ref 和 shallowRef 不能一起使用，会影响shallowRef 造成视图的更新
    // triggerRef 强制视图更新  triggerRef(bb)

    const bb = ref({name: 'b22'})
    const cc = ref('c22')
    const readDm = ref()

    const change = () => {
        bb.value.name = 'b33'
        cc.value = 'c33'
        console.log(bb)
        
        // 判断是不是 ref对象
        console.log('判断是不是', isRef(bb))
        console.log('通过ref获取dom', readDm.value.innerText)
    }


    const qq = ref({})
    const data = ref({
        qq: {}
    })
    qq.value =data.value.qq
    const changeFn = () => {
        qq.value[111] = {}
        qq.value[111][11111] = []
        qq.value[111][11111] = [1,2]
        console.log(`qq的值----：${JSON.stringify(qq.value)}`)
        console.log(`data的值----: ${JSON.stringify(data.value)}`)
    }
    changeFn()
    setTimeout(() => {
        qq.value = {}
        data.value.qq={}
        console.log(`qq的值：${JSON.stringify(qq.value)}`)
        console.log(`data的值: ${JSON.stringify(data.value)}`)
    },2000)
</script>

<style scoped lang='less'>

</style>