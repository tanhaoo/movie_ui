<template>
    <div class="main">
        <a-form
            id="formLogin"
            class="user-layout-login"
            ref="formLogin"
            :form="form"
            @submit="handleSubmit"
        >
            <a-tabs
                :activeKey="customActiveKey"
                :tabBarStyle="{ textAlign: 'center', borderBottom: 'unset' }"
                @change="handleTabClick">
                <a-tab-pane key="tab1" tab="账号密码登录">
                    <a-alert
                        v-if="isLoginError"
                        type="error"
                        showIcon
                        style="margin-bottom: 24px;"
                        message="账户名或密码错误"
                    />
                    <a-form-item>
                        <a-input
                            size="large"
                            type="text"
                            placeholder="账户: admin"
                            v-decorator="['username',{rules: [{ required: true, message: '请输入账户名' },
                            { validator: handleUsernameOrEmail }],
                            validateTrigger: 'change'}]">
                            <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
                        </a-input>
                    </a-form-item>

                    <a-form-item>
                        <a-input
                            size="large"
                            type="password"
                            autocomplete="false"
                            placeholder="密码: admin"
                            v-decorator="['password',{rules: [{ required: true, message: '请输入密码' }], validateTrigger: 'blur'}]">
                            <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
                        </a-input>
                    </a-form-item>
                </a-tab-pane>
            </a-tabs>


            <a-form-item style="margin-top:24px">
                <a-button
                    size="large"
                    type="primary"
                    htmlType="submit"
                    class="login-button"
                    :loading="state.loginBtn"
                    :disabled="state.loginBtn"
                >确定
                </a-button>
            </a-form-item>
        </a-form>
        <a-button
            class="login-button"
            size="large"
            type="primary"
            @click="register"
        >注册
        </a-button>

        <two-step-captcha
            v-if="requiredTwoStepCaptcha"
            :visible="stepCaptchaVisible"
            @success="stepCaptchaSuccess"
            @cancel="stepCaptchaCancel"
        ></two-step-captcha>
    </div>
</template>

<script>
import md5 from 'md5'
import TwoStepCaptcha from '@/components/tools/TwoStepCaptcha'
import {mapActions} from 'vuex'
import {timeFix} from '@/utils/util'
import {getSmsCaptcha, get2step, } from '@/api/user'

const QS = require('qs')

export default {
    components: {
        TwoStepCaptcha
    },
    data() {
        return {
            customActiveKey: 'tab1',
            loginBtn: false,
            // login type: 0 email, 1 username, 2 telephone
            loginType: 0,
            isLoginError: false,
            requiredTwoStepCaptcha: false,
            stepCaptchaVisible: false,
            form: this.$form.createForm(this),
            state: {
                time: 60,
                loginBtn: false,
                // login type: 0 email, 1 username, 2 telephone
                loginType: 0,
                smsSendBtn: false
            },
            visiteBtn: false
        }
    },
    created() {
        get2step({})
            .then(res => {
                this.requiredTwoStepCaptcha = res.result.stepCode
            })
            .catch(() => {
                this.requiredTwoStepCaptcha = false
            })
        // this.requiredTwoStepCaptcha = true
    },
    methods: {
        ...mapActions(['Login', 'logout']),
        // handler
        handleUsernameOrEmail(rule, value, callback) {
            const {state} = this
            const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
            if (regex.test(value)) {
                state.loginType = 0
            } else {
                state.loginType = 1
            }
            callback()
        },
        handleTabClick(key) {
            this.customActiveKey = key
        },
        handleSubmit(e) {
            e.preventDefault()
            const {
                form: {validateFields},
                state,
                customActiveKey,
                Login
            } = this

            state.loginBtn = true

            const validateFieldsKey = customActiveKey === 'tab1' ? ['username', 'password'] : ['mobile', 'captcha']

            validateFields(validateFieldsKey, {force: true}, (err, values) => {
                if (!err) {
                    console.log('login form', values)
                    const loginParams = {...values}
                    delete loginParams.username
                    loginParams[!state.loginType ? 'email' : 'username'] = values.username
                    loginParams.password = md5(values.password)
                    console.log(loginParams, 'loginParams')
                    //设置参数的类型
                    const params = QS.stringify(loginParams)
                    console.log('params', params)
                    Login(params)
                        .then(res => this.loginSuccess(res))
                        .catch(err => this.requestFailed(err))
                        .finally(() => {
                            state.loginBtn = false
                        })
                } else {
                    setTimeout(() => {
                        state.loginBtn = false
                    }, 600)
                }
            })
        },
        stepCaptchaSuccess() {
            this.loginSuccess()
        },
        stepCaptchaCancel() {
            this.logout().then(() => {
                this.loginBtn = false
                this.stepCaptchaVisible = false
            })
        },
        loginSuccess(res) {
            console.log('res' + res)
            this.$router.push({name: 'index'})
            // 延迟 1 秒显示欢迎信息
            setTimeout(() => {
                this.$notification.success({
                    message: '欢迎',
                    description: `${timeFix()}，欢迎回来`
                })
            }, 1000)
            this.isLoginError = false
        },
        requestFailed(err) {
            this.isLoginError = true
            this.$notification['error']({
                message: '错误',
                description: ((err.response || {}).data || {}).message || '请求出现错误，请稍后再试',
                duration: 4
            })
        },
        register() {
            this.$router.push({path: '/user/register'})
        }
    }
}
</script>

<style lang="less" scoped>
.user-layout-login {
    label {
        font-size: 14px;
        color: #fff;
    }

    /deep/ .ant-tabs-tab {
        color: #fff;
    }

    /deep/ .ant-tabs-tab-active {
        color: #1890ff;
    }

    /deep/ .ant-tabs-tab:hover {
        color: #1890ff;
    }

    .getCaptcha {
        display: block;
        width: 100%;
        height: 40px;
    }

    .forge-password {
        font-size: 14px;
        color: #fff;
    }

    .user-login-other {
        text-align: left;
        margin-top: 24px;
        line-height: 22px;

        .item-icon {
            font-size: 24px;
            color: #fff;
            margin-left: 16px;
            vertical-align: middle;
            cursor: pointer;
            transition: color 0.3s;

            &:hover {
                color: #1890ff;
            }
        }

        .register {
            float: right;
        }
    }
}

button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
}
</style>
