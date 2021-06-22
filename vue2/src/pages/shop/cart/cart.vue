<template>
    <div class="main2">
        22222
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
        mounted () {
            this.$store.commit('weiXinToolsReadyBool', 1);
            console.log(this.weiXinToolsReadyBool);
        }
    }
</script>
<style lang="stylus" scoped>
    @import 'styl/cart.styl';
</style>