1、js运行机制和存储
每个浏览器都有引擎， 谷歌v8，js是通过浏览器引擎渲染执行的，所以是js运行在客户端
js如何运行？
通过js 提供的api ，主要的渲染dom，然后js存储和事件循环Event Loop和消息队列
js存储主要是：分配、使用和回收

2、栈内存和堆内存
栈： 存储基本数据类型（引用类型存的是地址，指向堆中相应的内容），按值访问，存储的值大小固定，由系统自动分配，空间小，运行效率高，先进后出，后进先出

堆： 存储引用类型，按引用访问，存储值大小不固定可动态调整，由代码进行指定分配，空间大，运行效率相对较低，无需存储

3、常见的内存泄漏和解决
1）全局变量
function aa() {
    this.name = '1111'
}
aa()  // this代表window,这是全局变量
解决：添加严格模式”use strict“
function aa() {
    ”use strict“    // 严格模式，禁止this指向全局对象
    this.name = '1111'
}
2）定时器或者回调函数
手动清除
3）闭包
手动接触引用
= null
4)获取dom
删除引用 = null

4、闭包
就是作用域函数，闭包是一个函数加上到创建函数的作用域的连接，闭包关闭了函数的自由变量。
理解: 首先一个函数加上到创建函数，这是有2个函数。
作用域的连接，这是两个函数作用域连接上了。
关闭自由变量：暂时不会销毁。

function fun1(str1) {
    return funtion (str2) {
        str1+=str2
        return str1
    }
}
var aa = fun1(5)
aa(1)

for (var i=0; i< list.length; i++) {
    aFun(i)
}
function aFun(index) {
    console.log(index)
}
ie上会存在内存泄漏
闭包解决的问题：最简单是for循环里套函数

5、原型链
函数： prototype
对象：__proto__

每一个对象都有一个原型（__proto__），这个原型还可以有自己的原型，形成最终的原型链，最终是null.

6、call、apply、bind区别
共同点：改变函数体内this的指向
aFun.call(obj, '张三', '18')  // 立即执行
aFun.apply(obj, ['张三', '18']) // 立即执行
aFun.bind(obj, '张三', '18')() // bind不会立即执行，他回返回一个函数

1） bind不会立即执行，他回返回一个函数，其他两个立即执行
2）参数不同，apply是数组，其他两个有多个参数逗号隔开

7、深拷贝、浅拷贝
浅拷贝：只复制引用，没有复制真正的值（object.assign）
深拷贝：复制真正的值,引用也不相同
深拷贝方法：
1）JSON.parse(JSON.stringify(aa))
2）let a = [1,2]   let b = [...a] // 只能拷贝第一层，多维数组的话，无法拷贝多维的一层以上的数组

手写
function deepClone(obj) {
    if(typeof obj !== 'object' || obj == null) {
        return obj
    }
    let result;
    if (obj instanceof Array) {
        result = []
    } else {
        result = {}
    }

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            result[key] = deepClone(obj[key])
        }
        
    }

    return result
}

8、new操作符做了什么
创建了个空的对象
将空对象的原型，指向与构造函数的原型
将空对象的作为构造函数的上下文，改变函数体内this的指向
对构造函数有返回值的处理判断

9、判断是不是数组
1) Array.isArray(obj)
2）Object.prototype.toString.call(obj) === '[object Array]'
3) obj instanceof Array // 不严谨，会往原型里找 object里找
4）Array.prototype.isPrototypeOf(obj)
5) obj.constructor.toString().indexOf('Array') > -1

10、webpack优化
1）减少内容的处理数量,用exclude排出掉一些不必要的处理，在开发环境排除，不能对代码运行有影响，可以排出js
config.module.rule('js').exclude.add(resolve('/node_modules')).add(resolve('/src'))
2）dll优化，提前打包第三方库
创建webpack.dll.js文件
将第三方库打包，后续打包的时候不再去打包第三方库
entry:{
    // 需要提取的库文件
    vendor:['vue','vuex','vue-router','echarts']
}
配置命令：
// 当执行命令时提示是否安装webpack，不要安装，需要手动安装webpack-cli@3.3.12固定版本
'dll': "webpack --config webpack.dll.js"
3）
多线程打包： 下载依赖 thrad-loader
缓存，关闭 css-sourcemap，本身是打开的
, 和js-sourcemap
但是调试的时候console.log会打印打包后的代码，不容易定位
3）去掉打包不需要的东西
prolod、friendly的可以去掉
config.plugins.delete('friendly')
4)压缩文件
js:terser-webpack-plugin
css: optimize-css-assets-webpack-plugin、mini-css-extract-plugin
gzip压缩： compression-webpack-plugin