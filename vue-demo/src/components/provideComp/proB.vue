<template>
    <div class="outer1">
        <h1>第三层组件</h1>
        <div class=box></div>
        <hr>

        <button @click="changeFn">修改 provide的值</button>
    </div>
</template>
  
<script setup lang='ts'>
    import {markRaw, reactive, ref, inject} from 'vue'
    
    import type {Ref} from 'vue'
    
    // const colorInj = inject<Ref<string>>('colorSted')
    const colorInj = inject<Ref>('colorSted', ref('red'))

    const changeFn = () => {
        // 非空断言 !.
        // colorInj!.value = 'yellow'
        colorInj.value = 'yellow'
    }
</script>

<style scoped lang='less'>
    .box{
        width: 80px;
        height: 80px;
        border: 1px solid;
        background: v-bind(colorInj);
    }
</style>