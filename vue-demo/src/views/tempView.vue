<template>
    <div class="div1">
        1111
        <Teleport :disabled="true" to="body">
            <demoDiv></demoDiv>
        </Teleport>
        
    </div>
</template>
  
<script setup lang='ts'>
    import {markRaw, reactive, ref} from 'vue'
    import demoDiv from '../components/demo2.vue'
    // Teleport 改变子组件的层级，将子组件放到body元素下
</script>

<style scoped lang='less'>
    .div1{
        height: 500px;
        background: blue;
        color: white;
        position: relative;
    }
</style>