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
            console.log(this.$attrs);
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