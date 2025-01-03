<template>
    <div class="outer1">
        <h1>第二层组件</h1>
        <div class=box></div>
        <hr>

        <proB></proB>
    </div>
</template>
  
<script setup lang='ts'>
    import {inject, markRaw, reactive, ref} from 'vue'
    import proB from './proB.vue'
    import type {Ref} from 'vue'
    
    const colorInj = inject<Ref<string>>('colorSted')
</script>

<style scoped lang='less'>
    .box{
        width: 80px;
        height: 80px;
        border: 1px solid;
        background: v-bind(colorInj);
    }
</style>