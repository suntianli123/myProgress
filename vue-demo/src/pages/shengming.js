vue2生命周期
创建前后，挂在前后，更新前后，销毁前后(生命周期钩子都是同步操作的)

beforeCreate: 实例化创建之初，初始化父子关系及事件，数据观测（data observer）之前被调用，用此方法一般编写插件时候会用到像是vuex的。
created：组件已经创建完成。还没有$el，还没有元素挂载，还没有dom渲染，
beforeMount：组件挂在之前，
mounted：组件挂在之后，元素挂载完成，可以获取dom，可以调用接口，但其实时间差别不大
beforeUpdate: 数据发生变化，更新之前
updated: 数据发生变化更新后
beforeDestroy：实例销毁前，清除定时器，移除事件绑定
destroyed：销毁后
actibated: keep-alive 组件激活
deactibated: keep-alive 组件停用
errorCaptured: 捕获实例的错误


vue3 差别不大
刚开始多了setup
销毁变为  beforeUnmount和unmounted
多了errorCapured 错误时调用，调试
前缀都加了on，但是没有onBeforeCreate和onCreated

