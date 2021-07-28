import about from '@/pages/userCenter/about/about';
import computed from '@/pages/userCenter/computed/computed';
import esTest from '@/pages/userCenter/esTest/esTest';
import emit from '@/pages/userCenter/emit/emit';

const userCenterRoutes = [
    {
        path:'/userCenter/about.html',
        name:'about',
        component:about,
        meta:{
            keepAlive:true //需要被缓存的组件
        },
    },
    {
        path:'/userCenter/computed.html',
        name:'computed',
        component:computed
    },
    {
        path:'/userCenter/esTest.html',
        name:'esTest',
        component:esTest,
        meta:{
            keepAlive:false //不需要被缓存的组件
        },
    },
    {
        path:'/userCenter/emit.html',
        name:'emit',
        component:emit
    }
];

export default userCenterRoutes