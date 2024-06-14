<template>
    <div>{{ list1 }}</div>
    <div>toRef后的值 {{ toRef1 }}</div>
    <div>{{ name }} -- {{age}}</div>
    <button @click="change">修改</button>
</template>
  
<script setup lang='ts'>
    import { toRef ,toRefs,reactive,ref,toRaw  } from 'vue'
    // tpRef只能修改响应式对象的值
    const list1 = reactive({name: '小明', age: '18'})
    const toRef1 = toRef(list1, 'age')
    const change = () => {
        toRef1.value = '23'
        console.log(toRef1)
    }

    const {name, age} = toRefs(list1)

    // toRaw，将reactive、ref的响应式对象变为  非响应式的值


    // 响应式原理
    /*
    vue2 使用的是 Object.definePriperty
    对象只能劫持设置好的值，新增需要Vue.Set(xxx)。数组是重写，修改数组也无法劫持

    vue3 使用的是 Proxy
    
    */

    const reactiveDemo = (target) => {
    return new Proxy(target, {
        get(target, key, receiver) {
            let res = Reflect.get(target, key, receiver)
            return res
        },
        set(target, key, value, receiver) {
            let res = Reflect.set(target, key, value, receiver)
            return res
        },
    })
   }

   let activeEffect
    const effectD = (fn) => {
    const _effect = function () {
        activeEffect = _effect
        fn()
    }
    effectD()
   }

   const targetMap = new WeakMap()
    const trackD = (target, key) => {
    let depsMap = targetMap.get(target)
    if (!depsMap) {
        depsMap = new Map()
        targetMap.set(target, depsMap)
    }
   }
</script>

<style scoped lang='less'>

</style>