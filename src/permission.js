import Vue from 'vue'
import router from './router'
import store from './store'

import NProgress from 'nprogress' // progress bar
import '@/components/NProgress/nprogress.less' // progress bar custom style
import notification from 'ant-design-vue/es/notification'
import {setDocumentTitle, domTitle} from '@/utils/domUtil'
import {ACCESS_TOKEN} from '@/store/mutation-types'

NProgress.configure({showSpinner: false}) // NProgress Configuration

const whiteList = ['login', 'register', 'registerResult', 'center', 'dashboard'] // no redirect whitelist
const defaultRoutePath = '/movie/home'

router.beforeEach((to, from, next) => {
    NProgress.start() // start progress bar
    to.meta && (typeof to.meta.title !== 'undefined' && setDocumentTitle(`${to.meta.title} - ${domTitle}`))
    console.log("permission: "+Vue.ls.get(ACCESS_TOKEN))
    if (Vue.ls.get(ACCESS_TOKEN)) {
        /* has token */
        if (to.path === '/user/login' || to.path === '/') {
            next({path: defaultRoutePath})
            NProgress.done()
        } else {
            if (store.getters.roles.length === 0) {
                store.dispatch('getInfo').then(res => {
                    const roles = res.result && res.result.role
                    console.dir(roles)
                    store.dispatch('GenerateRoutes', {roles}).then(() => {
                        // 根据roles权限生成可访问的路由表
                        // 动态添加可访问路由表
                        router.addRoutes(store.getters.addRouters)
                        console.log(store.getters.addRouters)
                        // 请求带有 redirect 重定向时，登录自动重定向到该地址
                        const redirect = decodeURIComponent(from.query.redirect || to.path)
                        if (to.path === redirect) {
                            // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
                            next({...to, replace: true})
                        } else {
                            // 跳转到目的路由
                            next({path: redirect})
                        }
                    })
                }).catch(() => {
                    notification.error({
                        message: '错误',
                        description: '请求用户信息失败，请重试'
                    })
                    store.dispatch('logout').then(() => {
                        // next({path: '/user/login', query: {redirect: to.fullPath}})
                        next({name: 'dashboard'})
                    })
                })
            } else {
                next()
            }
        }
    } else {
        if (whiteList.includes(to.name)) {
            // 在免登录白名单，直接进入
            next()
        } else {
            // next({path: '/user/login', query: {redirect: to.fullPath}})
            next({name: 'dashboard'})
            NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
        }
    }
})

router.afterEach(() => {
    NProgress.done() // finish progress bar
})

if (store.getters.roles.length === 0) {
    store.dispatch('getInfo').then(res => {
        const roles = res.result && res.result.role
        console.dir(roles)
        store.dispatch('GenerateRoutes', {roles}).then(() => {
            router.addRoutes(store.getters.addRouters)
            const redirect = decodeURIComponent(from.query.redirect || to.path)
            if (to.path === redirect) {
                next({...to, replace: true})
            } else {
                next({path: redirect})
            }
        })
    }).catch(() => {
        notification.error({
            message: '错误',
            description: '请求用户信息失败，请重试'
        })
        store.dispatch('logout').then(() => {
            next({name: 'dashboard'})
        })
    })
}