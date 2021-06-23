<template>
  <div id="app" class="wrap">
    <keep-alive>
      <router-view :key="$route.name" v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"/>
  </div>
</template>

<script>
    import {mapState} from 'vuex';

export default {
    name:'App',
    computed: {
        ...mapState({
            weiXinToolsReadyBool: 'weiXinToolsReadyBool',
        })
    },
    data() {
        return {
            freeByRoutesArr: [
                '/userCenter/about.html',
            ],
        }
    },
    watch: {

    },
    methods:{

    }

}
</script>

<style lang="stylus">
  @import '~@/assets/styles/common.styl'

</style>
