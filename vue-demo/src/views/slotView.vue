<template>
    <div style="padding: 5px 0 10px;">slot 插槽</div>

    <Dialog>
        <!-- <template v-slot:slotDiv1>
            <div>插入匿名插槽</div>
        </template> -->
        <template #slotDiv1>
            <div>插入匿名插槽</div>
        </template>
        <template v-slot:slotDiv2>
            <div>插入具体名字插槽</div>
        </template>

        <!-- <template v-slot="{slotItem}">
            <div>{{ slotItem.name }}</div>
        </template> -->
        <template #default="{slotItem}">
            <div>{{ slotItem.name }}</div>
        </template>

        <template v-slot:[slotName]>
            <div>动态插槽</div>
        </template>
    </Dialog>
</template>
  
<script setup lang='ts'>
    //  v-slot="{slotItem}" 作用域插槽和  匿名插槽v-slot不能同时出现，会报错
    import {markRaw, reactive, ref} from 'vue'

    import Dialog from '../components/dialog.vue'

    // 动态插槽
    const slotName = ref('slotDiv4')
</script>

<style scoped lang='less'>

</style>