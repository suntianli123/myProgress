<template>
    <div class="outer1">
        <h1>优化</h1>
       <hr>

    </div>
</template>
  
<script setup lang='ts'>
    // 1、使用谷歌浏览器，右键---检查---Lighthouse, 分析页面加载情况

    // 2、npm install rollup-plugin-visualizer
    // 在vite.config.ts 引入  import {visualizer} from 'rollup-plugin-visualizer',
    // plugins 数组里添加  visualizer({open: true})
    // 然后进行打包，在打包完成后会弹出网页，展示项目中所用的资源，分析打包完整体的代码块，可以优化下根据占比进行按需引用

    // 3、离线缓存
    // npm install vite-plugin-pwa

    //4、vite build打包优化

    // 5、 图片懒加载，下载vue-lazy,  v-lazy=''

    // 虚拟列表， element-plus 实现了，可以直接用，Virtualized table虚拟列表，在可视化列表展示dom，其他dom删除掉了
    // 后台返回几万条数据，怎么处理

    // 6、多线程 worker.postMessage
    // 可以操作数据，不能操作dom

    // 7、防抖节流，  VueUse库里集成了


    // 跨域
    // 浏览器同源策略限制，请求一个url 协议、域名、端口有不同的时候，即为跨域
    // 1、jsonp，动态创建一个srcipt标签解决，然后接收一个回调函数，注意是get请求
    // 2、 cors 后端设置
    // { 'Access-Control-Allow-Origin': 'http://xx.xx.xx' }
    // proxy代理
    // 下载 express
</script>

<style scoped lang='less'>

</style>