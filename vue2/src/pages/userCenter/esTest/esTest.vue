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
            }
        },
        mounted () {
            this.esTest1();
            this.esTest2();

            // 返回给定数字中的最大值
            // const values = [99, 100, -1, 48, 16];
            // console.log( Math.max(...values) );
        }
    }
</script>

<style scoped>

</style>