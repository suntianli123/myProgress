<template>
    <div>
        <div class="main1">
            每日访问本活动1次
            <div @click="toCartFun">入口</div>
        </div>

        <div class="p1">{{reseverStr}}</div>
        <div class="p1">
            <button @click="fuAddFun">触发子组件数量增加按钮</button>
            <button @click="fuColorFun">修改子组件字体颜色按钮</button>
            <Child style="color:blue" :name="name" :sex="sex" :age="age" ref="addChild"></Child>
        </div>
        <div class="pest_Div" ref="pest_Div">获取dom元素</div>
    </div>
</template>
<script>
    import {mapState} from 'vuex';
    import Child from '../child/child';
    export default {
        name:'about',
        components:{
            Child
        },
        data () {
            return {
                info1:0,
                info2:0,
                info3:0,
                strInfo:'aaabbb123',
                name:'张三',
                sex:'男',
                age:'20',
                goodId:this.$route.query.goodId,
            }
        },
        computed: {
            ...mapState({
                weiXinToolsReadyBool: 'weiXinToolsReadyBool'
            }),
            // 计算属性（缓存）
            reseverStr(){
                return this.strInfo.split('').reverse().join('')
            }
        },
        methods:{
            getDomFun(){
                console.log(this.$refs.pest_Div.innerText)
            },
            fuAddFun(){
                console.log(this.$refs.addChild);
                this.$refs.addChild.addNum();
            },
            fuColorFun(){
                console.log(this.$refs.addChild.$el);
                this.$refs.addChild.$el.style = 'color:red';
            },
            toCartFun(){
                this.$router.push('/shop/cart.html');
            },
            //所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。
            //ES6 规定，Promise对象是一个构造函数，用来生成Promise实例
            fun1(){
                return new Promise((resolve) => {
                    /* 你的逻辑代码 */
                    // console.log(0);
                    this.info1 = 1;
                    resolve(this.info1)
                });
            },
            fun2(){
                return new Promise((resolve) => {
                    /* 你的逻辑代码 */
                    // console.log(this.info1);
                    if(this.info1 == 1){
                        this.info2 = 2;
                    }
                    resolve(this.info2)
                });
            },
            fun3(){
                return new Promise((resolve) => {
                    /* 你的逻辑代码 */
                    // console.log(this.info2);
                    if(this.info2 == 2){
                        this.info3 = 3;
                    }
                    resolve(this.info3)
                });
            },
            runAll(){
                Promise.all([
                    this.fun1(),
                    this.fun2(),
                    this.fun3()
                ]).then(res => {
                    console.log(res);
                    // console.log("runAll");
                })
            },
            runAllSettled(){
                Promise.allSettled([
                    this.fun1(),
                    this.fun2(),
                    this.fun3()
                ]).then(res => {
                    console.log(res);
                    console.log(res[0].value);
                    // console.log("runAll");
                })
            }
        },
        mounted () {
            // this.runAll();
            // this.runAllSettled();
            this.getDomFun();
            // console.log(this.weiXinToolsReadyBool);
        }
    }
</script>
<style lang="stylus" scoped>
    @import '/styl/about.styl';
    .main1{
        font-size: 14px;
        color: #FEE453;
        width: 325px;
        height: 60px;
        background: #F94B05 linear-gradient(154deg, #FF8B18 0%, #FF4600 100%);
        border-radius: 8px;
        display: flex;
        align-self: center;
        font-weight: 700;
        margin: 0 auto;
    }
    .p1{
        font-size: 20px;
    }
</style>