<template>
    <div>
        <ul>
            <li v-for="(item,index) in list" :key="index">{{item.name}}</li>
        </ul>
    </div>
</template>
<script>
    export default {
        name:'',
        data () {
            return {

            }
        },
        props:['list'],
        methods:{

        },
        mounted () {

        }
    }
</script>
<style lang="stylus" scoped>

</style>