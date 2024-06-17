<template>
    <div class="outer1">
        我是A组件
        <input type="text" v-model="input1" @change="toChangeFn">
    </div>
</template>
  
<script setup lang='ts'>
    import {markRaw, onActivated, onDeactivated, onMounted, onUnmounted, reactive, ref} from 'vue'

    const input1 = ref()

        // 子传父 ts的方法
    const emitFn = defineEmits<{
        (e: "sdm-name", name: string): void
    }>()
    emitFn('sdm-name', input1.value)

    const toChangeFn = () => {
        emitFn('sdm-name', input1.value)
    }

    // onMounted  keep-alive  用时，只会走一次
    onMounted(() => {
        console.log('初始化=====>')
    })
    // 会多次走
    onActivated(() => {
        console.log('keep-alive初始化=====>')
    })
    onDeactivated(() => {
        console.log('keep-alive卸载=====>')
    })
    // 使用keep-alive，不会走onUnmounted， 会走onDeactivated  keep-alive的卸载
    onUnmounted(()=>{
        console.log('销毁完成=====>')
    })
</script>

<style scoped lang='less'>

</style>