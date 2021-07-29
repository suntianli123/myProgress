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
                        this.age = age;
                    }
                    toString() {
                        console.log(`名叫${this.name},年龄为${this.age}`);
                    }
                }
                const p1 = new Person('tom',18);
                const p2 = new Person('Jerry',22);
                p1.toString();
                p2.toString();

                // 继承
                class Student extends Person{
                    constructor(name,age,grade){
                        super(name,name);
                        this.grade = grade
                    }
                    // 重写从父类继承过来的方法
                    toString() {
                        console.log(`名叫${this.name},年龄为${this.age},读的年级${this.grade}`);
                    }
                }
                const s1 = new Student('Tony','14','初一')
                s1.toString();
            },
            // ...展开运算符
            esPoint(){
                let arr1 = [1,3,5,7,9];
                let arr2 = [2,4,6,8];
                let arr3 = [...arr1,...arr2];   // 连接数组
                console.log(...arr3);
                function sum(...number){
                    return number.reduce((preeValue,currentValue)=>{
                        return preeValue + currentValue
                    })
                }
                console.log(sum(1,2,3,4))
                let person = {name:'tom',age:18};
                let person2 = {...person,name:'Jerry'};  // 加{}是克隆复制一个对象，这样复制改变一个另一个不改变
                console.log(person);
                console.log(person2)
            },
            // Promise


        },
        mounted () {
            // this.esTest1();
            // this.esTest2();
            // this.esClass();
            // this.esPoint();

            // 返回给定数字中的最大值
            // const values = [99, 100, -1, 48, 16];
            // console.log( Math.max(...values) );


        }
    }
</script>

<style scoped>

</style>