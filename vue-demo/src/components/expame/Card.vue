<template>
    <div class="cardDiv">
        <header>
            <div>标题</div>
            <div @click.stop="clickFun(1, $event)">标题</div>
        </header>

        <section>
            内容
        </section>
    </div>

   
</template>
  
<script setup lang='ts'>
    import { onMounted, ref } from 'vue'

    const clickFun =(num: number, e)=>{
        console.log(e.target)
    }
    // scoped, 作用域,  只在这个文件中起作用
</script>
<style scoped lang='less'>

    .cardDiv{
        border: 1px solid #333;
        width: 400px;
        header{
            display: flex;
            justify-content: space-between;
            padding: 5px;
            border-bottom: 1px solid #333;
        }
        section {
            padding: 5px;
            min-height: 300px;
        }
    }
</style>