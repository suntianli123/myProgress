<template>
    <div class="outer1">
        <div>transtion组件</div>
        <hr>
        <button @click="flag = !flag">动画</button>

        <transition name="flagAni"
            appear
            appear-from-class="app-from"
            appear-active-class="app-active"
            appear-to-class="app-ento"
        >
            <div class="boxDiv" v-if="flag"></div>
        </transition>
        <div style="margin: 20px 0;"></div>

        <transition enter-from-class="flQ-enfrom" enter-active-class="flQ-enactive" enter-to-class="flQ-ento" name="flagAniQ">
            <div class="boxDiv" v-if="flag"></div>
        </transition>
        <div style="margin: 20px 0;"></div>

        <div>
            <div>平滑过渡</div>
            <hr>
            <input v-model="numStr.current" step="20" type="number">
            <div>{{ numStr.tweededNumber.toFixed(0) }}</div>
        </div>

    </div>
</template>
  
<script setup lang='ts'>
    import { watch, reactive, ref} from 'vue'
    import gsap from 'gsap'
    const flag = ref<boolean>(true)

    const numStr = reactive({
        current: 0,
        tweededNumber: 0
    })
    watch(() => numStr.current,(newVal, oldVal) => {
        gsap.to(numStr, {
            duration: 1,
            tweededNumber: newVal
        })
    })
</script>

<style scoped lang='less'>
    .boxDiv{
        width: 200px;
        height: 200px;
        background: red;
    }
    .flagAni-enter-from {
        width: 0;
        height: 0;
    }
    .flagAni-enter-active {
        transition: all 1.5s ease;
        animation-fill-mode: forwards;
    }
    .flagAni-enter-to {
        width: 200px;
        height: 200px;
        background: blue;
    }
    .flagAni-leave-from {
        width: 200px;
        height: 200px;
    }
    .flagAni-leave-active {
        transition: all 2s ease;
    }
    .flagAni-leave-to {
        width: 0;
        height: 0;
    }

    .flQ-enfrom {
        width: 0;
        height: 0;
    }
    .flQ-enactive {
        transition: all 1.5s ease;
    }
    .flQ-ento {
        width: 200px;
        height: 200px;
        background: blue;
    }
    .flQ-lefrom {
        width: 200px;
        height: 200px;
    }
    .flQ-leactive {
        transition: all 2s ease;
    }
    .flQ-leto {
        width: 0;
        height: 0;
    }

    .app-from {
        width: 0;
        height: 0;
    }
    .app-active {
        transition: all 1.5s ease;
    }
    .app-ento {
        width: 200px;
        height: 200px;
        background: blue;
    }
</style>