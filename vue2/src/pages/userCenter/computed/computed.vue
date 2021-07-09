<template>
    <!-- 计算属性，对数据计算与缓存；计算属性与methods的区别（计算属性有缓存） -->
    <div>
        <div class="p1">{{reseverStr}}</div>
        <div class="p1">{{reseverStr}}</div>
        <div class="p1">{{reseverStr}}</div>
        <div class="p1">{{reseverFun()}}</div>
        <div class="p1">{{reseverFun()}}</div>
        <div class="p1">{{reseverFun()}}</div>
        <div class="p1">{{reseverFun()}}</div>
        <div class="p1">{{reseverFun()}}</div>
    </div>
</template>
<script>
    export default {
        name:'computed',
        data () {
            return {
                strInfo:'abc'
            }
        },
        computed: {
            // 计算属性（缓存）
            reseverStr(){
                console.log(Date.now(),'计算属性的computed');
                return this.strInfo.split('').reverse().join('') + '--计算属性的computed：' + Date.now()
            }
        },
        methods:{
            reseverFun(){
                console.log(Date.now(),'普通的methods');
                return this.strInfo.split('').reverse().join('') + '--普通的methods：' + Date.now()
            }
        },
        mounted () {

        }
    }
</script>
<style lang="stylus" scoped>
    .p1{
        font-size: 14px;
    }
</style>