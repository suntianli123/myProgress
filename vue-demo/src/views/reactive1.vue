<template>
    <div>
        <div>绑定表单</div>
        <form>
            <input v-model='formDemo.name' type='text'>
            <br/>
            <input v-model='formDemo.age' type='text'>
            <br/>
            <button @click.prevent='submit'>提交</button>
        </form>
    </div>
    <hr>
    <div>
        <div>绑定数组</div>
        <div :key="index" v-for="(item, index) in listDemo">
            {{item}}
        </div>
        <button @click.prevent='addDemo'>添加</button>
    </div>
    <hr>
    <div>
        <div>绑定数组2</div>
        <div :key="index" v-for="(item, index) in listDemo2.arr">
            {{item}}
        </div>
        <button @click.prevent='addDemo2'>添加</button>
    </div>
    <hr>
    <div>
        <div>只读</div>
        <div>
            {{read1.name}}
        </div>
        <button @click.prevent='readBt'>只读</button>
    </div>
    <hr>

</template>
  
<script setup lang='ts'>
    import { ref, reactive, readonly, shallowReactive } from 'vue'
    // ref 支持所有类型，  reactuve 支持引用类型 如 Array Object Map Set
    // ref 取值 赋值 需要加.value。  reactuve是不需要加.value
    // reactuve是 proxy代理， 不能直接赋值，否则会破坏响应式对象，可以通过 push + 解构方式(...xxx)
    // 也可以添加一个对象，把数组作为一个属性

    // 可以绑定表单
    let formDemo = reactive({
        name: '小明',
        age: '18'
    })

    formDemo.age = '22'
    const submit = () => {
        console.log(formDemo)
    }

    // 绑定数组
    let listDemo = reactive([1,2,3,4])
    const addDemo = () => {
        // listDemo.push('5')

        setTimeout(() => {
            let rest = ['as', 'bs', 'cs']
            listDemo.push(...rest)
            console.log(listDemo)
        }, 500);
    }

    // 绑定数组2
    let listDemo2 = reactive({arr: [1,2,3,4]})
    const addDemo2 = () => {
        // listDemo.push('5')

        setTimeout(() => {
            let rest = ['as', 'bs', 'cs']
            listDemo2.arr = rest
            console.log(listDemo)
        }, 500);
    }

    // readonly   只读
    const obj1 = reactive({name: '只读测试'})
    const read1 = readonly(obj1)
    const readBt = () => {
        read1.name = '2233'
        console.log(read1)  // 页面和console都不会改变

        obj1.name = '2233'
        console.log(read1)  // 页面和console改变了，受原始对象影响
    }

    // shallowReactive  浅层，只能修改到foot层级
    // reactive和shallowReactive都存在，shallowReactive会受reactive影响
    const shallDemo = shallowReactive({
        foot: {

        }
    })
    const editDemo = () => {
        shallDemo.foot = {name: '23545'}
    }
</script>

<style scoped lang='less'>

</style>