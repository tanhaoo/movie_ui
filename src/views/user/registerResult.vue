<template>
    <result class="a" :isSuccess="true" :content="false" :title="userName" :description="description">
        <template slot="action">
            <a-button size="large" type="primary" @click="toLogin">前往登陆</a-button>
            <a-button size="large" style="margin-left: 8px" @click="goHomeHandle">返回主页</a-button>
        </template>
    </result>
</template>

<script>
import {Result} from '@/components'

export default {
    name: 'RegisterResult',
    components: {
        Result
    },
    data() {
        return {
            description: '你可以制作并维护自己的收藏清单,跟踪你喜爱的电影和剧集，并获得推荐',
            form: {}
        }
    },
    computed: {
        userName() {
            const v = (this.form && this.form.userName) || 'xxx'
            const title = `你的账户：${v} 注册成功`
            return title
        }
    },
    created() {
        this.form = this.$route.params
    },
    methods: {
        toLogin() {
            this.$router.push({name: 'login'})
        },
        goHomeHandle() {
            this.$router.push({name: 'index'})
        }
    }
}
</script>

<style lang="scss" rel="stylesheet/scss">

div.result {
    .title {
        color: #fff;
    }
}
</style>
