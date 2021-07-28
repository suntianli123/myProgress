<template>
    <div>
        <input type="text" v-model="nums" class="add_input">
        <button @click="addFun">添加</button>
    </div>
</template>
<script>
    export default {
        name:'',
        data () {
            return {
                nums:''
            }
        },
        computed: {

        },
        methods:{
            addFun(){
                this.$emit('addFun',this.nums)
            }
        },
        mounted () {

        }
    }
</script>
<style lang="stylus" scoped>
    .add_input{
        width:100px;
        height:20px;
        border:1px solid;
    }
</style>