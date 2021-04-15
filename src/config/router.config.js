// eslint-disable-next-line
import {UserLayout, BasicLayout, RouteView, BlankLayout, PageView} from '@/layouts'
import {bxAnaalyse} from '@/core/icons'
import store from "@/store";

export const asyncRouterMap = [
    {
        path: '/',
        name: 'index',
        component: BasicLayout,
        meta: {title: '首页'},
        redirect: '/movie/home',
        children: [
            // dashboard
            {
                path: 'movie',
                name: 'movie',
                redirect: '/movie/home',
                component: RouteView,
                meta: {title: '电影', keepAlive: true, icon: 'play-circle', permission: ['901']},
                children: [
                    {
                        path: 'hot-Movie',
                        name: 'hotMovie',
                        component: () => import('@/views/movie/conditionPage'),
                        meta: {title: '热门', keepAlive: true, permission: ['901']},
                    },
                    {
                        path: 'top-rated',
                        name: 'topRated',
                        component: () => import('@/views/movie/conditionPage'),
                        meta: {title: '高分', keepAlive: true, permission: ['901']}
                    },
                    {
                        path: '/movie/home',
                        name: '展示',
                        component: () => import('@/views/movie/home'),
                        hidden: true,
                    },
                    {
                        path: '/movie/detail',
                        name: 'movieId',
                        component: () => import('@/views/movie/moviePage'),
                        hidden: true
                    }
                ]
            },
            {
                path: '/myRated/id',
                name: 'myRated',
                component: () => import('@/views/movie/ratePage'),
                meta: {title: '我的评分', keepAlive: true, icon: 'star', permission: ['221']},
            },
            {
                path: '/list/listPage',
                name: 'listPage',
                component: () => import('@/views/list/listPage'),
                meta: {title: '我的收藏列表', keepAlive: true, icon: 'unordered-list', permission: ['221']},
            },
            {
                path: '/list/newList',
                name: 'newList',
                component: () => import('@/views/list/newList'),
                hidden: true
            },
            {
                path: '/list/listDetail',
                name: 'listDetail',
                component: () => import('@/views/list/listDetail'),
                hidden: true
            },
            {
                path: '/recommend',
                name: 'recommend',
                component: () => import('@/views/recommend/recommendPage'),
                meta: {title: '我的推荐', keepAlive: true, icon: 'tag', permission: ['221']}
            },
        ]
    },
    {
        path: '*',
        redirect: '/404',
        hidden: true
    }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
    {
        path: '/user',
        component: UserLayout,
        redirect: '/user/login',
        hidden: true,
        children: [
            {
                path: 'login',
                name: 'login',
                component: () => import(/* webpackChunkName: "user" */ '@/views/user/login')
            },
            {
                path: 'register',
                name: 'register',
                component: () => import(/* webpackChunkName: "user" */ '@/views/user/register')
            },
            {
                path: 'register-result',
                name: 'registerResult',
                component: () => import(/* webpackChunkName: "user" */ '@/views/user/registerResult')
            },
            {
                path: 'recover',
                name: 'recover',
                component: undefined
            }
        ]
    },
    {
        path: '/',
        name: 'dashboard',
        component: () => import('@/views/movie/dashboard'),
    },
    {
        path: '/account',
        component: RouteView,
        redirect: '/account/center',
        name: 'account',
        meta: {title: '个人页', icon: 'user', keepAlive: true, permission: ['user']},
        children: [
            {
                close,
                path: '/account/center',
                name: 'center',
                component: () => import('@/views/account/center/Index'),
                meta: {title: '个人中心', keepAlive: true, permission: ['user']}
            },
            {
                path: '/account/settings',
                name: 'settings',
                component: () => import('@/views/account/settings/Index'),
                meta: {title: '个人设置', hideHeader: true, permission: ['user']},
                redirect: '/account/settings/base',
                hideChildrenInMenu: true,
                children: [
                    {
                        path: '/account/settings/base',
                        name: 'BaseSettings',
                        component: () => import('@/views/account/settings/BaseSetting'),
                        meta: {title: '基本设置', hidden: true, permission: ['user']}
                    },
                    {
                        path: '/account/settings/security',
                        name: 'SecuritySettings',
                        component: () => import('@/views/account/settings/Security'),
                        meta: {title: '安全设置', hidden: true, keepAlive: true, permission: ['user']}
                    },
                    {
                        path: '/account/settings/custom',
                        name: 'CustomSettings',
                        component: () => import('@/views/account/settings/Custom'),
                        meta: {title: '个性化设置', hidden: true, keepAlive: true, permission: ['user']}
                    },
                    {
                        path: '/account/settings/binding',
                        name: 'BindingSettings',
                        component: () => import('@/views/account/settings/Binding'),
                        meta: {title: '账户绑定', hidden: true, keepAlive: true, permission: ['user']}
                    },
                    {
                        path: '/account/settings/notification',
                        name: 'NotificationSettings',
                        component: () => import('@/views/account/settings/Notification'),
                        meta: {title: '新消息通知', hidden: true, keepAlive: true, permission: ['user']}
                    }
                ]
            }
        ]
    },
    {
        path: '/404',
        component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
    }
]
