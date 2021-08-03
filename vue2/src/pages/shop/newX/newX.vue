<template>
    <div class="main2">
        <div>22222 + {{$store.getters.weiXinnumStr}}</div>
        <Test-A></Test-A>
        <Test-B></Test-B>
        <button @click="addFun">增加</button>
        <button @click="jianFun">减少</button>
    </div>
</template>
<script>
    import TestA from './components/test1.vue'
    import TestB from './components/test2.vue'
    export default {
        name:'newX',
        components:{
            TestA,
            TestB
        },
        data(){
            return{

            }
        },
        computed: {

        },
        methods:{
            addFun(){
                this.$store.commit('addNumStr',3)
            },
            jianFun(){
                this.$store.dispatch('jianNumSetTime',2)
            }
        },
        mounted () {
            // console.log(this.weiXinnumStr);
            let that = this;
        }
    }
</script>
<style lang="stylus" scoped>

</style>