<template>
    <div>
        <div>watchh监听</div>
        <div>
            <input v-model='message.foo.bar.name' type='text'>
            <br/>
            <input v-model='message.foo.bar.age' type='text'>
            <br/>
        </div>
    </div>
    <hr>
    
    <div>
        <div>watchhEffect监听</div>
        <div>
            <input id='ipt' v-model='wteffect1' type='text'>
            <br/>
            <input v-model='wteffect2' type='text'>
            <br/>
        </div>
        <div>
            <button @click='stopWtEffect'>停止监听</button>
        </div>
    </div>
</template>
  
<script setup lang='ts'>
    import { ref, reactive, watch, watchEffect } from 'vue'
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
        // immediate: true  // 默认是false, 一进页面就会触发一遍
        // flush:'pre' // pre 组件更新之前调用， sync 同步执行，post 组件更新之后执行
    })


    // watchEffect  高级监听器, 一进页面就会触发
    let wteffect1 = ref('高铁') 
    let wteffect2 = ref('动车') 

    // watchEffect(() =>{
    //     console.log('watchEffect---', wteffect1.value)
    //     console.log('watchEffect---', wteffect2.value)
    // })
    const stopFun = watchEffect((oninvalidate) =>{
        console.log('watchEffect---', wteffect1.value)
        // console.log('watchEffect---', wteffect2.value)

        let ipt: HTMLInputElement = document.querySelector('#ipt') as HTMLInputElement
        console.log(ipt, 'elll')
        oninvalidate(() =>{ // 监听触发前，先出法before
            console.log('before')
        })

    }, {
        flush: 'post', // pre 组件更新之前调用， sync 同步执行，post 组件更新之后执行
        onTrigger(e) {
            debugger    // 触发调试debug的功能
        }
    })
    
    const stopWtEffect = ()=> stopFun() // 停止监听
</script>

<style scoped lang='less'>

</style>