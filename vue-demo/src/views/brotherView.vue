<template>
    <div class="outer1">
        <h1>兄弟组件传值</h1>
       <hr>
       <broA @emitA-fun="getFlagFn"></broA>
       <broB :flagB="Flag"></broB>
        <br>
       <hr>
       
       <h2>Mitt</h2>
       <mittA></mittA>
       <mittB></mittB>
       <hr>

       <div>{{ $envStr }}</div>
       <div>{{ $fitters.format('操作') }}</div>
    </div>
</template>
  
<script setup lang='ts'>
    import {ref, getCurrentInstance} from 'vue'

    import broA from '../components/brotherComp/broA.vue'
    import broB from '../components/brotherComp/broB.vue'

    import mittA from '../components/brotherComp/mittA.vue'
    import mittB from '../components/brotherComp/mittB.vue'

    let Flag = ref(false)
    const getFlagFn = (params: boolean) => {
        Flag.value = params
    }

    const appFn = getCurrentInstance()
    console.log(appFn?.proxy?.$fitters.format('tsss===>'))
</script>

<style scoped lang='less'>

</style>