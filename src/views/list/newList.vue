<template>
    <div class="list">
        <h2 style="font-size: 25px">
            创建新收藏清单: 步骤 1
        </h2>
        <a-row type="flex">
            <a-col :flex="1">
                <a-card title="编辑" style="width: 260px;border-radius: 15px"
                        :headStyle="cardHead">
                    <a-steps style="font-size: 18px;font-weight: bold" direction="vertical" :current="current">
                        <a-step v-for="item in steps" :key="item.title" :title="item.title"
                                :description="item.content"/>
                    </a-steps>
                </a-card>
            </a-col>
            <a-col :flex="1">
                <div style="margin-left: 30px">
                    <step1 v-show="current === 0" ref="listName"></step1>
                    <step2 v-show="current===1" ref="movieId"></step2>
                    <div class="steps-action">
                        <a-button v-if="current < steps.length - 1" type="primary" @click="next">
                            下一步
                        </a-button>
                        <a-button
                            v-if="current == steps.length - 1"
                            type="primary"
                            @click="submit"
                        >
                            完成
                        </a-button>
                        <a-button v-if="current > 0" style="margin-left: 8px" @click="prev">
                            上一步
                        </a-button>
                    </div>
                </div>
            </a-col>
        </a-row>

    </div>
</template>

<script>
import Vue from 'vue'
import step1 from "@/views/list/addList/step1";
import step2 from "@/views/list/addList/step2";
import {ACCESS_TOKEN} from "@/store/mutation-types";
import {InsertMovieLists} from "@/api/film";

export default {
    name: "listPage",
    created() {
    },
    components: {
        step1,
        step2
    },
    data() {
        return {
            current: 0,
            steps: [{
                title: '步骤1',
                content: '列示详情',
            },
                {
                    title: '步骤2',
                    content: '添加影片',
                }
            ],
            cardHead: {
                background: "#01b4e4",
                color: "#fff",
                borderTopLeftRadius: "15px",
                borderTopRightRadius: "15px",
                fontWeight: 'bold',
                fontSize: '22px'
            },
            list: [],
            movieId: [],
            listName: '',
            userId: Vue.ls.get(ACCESS_TOKEN)
        }
    },
    methods: {

        next() {
            if (this.current == 0) {
                this.listName = this.$refs.listName.getName()
                if (this.listName != '') {
                    this.current++
                } else
                    this.$notification.error({
                        message: '失败',
                        description: '列表名称不能为空'
                    })
            } else
                this.current++;
            console.log('listName' + this.listName + '|movieId' + this.movieId)
        },
        prev() {
            if (this.current == 1) {
                this.movieId = this.$refs.movieId.getMovieId();
            }
            this.current--;
        },
        submit() {
            this.movieId = this.$refs.movieId.getMovieId();
            if (this.movieId.length == 0)
                this.list.push({userId: this.userId, listName: this.listName})
            else
                this.movieId.map(item => {
                    this.list.push({userId: this.userId, listName: this.listName, movieId: item})
                })
            console.log('listName' + this.listName + '|movieId' + this.movieId)
            console.log(this.list)
            InsertMovieLists(this.list).then(res => {
                let result = res.result;
                if (result.search('成功') !== -1) {
                    this.$notification.success({
                        message: '成功',
                        description: result
                    })
                    this.$router.push({name: 'listPage'})
                } else {
                    this.$notification.error({
                        message: '失败',
                        description: result
                    })
                }
            }).catch(err => {
                this.$notification.error({
                    message: '失败',
                    description: '操作失败！'
                })
            })
            this.list = []
        }
    }
}
</script>

<style lang="scss" rel="stylesheet/scss">
.list {
    margin-left: 6%;

    h2 {
        font-family: Arial, Helvetica, sans-serif;
        color: #000;
        font-weight: bold
    }

    .steps-action {
        margin-top: 24px;
    }
}
</style>