<template>
    <div>
        <div class="p1">子组件：{{name}}</div>
        <div class="p1">数量：{{num}}</div>
    </div>
</template>

<script>
    export default {
        props:['name'],
        data(){
            return {
                num:100
            }
        },
        created(){
            // $attrs：输出除了name之外所有传递过来的数据
            console.log('child---',this.$attrs);
        },
        methods:{
            addNum(){
                this.num++;
            }
        }
    }
</script>

<style scoped>

</style>