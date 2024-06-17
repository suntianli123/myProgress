<template>
    <div class="qwert">父级</div>
    <hr>
    <WaterZiji :title="nameStr" :arrList=[1,2,3] @sdm-name="getZiName" ref="falled"></WaterZiji>
</template>
  
<script setup lang='ts'>
    import { onMounted, ref } from 'vue'
    import WaterZiji from '../components/WaterZiji.vue'

    let nameStr = '小张旧'

    const getZiName = (nameStr: any)=>{
        console.log(nameStr, '我是父组件===>')
    }

    const falledInfo = ref<InstanceType<typeof WaterZiji>>()

    console.log(falledInfo.value?.zibaolou, '父组件读取子组件暴露的')

    // scoped, 作用域,  只在这个文件中起作用
</script>
<style scoped lang='less'>
    .qwert {
        color: blue
    }
</style>