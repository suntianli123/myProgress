<template>
    <div class="main1">
        每日访问本活动1次
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
</style>