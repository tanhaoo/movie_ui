<template>
    <result class="a" :isSuccess="true" :content="false" :title="email" :description="description">
        <template slot="action">
            <a-button size="large" type="primary">查看用户个人信息</a-button>
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
        email() {
            const v = (this.form && this.form.email) || 'xxx'
            const title = `你的账户：${v} 注册成功`
            return title
        }
    },
    created() {
        this.form = this.$route.params
    },
    methods: {
        goHomeHandle() {
            this.$router.push({name: 'login'})
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
