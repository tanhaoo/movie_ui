<template>
    <div class="home">
        <div class="banner">
            <div class="activity-panel">
                <a-spin :spinning="spinning">
                    <a-icon slot="indicator" type="loading" style="font-size: 80px" spin/>
                </a-spin>
                <a-list :grid="{gutter: 1, column: 4 }" :data-source="filmData">
                    <a-list-item style="width: 20%" slot="renderItem" slot-scope="item, index">
                        <div style="background-color: #fff;height:350px;width: 180px;border-radius: 8px;">
                            <div style="position:absolute;right:56px;">
                                <a-tooltip overlayClassName="tooltip" trigger="click"
                                           placement="bottom">
                                    <template slot="title">
                                        <a-list item-layout="horizontal">
                                            <a-list-item>
                                                <a-tooltip trigger="click"
                                                           placement="right"
                                                           overlayClassName="tooltip1">
                                                    <template slot="title">
                                                        <h2 style="color: #fff" @click="createList(item.id)">
                                                            +创建收藏清单
                                                        </h2>
                                                        <a-select
                                                            style="width: 200px"
                                                            default-value="请选择收藏列表"
                                                            @change="selectChange">
                                                            <a-select-option v-for="(selectItem,index) in listData"
                                                                             :key="selectItem.listName"
                                                            >
                                                                {{ selectItem.listName }}
                                                            </a-select-option>
                                                        </a-select>
                                                    </template>
                                                    <a @click="addListClick(item.id)">
                                                        <a-icon type="bars"/>
                                                        添加到收藏清单</a>
                                                </a-tooltip>
                                            </a-list-item>
                                            <a-list-item>
                                                <a @click="changeMyHeart(item.id)">
                                                    <a-icon :style="item.spanStyle" type="heart" theme="filled"/>
                                                    我的最爱</a>
                                            </a-list-item>
                                            <a-list-item>
                                                <a-tooltip trigger="click"
                                                           placement="bottom">
                                                    <template slot="title">
                                                        <a-rate v-model="item.userRating" allow-half/>
                                                        <br>
                                                        <a-button style="width: 100%" type="primary"
                                                                  @click="updateRating(item.id, item.userRating)">确认
                                                        </a-button>
                                                    </template>
                                                    <a>
                                                        <a-icon type="star" theme="filled"/>
                                                        你的评分</a>
                                                </a-tooltip>
                                            </a-list-item>
                                        </a-list>

                                    </template>
                                    <a-button ghost type="link">
                                        <a-icon style="font-size: 18px;margin-top: 5px"
                                                type="down-circle"
                                                theme="filled"/>
                                    </a-button>
                                </a-tooltip>
                            </div>
                            <img :src="item.url" class="i" @click="toDetail(item.id)"/>
                            <div style="position:absolute;left:10px;margin-top: -17px">
                                <a-progress class="progress" :strokeWidth=12
                                            :strokeColor="getProgressColor(item.rating/5*100)" type="circle"
                                            :percent="item.rating/5*100" :width="40">
                                    <template #format="percent">
                                        <span style="color:#979A9A">{{ Number(percent).toFixed(0) }}%</span>
                                    </template>
                                </a-progress>
                            </div>
                            <p style="margin-top:25px;font-family: Arial, Helvetica, sans-serif;color: #000;font-size:16px;font-weight: bold;text-align: left;margin-left: 5px"
                               @click="toDetail(item.id)">
                                {{ item.movieName }}
                                <!--                                <a-rate :default-value="2.5" v-model="item.movieRating" allow-half disabled/>-->
                            </p>
                        </div>
                    </a-list-item>
                </a-list>
            </div>
            <a-button class="load-button" type="primary" @click="loadMovie()">
                加载更多
            </a-button>
        </div>
    </div>
</template>
<script>

import {
    getMovieByPages,
    getMovieBySelectStatus,
    getMovieListNameByUserId,
    InsertDelMovieList,
    insertMovieToList, updateRatingByUserId
} from "@/api/film";
import store from "@/store";
import Vue from 'vue'
import {ACCESS_TOKEN} from "@/store/mutation-types";

const QS = require('qs')
export default {
    name: 'showPage',
    created() {
        console.log(store.getters.roles.permissionList)
        console.log(this.$route.name)
        getMovieListNameByUserId({userId: this.token}).then(res => {
            let result = res.result
            console.log(result)
            result.map(item => {
                this.listData.push(JSON.parse(JSON.stringify(item)))
            })
        }).catch(err => {

        })
    },
    data() {
        return {
            token: Vue.ls.get(ACCESS_TOKEN),
            currentPage: 0,
            filmData: [],
            tempData: [],
            queryCondition: {},
            spinning: true,
            newList: {
                userId: this.token,
                listName: '',
                movieId: ''
            },
            listData: [],
        }
    },
    methods: {
        updateRating(mid, val) {
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
        },
        changeMyHeart(val) {
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
                        } else {
                            item.spanStyle = ""
                        }
                })
            }).catch(error => {
                this.$notification.error({
                    message: 'error',
                    description: "操作失败"
                })
            })
        },
        selectChange(value) {
            this.newList.listName = value
            this.newList.userId = this.token
            console.log(this.newList)
            insertMovieToList(this.newList).then(res => {
                if (res.result.search('成功') !== -1) {
                    this.$notification.success({
                        message: '成功',
                        description: res.result
                    })
                } else {
                    this.$notification.error({
                        message: '失败',
                        description: res.result
                    })
                }
            }).catch(err => {
                this.$notification.error({
                    message: '失败',
                    description: 'Failed Loading Movies'
                })
            })
        },
        createList(val) {
            console.log(val)
            this.$router.push({name: 'newList'})
        },
        linkTo() {
            console.log("123")
        }
        , loadMovie(status, page, clear) {
            if (clear)
                this.filmData = clear
            if (page)
                this.currentPage = page
            if (status)
                this.queryCondition = status
            this.queryCondition.currentPage = this.currentPage
            console.log(this.currentPage)
            console.log(this.queryCondition)
            getMovieBySelectStatus(this.queryCondition).then(res => {
                let result = res.result
                this.tempData = JSON.parse(JSON.stringify(result.records))
                this.tempData.map(item => {
                    if (item.movieList != null) {
                        if (item.movieList.listName == "我的最爱") {
                            item.spanStyle = "color:#dd56b2;"
                        } else {
                            item.spanStyle = ""
                        }
                    } else {
                        item.spanStyle = ""
                    }
                    if (item.movieRating != null) {
                        if (item.movieRating.rating != null)
                            item.userRating = item.movieRating.rating
                        else item.userRating = 0
                    } else
                        item.userRating = 0

                    this.filmData.push(JSON.parse(JSON.stringify(item)))
                })
                console.log(result)
                this.spinning = false
            }).catch(err => {
                this.$notification.error({
                    message: '失败',
                    description: 'Failed Loading Movies'
                })
            })
            this.currentPage++
        },
        addListClick(value) {
            this.newList.movieId = value
        },
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
        toDetail(id) {
            this.$router.push({name: 'movieId', query: {id: id}})
        }
    }
}
</script>
<style lang="scss" rel="stylesheet/scss">

div.ant-progress-circle,
div.ant-progress-line {
    margin-right: 8px;
    margin-bottom: 8px;


    .ant-progress-text {
        color: #e4e8ec;
        font-size: 15px;
        font-weight: bold;
    }
}


.home {
    display: flex;
    flex-direction: column;
}

a {
    font-family: Arial, Helvetica, sans-serif;
    color: #000;
}

.tooltip {
    .ant-tooltip-inner {
        background-color: #fff !important;
    }

    max-width: 400px;
}

.banner {
    cursor: pointer;
    perspective: 3000px;
    position: relative;
    z-index: 19;
    margin: 0 auto;
    width: 1220px;
}

.page {
    position: absolute;
    width: 100%;
    top: 470px;
    z-index: 30;

    .dots {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;

        .dot-active {
            display: inline-block;
            width: 15px;
            height: 15px;
            background-color: whitesmoke;
            border-radius: 8px;
            margin-right: 10px;
            cursor: pointer;
        }

        .dot {
            opacity: 0.2;
        }
    }
}

.load-button {
    width: 1220px;
    height: 50px;
}

.activity-panel {
    width: 1220px;
    margin-left: 48px;

    .box {
        overflow: hidden;
        position: relative;
        z-index: 0;
        margin-top: 5px;
        box-sizing: border-box;
        border: 1px solid rgba(0, 0, 0, .14);
        border-radius: 8px;
        background: #fff;
        box-shadow: 0 3px 8px -6px rgba(0, 0, 0, .1);
        list-style: none;
    }

    .content {
        float: left;
        position: relative;
        box-sizing: border-box;
        width: 225px;
        height: 435px;
        text-align: center;
    }

    .content ::before {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        box-sizing: border-box;
        border-left: 1px solid #f2f2f2;
        border-left: 1px solid rgba(0, 0, 0, .1);
        width: 100%;
        height: 100%;
        content: "";
        pointer-events: none;
    }

    .i {
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        width: 180px;
        height: 270px;
    }

    a {
        color: #5079d9;
        cursor: pointer;
        transition: all .15s ease-out;
        text-decoration: none;
    }

    a:hover {
        box-shadow: inset 0 0 38px rgba(0, 0, 0, .08);
        transition: all .15s ease;
    }
}

.tooltip1 {
    .ant-tooltip-inner {
        height: 90px;
        background-color: #01b4e4 !important;
    }

    h2 {
        cursor: pointer;
        font-weight: bold;
    }

    width: 800px;
}

</style>