<template>
    <div class="outer1">
        <h3>B组件</h3>
        {{ flagB }}
       
    </div>
</template>
  
<script setup lang='ts'>

    defineProps({
        flagB: Boolean
    })

</script>

<style scoped lang='less'>

</style>