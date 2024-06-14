<template>
    <div>
        <div>computed</div>
        <div>
            <input v-model='name' type='text'>
            <br/>
            <input v-model='age' type='text'>
            <br/>
            <button @click='submit'>提交</button>
        </div>
        <div>完整信息：{{allInfo}}</div>
        <div>完整信息2：{{allInfo2}}</div>
    </div>
    <hr>

    <table border width='600px' cellpadding='0' cellspacing='0'>
        <thead>
            <tr>
                <th>物品名称</th>
                <th>物品单价</th>
                <th>物品数量</th>
                <th>物品总价</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
            <tr :key='index' v-for="(item, index) in data">
                <td align='center'>{{item.name}}</td>
                <td align='center'>{{item.price}}</td>
                <td align='center'>
                    <button @click="item.num > 1 ? item.num-- : null">-</button>
                    {{item.num}}
                    <button @click="item.num < 99 ? item.num++ : null">+</button>
                </td>
                <td align='center'>{{item.num * item.price}}</td>
                <td align='center'><button @click='del(index)'>删除</button></td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td colspan='5' align='right'>
                    总价： {{totalNum}}
                </td>
            </tr>
        </tfoot>
    </table>


  </template>
  
  <script setup lang='ts'>
    import {ref, computed, reactive  } from 'vue'
    let name: any = ref('小明')
    let age: any = ref('18')
    const submit = () => {
        name.value = '小峰'
    }
    // 选项式写法
    let allInfo = computed({
        get() {
            return name.value + '-' + age.value
        },
        set(newVal) {
            [name.value] = newVal
        }
    })

    // 函数式写法，只支持getter函数，不能修改值
    let allInfo2 = computed(() => name.value + '-' + age.value)


    let data = reactive([
        {
            name: '商品1',
            price: '10',
            num: '2'
        },
        {
            name: '商品2',
            price: '50',
            num: '2'
        },
        {
            name: '商品3',
            price: '100',
            num: '3'
        },
    ])

    let totalNum = computed(() => {
        return data.reduce((prev, next) => {
            return prev + next.num * next.price
        }, 0)
    })
    
    const del = (index) => {
        data.splice(index, 1)
    }
  </script>
  
  <style scoped lang='less'>
  
  </style>