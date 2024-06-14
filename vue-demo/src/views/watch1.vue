<template>
    <div>
        <div>watchh监听</div>
        <form>
            <input v-model='message.foo.bar.name' type='text'>
            <br/>
            <input v-model='message.foo.bar.age' type='text'>
            <br/>
        </form>
    </div>
    <hr>
    

</template>
  
<script setup lang='ts'>
    import { ref, reactive, watch } from 'vue'
    // ref 数据类型复杂时，需要开启deep监听，reactive则不需要开启deep
    let message = reactive({
        foo: {
            bar : {
                name: '小明',
                age: 20
            }
        }
    })
    let message2 = ref('小张')
    // watch([message, message2], (newVal, oldVal)=> {
    //     console.log(newVal, oldVal)
    // }, {
    //     deep: true  // 深度监听
    // })

    // 监听对象里单一属性
    watch(()=> message.foo.bar.name, (newVal, oldVal)=> {
        console.log(newVal, oldVal)
    }, {
        // deep: true,  // 深度监听
        // immediate: true  // 默认是false, 开启后渲染时会先走一遍watch的方法
        // flush:'pre' // pre 组件更新之前调用， sync 同步执行，post 组件更新之后执行
    })
</script>

<style scoped lang='less'>

</style>