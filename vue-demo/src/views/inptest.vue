<template>
    <div>
        <h1>处理数据</h1>
        <hr/><br/>
        <div>
            <div>
                <h4>总数：{{total}}</h4>
                <br/>
                
                <div v-for="(item, index) in dataOther" :key="index">
                    其他数据：{{item.weight}}
                </div>
                <br/>
                当前数据：<input v-model='inputDate.weight' type='text' @change="toChangeFn">
            </div>
        </div>
      
        <div @click='toTreeFun'> 变为多维数组传回去 </div>
    </div>

</template>
  
<script setup lang='ts'>
    import { ref, reactive} from 'vue'
    // ref 支持所有类型，  reactuve 支持引用类型 如 Array Object Map Set
    // ref 取值 赋值 需要加.value。  reactuve是不需要加.value
    // reactuve是 proxy代理， 不能直接赋值，否则会破坏响应式对象，可以通过 push + 解构方式(...xxx)
    // 也可以添加一个对象，把数组作为一个属性

    // 可以绑定表单
    let arr = [
        {
            "expand": true,
            "name": "领导",
            "id": "1",
            "parent_id": "0",
            "children": [
                {
                    "name": "张组长",
                    "id": "440",
                    "expand": true,
                    "parent_id": "1",
                    "children": [
                        {
                            "parent_id": "440",
                            "id": "443",
                            "name": "组员1-1",
                            "level": 3,
                            "weight": 30
                        }
                    ]
                },
                {
                    "name": "李组长",
                    "id": "444",
                    "expand": true,
                    "parent_id": "1",
                    "children": [
                        {
                            "parent_id": "444",
                            "id": "446",
                            "name": "组员2-1",
                            "level": 3,
                            "weight": 30
                        },
                        {
                            "parent_id": "444",
                            "id": "452",
                            "name": "组员2-2",
                            "level": 3,
                            "weight": 40
                        }
                    ]
                }
            ]
        }
    ]

    const treeToArr = (data, arr) => {
        data.forEach((el) => {
            const temp = JSON.parse(JSON.stringify(el))
            delete temp.children
            arr.push(temp)
            if (el.children && el.children.length) {
                treeToArr(el.children, arr)
            }
        })
        return arr
    }

    const arrList = treeToArr(arr, [])

    console.log(arrList)

    const dataIndex = arrList.findIndex((item) => item.id == 446)

    // 当前id的数据
    const inputDate = reactive(arrList[dataIndex])
    let oldStr = inputDate.weight

    // 和当前id同属一个parent_id下的其他数据
    const dataOther = arrList.filter((item) => item.parent_id == arrList[dataIndex].parent_id && item.id != 446)
    const inputOther = reactive(dataOther)
    console.log(dataOther)

    let total = ref(0)
    let otherTotal = 0
    dataOther.forEach((item) => {
        otherTotal = otherTotal + Number(item.weight)
    })
    total.value = otherTotal + Number(inputDate.weight)

    
    const toChangeFn = (event) => {
        let totaStr = otherTotal  + Number(event.target.value)
        if (totaStr >= 100) {
            console.log('超过100', total)
            setTimeout(() => {
                event.target.value = oldStr
                inputDate.weight = oldStr
            }, 0);
        } else {
            console.log('没有超过100', total)
            oldStr = event.target.value
            console.log(oldStr)
            total.value = totaStr
        }

    }


    // 一维数组变成多维数组
    const arrToTree = async (data: any) => {
        const res: any[] = []
        const map = {}
        if (!Array.isArray(data)) {
            return res
        }
        // @ts-ignore
        // eslint-disable-next-line no-return-assign
        data.forEach(item => (map[item.id] = item))

        data.forEach(el => {
            // @ts-ignore
            // eslint-disable-next-line no-return-assign
            const parent = map[el.parent_id]
            if (parent) {
            if (!Array.isArray(parent.children)) {
                parent.children = []
            }
            parent.children.push(el)
            } else {
                res.push(el)
            }
        })
        return res
    }

    const toTreeFun = () => {
        // 将字符串类型变成数字类型
        arrList[dataIndex].weight = Number(arrList[dataIndex].weight)
        const newArr = JSON.parse(JSON.stringify(arrList))
        const treeArr = arrToTree(newArr)
        console.log('变为多维数组', treeArr)
    }
</script>

<style scoped lang='less'>

</style>