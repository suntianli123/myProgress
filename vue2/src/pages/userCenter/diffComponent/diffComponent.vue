<!-- 异步组件，在需要是发出ajax请求来下载对应组件的代码 -->
<template>
    <div>
        <div class="p1">异步组件</div>
        <button @click="showFun1">按钮1</button>
        <button @click="showFun2">按钮2</button>
        <div v-if="active == 1">
            <child1></child1>
        </div>
        <div v-if="active == 2">
            <child2></child2>
        </div>
        <button @click="toastFun">toast按钮</button>
        <button @click="toJumpFun">跳转到diffJian</button>
    </div>
</template>

<script>
    import 'vant/es/toast/style';
    export default {
        name:'diffComponent',
        data(){
            return {
                active:'-1'
            }
        },
        created(){

        },
        components:{
            child1: () => import(/* webpackChunkName:'child1' */  './components/child1'),
            child2: () => import(/* webpackChunkName:'child2' */  './components/child2')
        },
        methods:{
            showFun1(){
                this.active = 1;
            },
            showFun2(){
                this.active = 2;
            },
            toastFun(){
                this.$toast({
                    message: '该商品不支持此处购买',
                    duration: 2000
                });
            },
            toJumpFun(){
                this.$router.push('/userCenter/diffJian.html');
            }
        }
    }
</script>

<style scoped>
    .p1{
        font-size: 12px;
        height: 30px;
    }
</style>