<template>
    <div>
        eseses6
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
                console.log(cot)
            },
            // 箭头函数
            esTest2(){
                function fn1(){
                    console.log(111)
                }
                let fn2 = () =>{
                    console.log(222)
                }
                fn1();
                fn2();
            }
        },
        mounted () {
            this.esTest1();
            this.esTest2();
        }
    }
</script>

<style scoped>

</style>