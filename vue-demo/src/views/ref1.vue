<template>
    <div>{{ bb }}</div>
    <div>{{ cc }}</div>
    <button @click="change">修改</button>

    <div ref='readDm'> 读取dom </div>
</template>
  
<script setup lang='ts'>
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
</script>

<style scoped lang='less'>

</style>