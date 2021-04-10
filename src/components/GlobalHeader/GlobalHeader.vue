<template>
    <transition name="showHeader">
        <div v-if="visible" class="header-animat">
            <a-layout-header
                v-if="visible"
                :class="[fixedHeader && 'ant-header-fixedHeader', sidebarOpened ? 'ant-header-side-opened' : 'ant-header-side-closed', ]"
                :style="{ padding: '0' }">
                <div v-if="mode === 'sidemenu'" class="header">
                    <a-icon
                        v-if="device==='mobile'"
                        class="trigger"
                        :type="collapsed ? 'menu-fold' : 'menu-unfold'"
                        @click="toggle"
                    />
                    <a-icon
                        v-else
                        class="trigger"
                        :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                        @click="toggle"
                    />
                    <user-menu></user-menu>
                </div>
                <div v-else :class="['top-nav-header-index', theme]" style="background-color: #2d3a4b">
                    <div class="header-index-wide">
                        <div class="header-index-left">
                            <!--                            <logo class="top-nav-header" :show-title="device !== 'mobile'"/>-->
                            <h2 @click="toDash">MovieDB</h2>
                            <s-menu style="background-color: #2d3a4b" v-if="device !== 'mobile'" mode="horizontal"
                                    :menu="menus" :theme="theme"/>
                            <a-icon
                                v-else
                                class="trigger"
                                :type="collapsed ? 'menu-fold' : 'menu-unfold'"
                                @click="toggle"/>
                        </div>
                        <user-menu class="header-index-right"></user-menu>
                    </div>
                </div>
            </a-layout-header>
        </div>
    </transition>
</template>

<script>
import UserMenu from '../tools/UserMenu'
import SMenu from '../Menu/'
import Logo from '../tools/Logo'
import {mixin} from '@/utils/mixin'
import store from "@/store";

export default {
    name: 'GlobalHeader',
    components: {
        UserMenu,
        SMenu,
        Logo
    },
    mixins: [mixin],
    props: {
        mode: {
            type: String,
            // sidemenu, topmenu
            default: 'sidemenu'
        },
        menus: {
            type: Array,
            required: true
        },
        theme: {
            type: String,
            required: false,
            default: 'dark'
        },
        collapsed: {
            type: Boolean,
            required: false,
            default: false
        },
        device: {
            type: String,
            required: false,
            default: 'desktop'
        }
    },
    data() {
        return {
            visible: true,
            oldScrollTop: 0,
            isLogin: false,
        }
    },
    mounted() {
        document.addEventListener('scroll', this.handleScroll, {passive: true})
        if (store.getters.roles.permissionList != undefined)
            store.getters.roles.permissionList.map(item => {
                if (item == '901')
                    this.isLogin = true;
            })
        console.log(this.isLogin)
    },
    methods: {
        toDash() {
            this.$router.push({name: 'index'})
        },
        handleScroll() {
            if (!this.autoHideHeader) {
                return
            }
            const scrollTop = document.body.scrollTop + document.documentElement.scrollTop
            if (!this.ticking) {
                this.ticking = true
                requestAnimationFrame(() => {
                    if (this.oldScrollTop > scrollTop) {
                        this.visible = true
                    } else {
                        this.visible = false
                    }
                    this.oldScrollTop = scrollTop
                    this.ticking = false
                })
            }
        },
        toggle() {
            this.$emit('toggle')
        }
    },
    beforeDestroy() {
        document.body.removeEventListener('scroll', this.handleScroll, true)
    },
    watch: {
        // '$route'(to, from) {
        //     if (to.name === "myRated") {
        //         this.$router.push({name: 'myRated', query: {id: "1"}})
        //     }
        // }
    },
}
</script>

<style lang="less" scoped>
@import '../index.less';

h2 {
    cursor: pointer;
    font-family: Arial, Helvetica, sans-serif;
    color: #fff;
    font-size: 36px;
    font-weight: bold;
    margin-left: -50px;
}

.header-animat {
    background-color: #2d3a4b;
    position: relative;
    z-index: @ant-global-header-zindex;
}

.showHeader-enter-active {
    transition: all 0.25s ease;
}

.showHeader-leave-active {
    transition: all 0.5s ease;
}

.showHeader-enter,
.showHeader-leave-to {
    opacity: 0;
}
</style>
