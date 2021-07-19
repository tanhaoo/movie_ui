<template>
    <div class="account-settings-info-view">
        <a-row :gutter="16">
            <a-col :md="24" :lg="16">
                <a-form layout="vertical">
                    <a-form-item label="昵称">
                        <a-input v-model="userInfo.userName"></a-input>
                    </a-form-item>
                    <a-form-item label="手机号码">
                        <a-input v-model="userInfo.phone" autocomplete="false"/>
                    </a-form-item>
                    <a-form-item label="性别" :required="false">
                        <a-select v-model="userInfo.sex">
                            <a-select-option value="男">男</a-select-option>
                            <a-select-option value="女">女</a-select-option>
                        </a-select>
                    </a-form-item>

                    <a-form-item label="修改登录密码" :required="false">
                        <a-input placeholder="密码" type="password" v-model="pwd"/>
                    </a-form-item>

                    <a-form-item>
                        <a-button :loading="loading" type="primary" @click="submit()">提交</a-button>
                        <!--            <a-button style="margin-left: 8px">保存</a-button>-->
                    </a-form-item>
                </a-form>
            </a-col>
            <a-col :md="24" :lg="8" :style="{ minHeight: '180px' }">
                <div class="ant-upload-preview" @click="$refs.modal.edit(1)">
                    <a-icon type="cloud-upload-o" class="upload-icon"/>
                    <div class="mask">
                        <a-icon type="plus"/>
                    </div>
                    <img :src="avatar"/>
                </div>
            </a-col>
        </a-row>

        <avatar-modal ref="modal" @ok="setavatar"/>
    </div>
</template>

<script>
import AvatarModal from './AvatarModal'
import {mapGetters} from "vuex";
import {updateUserByName} from "@/api/user";
import md5 from 'md5'

export default {
    components: {
        AvatarModal
    }, computed: {
        ...mapGetters(['nickname', 'avatar', 'phone', 'sex'])
    }, mounted() {
        this.userInfo.userName = this.nickname
        this.userInfo.phone = this.phone
        this.userInfo.sex = this.sex
        console.log(this.userInfo.phone)
    },
    data() {
        const self = this
        return {
            // cropper
            loading: false,
            preview: {},
            option: {
                // img: '/avatar2.jpg',
                info: true,
                size: 1,
                outputType: 'jpeg',
                canScale: false,
                autoCrop: true,
                // 只有自动截图开启 宽度高度才生效
                autoCropWidth: 180,
                autoCropHeight: 180,
                fixedBox: true,
                // 开启宽度和高度比例
                fixed: true,
                fixedNumber: [1, 1],
            },
            userInfo: {
                userName: '',
                password: '',
                phone: '',
                sex: '',
            },
            pwd: ''
        }
    },
    methods: {
        submit() {
            this.userInfo.password = md5(this.pwd)
            updateUserByName(this.userInfo).then(res => {
                let result = res.result
                this.loading=true
                setTimeout(() => {
                    this.$notification.success({
                        message: '成功',
                        description: result
                    })
                    this.loading=false
                }, 1000)
            }).catch(err => {

            })
        },
        setavatar(url) {
            this.userInfo.img = url
        }
    }
}
</script>

<style lang="less" scoped>
.avatar-upload-wrapper {
    height: 200px;
    width: 100%;
}

.ant-upload-preview {
    position: relative;
    margin: 0 auto;
    width: 100%;
    max-width: 180px;
    border-radius: 50%;
    box-shadow: 0 0 4px #ccc;

    .upload-icon {
        position: absolute;
        top: 0;
        right: 10px;
        font-size: 1.4rem;
        padding: 0.5rem;
        background: rgba(222, 221, 221, 0.7);
        border-radius: 50%;
        border: 1px solid rgba(0, 0, 0, 0.2);
    }

    .mask {
        opacity: 0;
        position: absolute;
        background: rgba(0, 0, 0, 0.4);
        cursor: pointer;
        transition: opacity 0.4s;

        &:hover {
            opacity: 1;
        }

        i {
            font-size: 2rem;
            position: absolute;
            top: 50%;
            left: 50%;
            margin-left: -1rem;
            margin-top: -1rem;
            color: #d6d6d6;
        }
    }

    img,
    .mask {
        width: 100%;
        max-width: 180px;
        height: 100%;
        border-radius: 50%;
        overflow: hidden;
    }
}
</style>
