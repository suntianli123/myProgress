<template>
    <div>子级</div>

    <div>父传子值： {{ title }}</div>
    <div>父传子值： {{ arrList }}</div>
    <hr>

    <button @click="sendFun">子传父值</button>
</template>
  
<script setup lang='ts'>
 // scoped, 作用域,  只在这个文件中起作用
    import { ref } from 'vue'

    // 接收父组件传过来的值
    // const propsInfo = defineProps({
    //     title: {
    //         type: String,
    //         default: "默认小明"
    //     }
    // })

    // ts 特有withDefaults, 给加默认值
    const propsInfo = withDefaults(defineProps<{
        title: string,
        arrList: any[]
    }>(), {
        arrList: () => ['明1']
    })
    
    console.log(propsInfo.title)
   
   // 子传父
//    const emitFn = defineEmits(['sdm-name'])
//    const sendFun = () =>{
//     emitFn('sdm-name', '从子组件过来的小张')
//    }

    // 子传父 ts的方法
    const emitFn = defineEmits<{
        (e: "sdm-name", name: string): void
        (e: "sdm-name", name: string): void
    }>()
    const sendFun = () =>{
        emitFn('sdm-name', '从子组件过来的小张')
    }

    // 父组件读取子组件暴露的信息
    defineExpose({
        zibaolou: '小换-暴露内容',
        openFn: ()=> {
            console.log(123)
        }
    })
</script>
<style scoped lang='less'>

</style>