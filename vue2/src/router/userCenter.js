import about from '@/pages/userCenter/about/about';
import computed from '@/pages/userCenter/computed/computed';

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
    }
];

export default userCenterRoutes