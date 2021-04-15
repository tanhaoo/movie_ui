<template>
    <div class="ratePage">
        <h2 style="font-size: 25px">我的评分</h2>
        <a-spin :spinning="spinning">
            <a-icon slot="indicator" type="loading" style="font-size: 80px" spin/>
        </a-spin>
        <a-list item-layout="horizontal" :data-source="filmData">
            <a-list-item style="height: 200px;margin-top: 35px" slot="renderItem" slot-scope="item, index">
                <a-row type="flex">
                    <a-col :flex="1"><img style="height: 210px;width: 140px" :src="item.url"></a-col>
                    <a-col :flex="1">
                        <div style="margin-left: 15px;margin-top: 10px">
                            <a-row type="flex">
                                <a-col :flex="1">
                                    <a-progress class="progress" :strokeWidth=12
                                                :strokeColor="getProgressColor(item.rating/5*100)"
                                                type="circle"
                                                :percent="(item.rating/5*100)" :width="50">
                                        <template #format="percent">
                                    <span style="color:#979A9A;font-size: 15px;font-weight: bold">{{
                                            Number(percent).toFixed(0)
                                        }}%</span>
                                        </template>
                                    </a-progress>
                                </a-col>
                                <a-col :flex="1">
                                    <div style="margin-left: 10px;">
                                        <h2>{{ item.movieName }}</h2>
                                        <h3 style="margin-top: -10px;font-size: 15px">{{ item.releaseTime }}</h3>
                                    </div>
                                </a-col>
                            </a-row>
                            <h2 style="width: 1000px;font-size: 20px;  font-weight: lighter;">{{ item.introduce }}</h2>
                            <div>
                                <a-row type="flex">
                                    <a-col :flex="1">
                                        <a-tooltip trigger="click"
                                                   placement="bottom">
                                            <template slot="title">
                                                <a-rate v-model="item.movieRating.rating" :default-value="2.5"
                                                        allow-half/>
                                                <br>
                                                <a-button style="width: 100%" type="primary"
                                                          @click="updateRating(item.id, item.movieRating.rating)">确认
                                                </a-button>
                                            </template>
                                            <a-button type="primary" size="large" shape="circle">{{
                                                    item.movieRating.rating
                                                }}
                                            </a-button>
                                            <span class="rate">你的评分</span>
                                        </a-tooltip>
                                    </a-col>
                                    <a-col :flex="1" style="margin-left: 15px">
                                        <a-button :style="item.spanStyle" size="large" shape="circle"
                                                  @click="changeMyHeart(item.id)">
                                            <a-icon type="heart" theme="filled"/>
                                        </a-button>
                                        <span class="rate">{{ item.listName }}</span>
                                    </a-col>
                                    <a-col :flex="1" style="margin-left: 15px">
                                        <a-popconfirm
                                            title="确定要删除此项评分?"
                                            ok-text="Yes"
                                            cancel-text="No"
                                            @confirm="confirm(item.id)"
                                            @cancel="cancel"
                                        >
                                            <a-button size="large" shape="circle">
                                                <a-icon type="delete" theme="filled"/>
                                            </a-button>
                                            <span class="rate">删除</span>
                                        </a-popconfirm>
                                    </a-col>
                                </a-row>
                            </div>
                        </div>
                    </a-col>
                </a-row>
            </a-list-item>
        </a-list>
        <a-button class="load-button" type="primary" @click="loadMovie()">
            加载更多
        </a-button>
    </div>
</template>

<script>
import Vue from 'vue'
import {delRatingByUserId, getMovieByRating, InsertDelMovieList, updateRatingByUserId} from "@/api/film";
import {ACCESS_TOKEN} from "@/store/mutation-types";

const QS = require('qs')
export default {
    name: "ratePage",
    created() {
        this.token = Vue.ls.get(ACCESS_TOKEN)
        this.filmData = []
        this.loadMovie()
    },
    data() {
        return {
            filmData: [],
            currentPage: 1,
            token: "",
            maxPage: 99,
            currentRating: 2.5,
            heart: '添加至我的最爱',
            spinning: true
        }
    },
    methods: {
        getProgressColor(successPercent) {
            let color = ''
            if (successPercent < 40) {
                color = '#f50'
            } else if (successPercent >= 40 && successPercent < 70) {
                color = '#FF9900'
            } else if (successPercent >= 70) {
                color = '#21d07a'
            }
            return color
        },
        loadMovie() {
            if (this.currentPage <= this.maxPage)
                getMovieByRating(QS.stringify({id: this.token, currentPage: this.currentPage, size: 10})).then(res => {
                    let result = res.result;
                    this.maxPage = result.pages;
                    console.log(result.records)
                    result.records.map(item => {
                        if (item.movieList != null) {
                            if (item.movieList.listName == "我的最爱") {
                                item.spanStyle = "color:#dd56b2;"
                                item.listName = "我的最爱"
                            } else
                                item.listName = "添加至我的最爱"
                        } else
                            item.listName = "添加至我的最爱"
                        this.filmData.push(JSON.parse(JSON.stringify(item)))
                        this.spinning = false
                    })
                    this.currentPage++;
                }).catch(err => {
                    this.$notification.error({
                        message: '失败',
                        description: 'Failed Loading Movies'
                    })
                    this.currentPage = 1;
                })
        },
        updateRating(mid, val) {
            console.log(val)
            updateRatingByUserId(QS.stringify({uid: this.token, mid: mid, rating: val})).then(res => {
                let result = res.result
                if (result == true)
                    this.$notification.success({
                        message: '成功',
                        description: '更新评分成功'
                    })
            }).catch(err => {
                this.$notification.error({
                    message: '失败',
                    description: '更新评分失败'
                })
                this.currentPage = 1;
            })
        }, changeMyHeart(val) {
            console.log(val)
            InsertDelMovieList({userId: this.token, movieId: val, listName: "我的最爱"}).then(res => {
                let result = res.result
                this.$notification.success({
                    message: '成功',
                    description: result
                })
                this.filmData.map(item => {
                    if (item.id == val)
                        if (result == "已添加至我的最爱") {
                            item.spanStyle = "color:#dd56b2;"
                            item.listName = '我的最爱'
                        } else {
                            item.spanStyle = ""
                            item.listName = "添加至我的最爱"
                        }
                })
            }).catch(error => {
                this.$notification.error({
                    message: 'error',
                    description: "操作失败"
                })
            })
        },
        delRateMovie(val) {
            console.log(val)
            delRatingByUserId({userId: this.token, movieId: val}).then(res => {
                let result = res.result
                console.log(result)
                this.$notification.success({
                    message: '成功',
                    description: result
                })
                this.filmData.map((item, index) => {
                    if (item.id == val)
                        this.filmData.splice(index, 1)
                })
            }).catch(err => {
                this.$notification.error({
                    message: 'error',
                    description: "操作失败"
                })
            })
        },
        confirm(val) {
            this.delRateMovie(val)
        },
        cancel() {

        }

    }
}
</script>

<style lang="scss" rel="stylesheet/scss">
.ratePage {
    margin-left: 6%;

    h2 {
        font-family: Arial, Helvetica, sans-serif;
        color: #000;
        font-weight: bold
    }

    a {
        font-family: Arial, Helvetica, sans-serif;
        color: #000;
        font-weight: bold;
        font-size: 25px;
    }

    .rate {
        margin-left: 5px;
        font-family: Arial, Helvetica, sans-serif;
        color: #000;
        font-weight: lighter;
        font-size: 15px;
    }

    h3 {
        color: #999999;
    }

    .ant-radio-group-solid .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) {
        background: #000;
        border-color: #f0f2f5;
    }

    .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) {
        z-index: 1;
        background: #f0f2f5;
        border-color: #f0f2f5;
        -webkit-box-shadow: -1px 0 0 0 red;
        box-shadow: -1px 0 0 0 red;
    }
}

.load-button {
    margin-top: 20px;
    width: 100%;
    height: 50px;
}
</style>