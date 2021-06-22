<template>
    <div class="main1">
        11111
        <div @click="toCartFun">入口</div>
    </div>
</template>
<script>
    import {mapState} from 'vuex';
    export default {
        name:'about',
        computed: {
            ...mapState({
                weiXinToolsReadyBool: 'weiXinToolsReadyBool'
            })
        },
        data () {
            return {

            }
        },
        methods:{
            toCartFun(){
                this.$router.push('/shop/cart.html');
            }
        },
        mounted () {
            console.log(this.weiXinToolsReadyBool);
        }
    }
</script>
<style  scoped>
    @import '/styl/about.styl';
</style>