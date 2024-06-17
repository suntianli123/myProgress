<template>
    <div style="padding: 5px 0 10px;">动态路由切换</div>
    <hr>
    <div class="tabList">
       <div class="tapIt" :class="[activeIn == index ? 'active' : '']" :key="index" v-for="(item, index) in tablist" @click="tabClickFun(item, index)">
            <div>{{ item. name }}</div>
       </div>
    </div>

    <component :is="compIdStr"></component>
</template>
  
<script setup lang='ts'>
    import {markRaw, reactive, ref} from 'vue'
    import tabA from '../components/tabs/tabA.vue'
    import tabB from '../components/tabs/tabB.vue'
    import tabC from '../components/tabs/tabC.vue'

    const compIdStr: any = ref(tabA)
    const activeIn: any = ref(0)

    const tablist = reactive([
        {
            name: 'tabA组件',
            comId: markRaw(tabA)
        },
        {
            name: 'tabB组件',
            comId: markRaw(tabB)
        },
        {
            name: 'tabC组件',
            comId: markRaw(tabC)
        },
    ])

    const tabClickFun = (item: any, index: any)=> {
        compIdStr.value = item.comId
        activeIn.value = index
    }
</script>

<style scoped lang='less'>
    .tabList{
        display: flex;
        .tapIt{
            border: 1px solid;
            padding: 5px 10px;
            margin: 5px;
            cursor: pointer;
        }
    }
    .active{
        background: skyblue;
    }
</style>