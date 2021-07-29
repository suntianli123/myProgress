<!--所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。-->
<!--ES6 规定，Promise对象是一个构造函数，用来生成Promise实例。-->
<!--resolve函数的作用是，将Promise对象的状态从“未完成”变为“成功”（即从 pending 变为 resolved），在异步操作成功时调用，并将异步操作-->
<!--的结果，作为参数传递出去；reject函数的作用是，将Promise对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected），在异步操-->
<!--作失败时调用，并将异步操作报出的错误，作为参数传递出去。-->
<!--Promise实例生成以后，可以用then方法分别指定resolved状态和rejected状态的回调函数。-->

<template>
    <div>
        promise
    </div>
</template>

<script>
    export default {
        name:'promise',
        data () {
            return {

            }
        },
        methods:{
            esTest3(){
                return new Promise((resolve, reject) => {
                    this.info1 = 1;
                    this.info2 = 2;
                    resolve(this.info1);
                    reject(this.info2);
                    // reject('失败');
                }).then(value => {
                    // 处理成功的
                    console.log(value)
                },reason => {
                    // 处理失败的
                    console.log(this.info2)
                }).then(value => {
                    console.log(this.info1)
                },reason => {
                    console.log(this.info2)
                });
            },
            esTest4(){
                function runAsync1(){
                    var p = new Promise(function(resolve, reject){
                        //做一些异步操作
                        setTimeout(function(){
                            console.log('异步任务1执行完成');
                            resolve('随便什么数据1');
                        }, 1000);
                    });
                    return p;
                }
                function runAsync2(){
                    var p = new Promise(function(resolve, reject){
                        //做一些异步操作
                        setTimeout(function(){
                            console.log('异步任务2执行完成');
                            resolve('随便什么数据2');
                        }, 1000);
                    });
                    return p;
                }
                function runAsync3(){
                    var p = new Promise(function(resolve, reject){
                        //做一些异步操作
                        setTimeout(function(){
                            console.log('异步任务3执行完成');
                            resolve('随便什么数据3');
                        }, 1000);
                    });
                    return p;
                }
                runAsync1()
                    .then(function(data){
                        console.log(data);
                        return runAsync2();
                    })
                    .then(function(data){
                        console.log(data);
                        return runAsync3();
                    })
                    .then(function(data){
                        console.log(data);
                    });
            },
            esTest5(){
                function getNumber(){
                    var p = new Promise(function(resolve, reject){
                        //做一些异步操作
                        setTimeout(function(){
                            var num = Math.ceil(Math.random()*10); //生成1-10的随机数
                            if(num<=5){
                                resolve(num);
                            }
                            else{
                                reject('数字太大了');
                            }
                        }, 1000);
                    });
                    return p;
                }

                getNumber()
                    .then(data => {
                            console.log('resolved');
                            console.log(data);
                        },(reason, data) => {
                            console.log('rejected');
                            console.log(reason);
                        }
                    );
            }

        },
        mounted () {
            // this.esTest3();
            this.esTest4();
            // this.esTest5();
        }
    }
</script>

<style scoped>

</style>