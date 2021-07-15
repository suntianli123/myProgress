<template>
    <div>
        eseses
    </div>
</template>

<script>
    export default {
        name:'esTest',
        data () {
            return {
                strInfo:'前缀'
            }
        },
        methods:{
            // 新模板字符串
            esTest1(){
                let cot = `${this.strInfo}11111`;
                // console.log(cot)
            },
            // 箭头函数
            esTest2(){
                function fn1(){
                    // console.log(111)
                }
                let fn2 = () =>{
                    // console.log(222)
                }
                fn1();
                fn2();
            },
            // 构造器
            esClass(){
                // 构造器
                class Person {
                    constructor(name,age){
                        this.name = name;
                        this.age = age
                    }
                    toString() {
                        console.log('name:' + this.name + ',age:' + this.age);
                    }
                }
                const p1 = new Person('tom',18)
                p1.toString();
            }
        },
        mounted () {
            this.esTest1();
            this.esTest2();
            this.esClass();

            // 返回给定数字中的最大值
            // const values = [99, 100, -1, 48, 16];
            // console.log( Math.max(...values) );


        }
    }
</script>

<style scoped>

</style>