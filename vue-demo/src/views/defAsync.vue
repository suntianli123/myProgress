<template>
    <div class="fuDiv">
        异步组件

        <Suspense>
            <template #default>
                <syncView></syncView>
            </template>
            <template #fallback>
                <syncDefault></syncDefault>
            </template>
        </Suspense>
    </div>
</template>
  
<script setup lang='ts'>
    import {ref, defineAsyncComponent} from 'vue'
    import syncDefault from '../components/expamet/syncDefault.vue'
    const syncView = defineAsyncComponent(() => import('@/components/expamet/syncView.vue'))



</script>

<style scoped lang='less'>
    .fuDiv{
        height: 100%;
    }
</style>