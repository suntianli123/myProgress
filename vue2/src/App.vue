<template>
  <div id="app">
    <keep-alive>
      <router-view :key="$route.name" v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"/>
  </div>
</template>

<script>

export default {
    name:'App',
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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
