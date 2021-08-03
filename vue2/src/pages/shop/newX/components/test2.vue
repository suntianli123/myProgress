<template>
    <div class="main2">
        测试第二个页面 + {{$store.getters.weiXinnumStr}}
    </div>
</template>
<script>
    import {mapState} from 'vuex';
    export default {
        name:'',
        data(){
            return{

            }
        },
        computed: {
            // ...mapState({
            //     weiXinnumStr: 'weiXinnumStr'
            // })
        },
        methods:{

        },
        mounted () {
        }
    }
</script>
<style lang="stylus" scoped>

</style>