1、谈谈对vue的理解

vue响应式布局，声明式渲染，MVVM模式
组件化开发
路由router客户端跳转
Vuex状态管理
构建共建


2、vue组件化的理解
组件化：对UI的封装
模块化：对业务逻辑的封装
组成：模板，属性，时间，插槽，生命周期
好处：提高开发效率，可重复利用，可组合，降低更新范围，只重新渲染变化的组件


3、Vue可以通过数据劫持探测数据变为，为什么需要虚拟DOM进行diff检测差异
因为Vue设计的每个组件都有一个watcher，如果页面上有100个数据，那就要100个检测watcher,都用劫持会浪费内存


4、对响应式数据的理解
vue2使用的是object.defineProperty.  vue3用的是proxy
1）在vue2里使用的是defineProperty来对数据进行劫持，递归对属性进行重写添加getter和setter。
2）当新增或者删除属性时无法监听变化，需要通过$set，$delete实现
3）对于ES6新产生的MAP、SET这些数据结构不支持
4)对数组是从写数组的方法进行重写（push,shift,unshift,pop,sort,reverse），层级不要太深
proxy是代理，是代理了取值和修改值得操作，是对象就new Proxy代理，不是对象就直接return

5、vue2如何进行依赖收集
依赖收集的流传：
每个属性都有自己的dep属性，存放他所依赖的watcher，当属性变化后会通知自己的watcher去更新。
在初始化是会调用render函数，触发属性依赖收集dep.depend
当属性修改时触发watcher更新dep.notify()
挂在vue的时候会调用$mount方法,mount方法里会创建渲染watcher渲染页面，渲染watcher里核心是调用render方法，render方法来取数据，调用getter，走到响应式逻辑

6、vue3如何进行依赖收集
通过Map结构将属性和effect映射起来
当属性修改时会找到对应的effect列表依次执行trigger

7、vue.set方法如何实现的
不是对象类型，不能使用set方法
数组的话用splice方法
如果是本身属于这个对象，直接修改，target[key] = val
如果是新增一个属性，调用defineRactive，用object.defineProperty将属性定义在对象内

8、v-if和v-show  
v-if 不成立不会渲染dom节点
v-show 隐藏和显示，display。（opacity、visiviblity）

9、computed和watch区别
computed：有缓存，依赖的值不变，对其取值时计算属性方法不会重新执行，不支持异步，可以在模板中使用
watch：监控值得变化
vue3的watch提供了onCleanup函数，方便解决清理问题

10、new Vue过程
先是内部进行事件的初始化，
触发beforeCreate  

11、v-for和v-if的优先级
vue2时v-for优先
vue3时v-if优先

12、vue diff算法  patch
比较虚拟dom节点的差异
先比较是否是相同节点，比较key属性和tab标签
相同节点比较属性比如说style，复用老节点，将老的虚拟dom服用给新的虚拟节点dom
比较儿子节点,增删改
优化比较  头头 尾尾 头尾 尾头
不能优化的话通过key去查找复用

vue3 用的diff算法 是采用最长递增子的

13 vue中key的作用原理
key用在虚拟dom算法中，辨识虚拟节点，如果不使用key，就正常使用diff算法
比如说  两个input  用v-if  v-else切换，输入完值后来回切换，发现切换后输入的内容还在，这是diff算法复用了老的虚拟节点。
使用key后  就会删除老的虚拟节点，创建新的节点。
v-for ,是默认使用就地更新的策略，数据序列改变，vue不会移动dom元素来匹配数据项的序列，是更新每个元素；使用key后可以定位到修改的属性
v-for key值不建议用index索引，是因为这是索引，当更新时，匹配的会不对
比如说 input type=checkbox,选中第一个，然后进行新增，会发现你选的会默认变成新增的，而不是之前选中的第一个，是因为新增的会变成列表的第一个，比较的是下标，出现错误。

14、vue的mixin
用来扩展组件，有局部混入和全局混入，一般情况下是全局混入
合并策略：
对象的合并处理
props、methods、inject、computed同名时会被替换
data会被合并
生命周期和wwatch方法会被合并成队列
components、directives、filters会在原型链上叠加

15、双向绑定
是指指令  v-model ，绑定一个动态的值到视图上，修改视图能改变对应的值
v-model 中文输入时，输入完成才会显示中文，不会显示写的英文
表单元素的v-model 会根据标签的不同解析不同的语法和处理逻辑
比如 文本框 解析成 input + value;   复选框解析成 checked + change

16、vue中的.sync
双向绑定多个属性，默认双向绑定只能绑定一个属性
vue3移除了

17、组件中写name的好处和作用
增加name 选项会在components属性中增加组件本身，实现组件的递归调用
可以识别组件的具体名称方便调试和查找对应组件

18、vue中的常见的修饰符
表单修饰符： lazy、trim 、number 
事件修饰符： stop、prevent、self、once、capture、passive、native
鼠标按键修饰符：left、right、middle
.sync修饰符

19、vue自定义指令
防抖、图片lazy加载

20、nextTick理解
视图更新时异步的，nextTick是把逻辑卸载更新后执行

21、keep-alive常用在哪里
缓存组件，常用在路由中，动态组件中
动态组件中
include:需要被缓存
exclude:不需要缓存
max:缓存最大个数

22、设计模式
单例模式： 整个程序中只有一个实例，Vuex
工厂模式：函数，批量创建实例，createElement
发布订阅模式：订阅者把想订阅的事件注册到调度中心，在触发，类似事件绑定（手动绑定手动触发）
观察者模式：watcher 和 dep的关系，自动的
代理模式：代理给某个对象提供一个代理对象，由代理对象控制。类似vm.data上的属性
装饰模式: vue2的装饰器
中介者模式: vuex  统一接口来通信
策略模式:
外观模式:

23、vue中性能优化
数据层级不要过深，变成相应式绑定属性时会递归，性能会差的
把数据放在data中，但又不想变成响应式可以通过Object.freeze(),把数据冻结
合理设置key属性
v-show和 v-if选取
使用keep-alive缓存组件， v-once
把复杂页面合理分成组件化

24、首页加载慢怎么解决
使用理由懒加载、异步组件、减少入口文件的体积大小（采用补加首屏增加体验优化）
抽离公共代码，采用splitChunk进行切割
组件加载采用按需加载的方式
静态资源缓存，采用http缓存
图片资源压缩
打包时开启gzip压缩处理  compression-webpack-plugin插件
静态资源采用CDN提速
使用ssr对首屏做服务端渲染

25、vue中解决跨域
服务端设置CORS（Cross-Orgin Resource Sharing,跨域资源共享）
构建工具中设置反向代理，用Nginx做反向代码
使用websocket进行通信

26、封装axios
封装请求超时时间  setTimeout
根据环境变量，修改测试或者生产的请求路径  baseURL
设置请求拦截，自动添加Token之类的
设置相应拦截，对返回数据和相应状态码进行处理， request.use请求拦截，  Response.use响应拦截
接口请求失败添加处理

27、权限管理
登陆鉴权，把登陆token，保存到本地
访问权限：根据用户是否登陆，通过路由守卫实现判断是否有某种权限
页面权限
按钮权限

28、 vue-router有几种钩子函数,执行流程
触发导航
在失活的组件里调用beforeRouterLeave
调用全局beforeEach守卫
在重用的组件里调用beforeRouteUpdate守卫
在路由配置里调用beforeEnter
解析异步组件
在被激活的组件里调用beforeRouteEnter
调用全局的beforeResolve守卫
导航被确认
调用全局的afterEach钩子
触发dom更新
调用beforeEnter守卫中传给next的回调函数

29、vueX
状态管理模式，采用集中管理模式来处理组件中的状态，共享数据
state： 存储组件状态
getters: 读取
mutations: 修改state值,同步的  commit
actions: 修改state值，异步的   dispatch


30、刷新页面后vueX的数据丢失
获取到数据后存储到本地
检测不存在时重新拉取数据

31、vue2和vue3的区别
vue3把模块进行了拆分