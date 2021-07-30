<!-- 异步组件，在需要是发出ajax请求来下载对应组件的代码 -->
<template>
    <div>
        <div>异步组件</div>
        <button @click="showFun1">按钮1</button>
        <div v-if="active == 1">
            <AsyncList></AsyncList>
        </div>

    </div>
</template>

<script>
    import Loading from './components/loading'
    import Error from './components/error'
    // 异步组件工程函数
    const AsyncList = () => ({
        component:import(/* webpackChunkName:'child1' */'./components/child1'),
        loading:Loading,
        error:Error,
        delay:200,      // 延迟200毫秒展示Loading组件
        timeout:2000    // 2000毫秒还没展示child1组件，则展示Error
    })
    export default {
        name:'diffJian',
        data(){
            return {
                active:'-1'
            }
        },
        created(){

        },
        components:{
            AsyncList
        },
        methods:{
            showFun1(){
                this.active = 1;
            },
            showFun2(){
                this.active = 2;
            }
        }
    }
</script>

<style scoped>

</style>