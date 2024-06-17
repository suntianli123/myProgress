<template>
    <div class="div1">
        1111
        <slot name="slotDiv1"></slot>
    </div>
    <div class="div2">
        222
        <slot name="slotDiv2"></slot>
    </div>
    <main class="div3">
        <div :key='index' v-for="(item,index) in dataList">
            <slot :slotItem="item"></slot>
        </div>
    </main>
    <div class="div4">
        444
        <slot name="slotDiv4"></slot>
    </div>
</template>
  
<script setup lang='ts'>
    import {markRaw, reactive, ref} from 'vue'

    const dataList = reactive<any[]>([
        {
            name: '插槽作用域1',
            age: '18'
        },
        {
            name: '插槽作用域2',
            age: '19'
        },
        {
            name: '插槽作用域3',
            age: '20'
        },
    ])
</script>

<style scoped lang='less'>
    .div1{
        height: 100px;
        background: red;
        color: white;
    }
    .div2{
        height: 200px;
        background: blue;
        color: white;
    }
    .div3{
        height: 300px;
        background: yellow;
        color: black;
    }
    .div4{
        height: 100px;
        background: red;
        color: white;
    }
</style>