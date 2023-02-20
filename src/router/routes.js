// 引入一级路由组件
// import Home from '@/pages/Home'
// import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'

// 引入二级路由组件
import MyOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder'


/* 
当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。
如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了。
*/
// 在每一个路由中 component: ()=>import('@/pages/Home')

// 路由配置信息
export default [
    {
        path: '/home',
        component: ()=>import('@/pages/Home'),
        meta: { show: true }
    },
    {
        // 在占位的后面加上一个问号，可以指定params参数是否传递
        path: '/search/:keyword?',
        component: ()=>import('@/pages/Search'),
        meta: { show: true },
        name: 'search',
        // 路由组件能不能传递props数据？三种写法
        // 1.布尔值写法: 只能传递params参数
        // props: true,
        // 2.对象写法:额外的给路由组件传递一些props
        // props: { a: 1, b: 2 }
        // 3.函数写法：可以把params参数、query参数，通过props传递给路由组件
        props: ($route) => {
            return { keyword: $route.params.keyword, k: $route.query.k }
        }

    },
    {
        path: '/login',
        component: Login,
        meta: { show: false }
    },
    {
        path: '/register',
        component: Register,
        meta: { show: false }
    },
    {
        path: '/detail/:skuid',
        component: Detail,
        meta: { show: true }
    },
    {
        path: '/addcartsuccess',
        name: 'addcartsuccess',
        component: AddCartSuccess,
        meta: { show: true }
    },
    {
        path: '/shopcart',
        component: ShopCart,
        meta: { show: true }
    },
    {
        path: "/trade",
        component: Trade,
        meta: { show: true },
        // 独享路由守卫
        beforeEnter: (to, from, next) => {
            // 去交易页面，必须是从shopcart页面来
            if (from.path == '/shopcart') {
                next()
            } else {
                // 其他路由来，停留在当前
                next(false)
            }
        },
    },
    {
        path: '/pay',
        component: Pay,
        meta: { show: true },
        beforeEnter: (to, from, next) => {
            if (from.path == '/trade') {
                next()
            } else {
                next(false)
            }
        }
    },
    {
        path: '/paysuccess',
        component: PaySuccess,
        meta: { show: true }
    },
    {
        path: '/center',
        component: Center,
        // 二级路由组件
        children: [
            {
                path: 'myorder',
                component: MyOrder,
            },
            {
                path: 'grouporder',
                component: GroupOrder,
            },
            {
                path: '/center',
                redirect: "/center/myorder"
            }
        ],
        meta: { show: true }
    },
    // 重定向，在项目跑起来的时候，访问/,立马让它定向到首页
    {
        path: '*',
        redirect: "/home"
    }
]