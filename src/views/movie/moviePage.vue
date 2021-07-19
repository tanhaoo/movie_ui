<template>
    <div>
        <a-row type="flex" align="middle">
            <a-col flex="300px">
                <div style="margin-left: 30px;margin-top: 20px">
                    <img style="width: 300px"
                         slot="cover"
                         alt="example"
                         :src="movieDetail.url">
                </div>
            </a-col>
            <a-col flex="auto">
                <div class="moviePage" style="margin-left: 30px;margin-top: 12px">
                    <h2 style="font-size: 40px">{{ movieDetail.movieName }}</h2>
                    <h2>时长：{{ timerToHour }}</h2>
                    <h2>剧情：{{ movieDetail.genre }}</h2>
                    <h2>导演：{{ movieDetail.directors }}</h2>
                    <h2>明星：{{ movieDetail.stars }}</h2>
                    <h2>上映时间：{{ movieDetail.releaseTime }}</h2>
                    <div style="width: 700px">
                        <h2>简介：{{ movieDetail.introduce }}</h2>
                    </div>
                    <hr align=left width=100% color=#d9d9d9 size=1/>
                    <h2>平均评分</h2>
                    <div>
                        <a-progress class="progress" :strokeWidth=12
                                    :strokeColor="getProgressColor(movieDetail.rating/5*100)" type="circle"
                                    :percent="movieDetail.rating/5*100" :width="70">
                            <template #format="percent">
                                <span style="color:#000;font-size: 18px;font-weight: bold">{{
                                        Number(percent).toFixed(0)
                                    }}%</span>
                            </template>
                        </a-progress>
                        <a-button style="margin-left: 30px;" :style="movieDetail.spanStyle" size="large" type="primary"
                                  icon="heart" shape="circle" @click="changeMyHeart(movieDetail.id)"/>
                        <a-tooltip trigger="click"
                                   placement="bottom">
                            <template slot="title">
                                <a-rate v-model="movieDetail.userRating" allow-half/>
                                <br>
                                <a-button style="width: 100%" type="primary"
                                          @click="updateRating(movieDetail.id, movieDetail.userRating)">确认
                                </a-button>
                            </template>
                            <a-button style="margin-left: 30px" size="large" type="primary" icon="star" shape="circle"/>
                        </a-tooltip>
                        <a-tooltip trigger="click"
                                   placement="right"
                                   overlayClassName="tooltip1">
                            <template slot="title">
                                <h2 style="color: #fff" @click="createList(token)">
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
                            <a-button style="margin-left: 30px" size="large" type="primary" icon="tag" shape="circle"
                                      @click="addListClick(movieDetail.id)"/>
                        </a-tooltip>
                    </div>
                </div>
            </a-col>
        </a-row>
        <a-divider/>
        <!--        <h2>-->
        <!--            推荐-->
        <!--        </h2>-->
        <!--        <a-list :grid="{ gutter: 16, column: 4 }" :data-source="data">-->
        <!--            <a-list-item slot="renderItem" slot-scope="item, index">-->
        <!--                <a-card style="width: 240px">-->
        <!--                    <img-->
        <!--                        slot="cover"-->
        <!--                        alt="example"-->
        <!--                        :src="movieDetail.url"-->
        <!--                    />-->
        <!--                    <a-card-meta title="Europe Street beat">-->
        <!--                        <template slot="description">-->
        <!--                            www.instagram.com-->
        <!--                        </template>-->
        <!--                    </a-card-meta>-->
        <!--                </a-card>-->
        <!--            </a-list-item>-->
        <!--        </a-list>-->

    </div>
</template>

<script>
import {
    getMovieById,
    getMovieListNameByUserId,
    InsertDelMovieList,
    insertMovieToList,
    updateRatingByUserId
} from "@/api/film";
import {ACCESS_TOKEN} from "@/store/mutation-types";
import Vue from 'vue'

const QS = require('qs')
export default {
    name: "moviePage",
    mounted() {
        getMovieListNameByUserId({userId: this.token}).then(res => {
            let result = res.result
            console.log(result)
            result.map(item => {
                this.listData.push(JSON.parse(JSON.stringify(item)))
            })
        }).catch(err => {

        })
        let parameter = QS.stringify({'id': this.$route.query.id, 'uid': this.token})
        getMovieById(parameter).then(res => {
            let result = res.result

            if (result.movieList != null) {
                if (result.movieList.listName == "我的最爱") {
                    result.spanStyle = "background-color:#dd56b2;"
                } else {
                    result.spanStyle = ""
                }
            } else {
                result.spanStyle = ""
            }
            if (result.movieRating != null) {
                if (result.movieRating.rating != null)
                    result.userRating = result.movieRating.rating
                else result.userRating = 0
            } else
                result.userRating = 0

            this.movieDetail = result
            console.log(this.movieDetail)
            this.timerToHour = parseInt(this.movieDetail.timer / 60) + 'h' + parseInt(this.movieDetail.timer % 60) + 'min'
        }).catch(err => {
            this.$notification.error({
                message: '失败',
                description: 'Failed Loading Movies'
            })
        })
    }, data() {
        return {
            token: Vue.ls.get(ACCESS_TOKEN),
            movieDetail: {},
            timerToHour: '0h0m',
            newList: {
                userId: this.token,
                listName: '',
                movieId: ''
            },
            listData: [],
        }
    }, methods: {
        createList(val) {
            console.log(val)
            this.$router.push({name: 'newList'})
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
        addListClick(value) {
            this.newList.movieId = value
        },
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
                if (this.movieDetail.id == val)
                    if (result == "已添加至我的最爱") {
                        this.movieDetail.spanStyle = "background-color:#dd56b2;"
                    } else {
                        this.movieDetail.spanStyle = ""
                    }
            }).catch(error => {
                this.$notification.error({
                    message: 'error',
                    description: "操作失败"
                })
            })
        },
        getInteger(val) {
            console.log(val)
            return Number(val).toFixed(0)
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
        }
    }
}
</script>

<style lang="scss" rel="stylesheet/scss">
.moviePage {
    h2 {
        font-family: Arial, Helvetica, sans-serif;
        color: #000;
        font-weight: bold
    }
}

.space-align-block {
    margin: 8px 0px 4px 50px;
    border: 1px solid #40a9ff;
    /*background-color: #2d3a4b;*/
    padding: 4px;
    height: 500px;
    width: 90%;
}

.space-align-block .mock-block {
    display: inline-block;
    padding: 32px 8px 16px;
    background: rgba(150, 150, 150, 0.2);
}


</style>