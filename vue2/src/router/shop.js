import cart from '@/pages/shop/cart/cart';
import newX from '@/pages/shop/newX/newX';

const shopRoutes = [
    {
        path:'/shop/cart.html',
        name:'cart',
        component:cart
    },
    {
        path:'/shop/newX.html',
        name:'newX',
        component:newX
    }
];

export default shopRoutes;