<template>
    <div class="outer1">
        <button @click="flag = !flag">切换keep-alive组件</button>
        <keep-alive>
            <keepA v-if="flag"  @sdm-name="getZiName"></keepA>
            <keepB v-else></keepB>
        </keep-alive>
        <button @click="getInfo">获取缓存的值</button>
    </div>
</template>
  
<script setup lang='ts'>
    // keep-alive 做缓存，切换的时候输入的内容已缓存
    // <keep-alive :include="['keepA']">  只缓存keepA组件
    // <keep-alive :exclude="['keepA']">  不缓存keepA组件
      // <keep-alive :max"10">  缓存最大数量，只会缓存10个组件，缓存活跃的组件

    import {markRaw, onUpdated, reactive, ref} from 'vue'
    import keepA from '../components/keepBox/keepA.vue'
    import keepB from '../components/keepBox/keepB.vue'

    let aaa: any
    const flag = ref<boolean>(true)


    const getInfo = () =>{
        console.log(aaa)
    }

    const getZiName = (nameStr: any)=>{
        aaa = nameStr
        console.log(nameStr, '我是父组件===>')
    }
</script>

<style scoped lang='less'>

</style>