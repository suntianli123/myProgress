<template>
    <h3>我是组件 -- </h3>
    
    <div ref="divInfo">{{ nameStr }}</div>
    <button @click="changeFun">修改</button>
    <hr>
</template>

<script setup lang='ts'>
    import { ref,onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted, onRenderTracked, onRenderTriggered } from 'vue'
    // beforeCreate和created  在setup语法糖模式没有这两个声明周期，setup去代替
    const nameStr = ref<string>('小明')
    const divInfo = ref<HTMLDivElement>()
    const changeFun = () =>{
        nameStr.value = '修改后小张'
    }

    console.log('setup')
    // 创建
    // onBeforeMount 无法读取到dom，onMounted 可以读取到dom
    onBeforeMount(() => {
        console.log('创建之前=====>', divInfo.value)
    })
    // onMounted
    onMounted(() => {
        console.log('创建完成=====>', divInfo.value)
    })

    // 更新的钩子
    onBeforeUpdate(() => {
        console.log('更新之前=====>', divInfo.value?.innerHTML)
    })
    // onUpdated
    onUpdated(()=>{
        console.log('更新完成=====>', divInfo.value?.innerHTML)
    }) 

    // 销毁
    onBeforeUnmount(()=>{
        console.log('销毁之前=====>')
    })
    // onUnmounted
    onUnmounted(()=>{
        console.log('销毁完成=====>')
    })

    // 打印做调试用的
    onRenderTriggered((e)=>{
        console.log('onRenderTriggered==>', e)
    })
    onRenderTracked((e)=>{
        console.log('onRenderTracked==>', e)
    })

</script>

<style scoped lang='less'>

</style>