vue2生命周期
创建前后，挂在前后，更新前后，销毁前后(生命周期钩子都是同步操作的)

beforeCreate: 实例化创建之初，初始化父子关系及事件，数据观测（data observer）之前被调用，用此方法一般编写插件时候会用到像是vuex的。
created：组件已经创建完成。还没有$el，还没有元素挂载，还没有dom渲染，无法获取dom
beforeMount：组件挂在之前，
mounted：组件挂在之后，元素挂载完成，可以获取dom。 可以调用接口，但其实时间差别不大
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



1、进入最贱会执行那些生命周期
beforeCreate
created
beforeMount
mounted

2、父子组件生命周期执行顺序
父：beforeCreate、created、beforeMount
子：beforeCreate、created、beforeMount、mounted
父：mounted

3、created中如何获取dom
写个异步代码，在异步里能获取dom。因为生命周期都是同步执行的。
setTimeout、nextTicket

4、为什么不在brforeCreated中请求接口
1）因为如果请求接口是在methods里写的，在初始化调用时，brforeCreated阶段是拿不到methods里的方法的，会报错

5、created和 beforeCreate 区别
beforeCreate：  没有date，拿不到methods里的方法
created： 有date，能拿到methods里的方法

6、created和 mounted 区别
在有父子组件的时候  父组件的 created 里的接口比 子组件  mounted 里的接口先调用处理

7、keep-alive新增的生命周期
actibated: keep-alive 组件激活
deactibated: keep-alive 组件停用
第二次或第n次进入组件会执行actibated生命周期、