<template>
    <div class="main2">
        22222
        <button @click="toAboutFun">跳转</button>
        <div v-tive-cur="{}">
            <div>自定义</div>

            <p>12345</p>
        </div>
    </div>
</template>
<script>
    import {mapState} from 'vuex';
    import TiveCur from './tiveCur'
    export default {
        name:'cart',
        directives:{
            TiveCur
        },
        data(){
            return{

            }
        },
        computed: {
            ...mapState({
                weiXinToolsReadyBool: 'weiXinToolsReadyBool'
            })
        },
        methods:{
            toAboutFun(){
                this.$router.push({
                    path: '/userCenter/about.html',
                    query: {
                        goodId:'2121'
                    }
                });
            }
        },
        mounted () {
            this.$store.commit('weiXinToolsReadyBool', 1);
            console.log(this.weiXinToolsReadyBool);
        }
    }
</script>
<style lang="stylus" scoped>
    @import 'styl/cart.styl';
</style>