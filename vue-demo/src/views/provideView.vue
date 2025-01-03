<template>
    <div>依赖注入  provide和inject</div>

    <h1>第一层组件</h1>
    <label>
        <input type="radio" v-model="colorPro" value="red" name="color">
        红色
    </label>
    <label>
        <input type="radio" v-model="colorPro" value="yellow" name="color">
        黄色
    </label>
    <label>
        <input type="radio" v-model="colorPro" value="blue" name="color">
        蓝色
    </label>

    <div class="box">

    </div>
    <hr>
    <proA></proA>


</template>
  
<script setup lang='ts'>
    import { watch, reactive, ref, provide, readonly} from 'vue'
    import proA from '../components/provideComp/proA.vue'

    const colorPro = ref<string>('red')
    provide('colorSted', colorPro)

    // 子组件不能修改provide
    // provide('colorSted', readonly(colorPro))

</script>

<style scoped lang='less'>
    .box{
        width: 80px;
        height: 80px;
        border: 1px solid;
        background: v-bind(colorPro);
    }
</style>