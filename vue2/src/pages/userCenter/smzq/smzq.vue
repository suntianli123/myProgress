<template>
    <div>
        <div class="pest_Div" ref="pest_Div">{{msg}}</div>
        <button @click="changeFun">按钮</button>
    </div>

</template>
<script>
    export default {
        name:'smzq',
        data () {
            return{
                msg:'生命周期'
            }
        },
        methods:{
            changeFun(){
                this.msg = '1111'
            }
        },
        // beforeCreate与created区别，beforeCreate里this.msg是undefined，而created是有值的
        beforeCreate(){
            console.log('beforeCreate');
            console.log('beforeCreate',this.msg)
        },
        created(){
            console.log('created');
            console.log('created',this.msg);
        },
        // created和mounted的区别，reated无法操作DOM,mounted结束是才可以
        beforeMount(){
            console.log('beforeMount')
        },
        mounted(){
            console.log('mounted');
            console.log('mounted',this.$refs.pest_Div.innerText);
        },
        beforeUpdate(){
            console.log('beforeUpdate')
        },
        updated(){
            console.log('updated')
        },
        beforeDestroy(){
            // 清除定时器用在这里
            console.log('beforeDestroy')
        },
        destroyed(){
            console.log('destroyed')
        }

    }
</script>