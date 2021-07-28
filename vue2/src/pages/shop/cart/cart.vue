<template>
    <div class="main2">
        22222
        <button @click="toAboutFun">跳转</button>
    </div>
</template>
<script>
    import {mapState} from 'vuex';
    export default {
        name:'cart',
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