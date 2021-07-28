<template>
    <div class="outer">
        <My-Input @addFun="addFun"></My-Input>
        <My-List :list="list" class="title_list"></My-List>
    </div>
</template>
<script>
    import MyInput from './components/myInput';
    import MyList from './components/myList';
    export default {
        name:'emit',
        components:{
            MyInput,
            MyList
        },
        data () {
            return {
                list:[
                    {
                        id:1,
                        name:'标题1'
                    },
                    {
                        id:2,
                        name:'标题2'
                    }
                ]
            }
        },
        methods:{
            addFun(name){
                this.list.push({
                    id:Math.random(),
                    name
                })
            }
        },
        mounted () {

        }
    }
</script>
<style lang="stylus" scoped>
    .title_list{
        font-size 14px
    }
    .outer{
        padding-left:50px;
    }
</style>