import about from '@/pages/userCenter/about/about';
import computed from '@/pages/userCenter/computed/computed';
import esTest from '@/pages/userCenter/esTest/esTest';

const userCenterRoutes = [
    {
        path:'/userCenter/about.html',
        name:'about',
        component:about
    },
    {
        path:'/userCenter/computed.html',
        name:'computed',
        component:computed
    },
    {
        path:'/userCenter/esTest.html',
        name:'esTest',
        component:esTest
    }
];

export default userCenterRoutes