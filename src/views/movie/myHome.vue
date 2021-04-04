<template>
    <div class="home">
        <div class="banner">
            <div class="activity-panel">
                <a-list :grid="{gutter: 1, column: 4 }" :data-source="filmData">
                    <a-list-item style="width: 20%" slot="renderItem" slot-scope="item, index">
                        <div style="background-color: #fff;height:350px;width: 180px;border-radius: 8px;">
                            <div style="position:absolute;right:56px;">
                                <a-tooltip overlayClassName="tooltip" trigger="click" placement="bottom">
                                    <template slot="title">
                                        <a-list item-layout="horizontal">
                                            <a-list-item>
                                                <a @click="addListClick(item.movieId)">
                                                    <a-icon type="bars"/>
                                                    添加到收藏清单</a>
                                            </a-list-item>
                                            <a-list-item>
                                                <a>
                                                    <a-icon type="heart" theme="filled"/>
                                                    我的最爱</a>
                                            </a-list-item>
                                            <a-list-item>
                                                <a>
                                                    <a-icon type="star" theme="filled"/>
                                                    你的评分</a>
                                            </a-list-item>
                                        </a-list>
                                    </template>
                                    <a-button ghost type="link">
                                        <a-icon style="font-size: 18px;margin-top: 5px" type="down-circle"
                                                theme="filled"/>
                                    </a-button>
                                </a-tooltip>
                            </div>
                            <img :src="item.movieUrl" class="i"/>
                            <div style="position:absolute;left:10px;margin-top: -17px">
                                <a-progress class="progress" :strokeWidth=12
                                            :strokeColor="getProgressColor(item.movieRating/5*100)" type="circle"
                                            :percent="item.movieRating/5*100" :width="40">
                                    <template #format="percent">
                                        <span style="color:#979A9A">{{ Number(percent).toFixed(0) }}%</span>
                                    </template>
                                </a-progress>
                            </div>
                            <p style="margin-top:25px;font-family: Arial, Helvetica, sans-serif;color: #000;font-size:16px;font-weight: bold;text-align: left;margin-left: 5px">
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


import {getMovieByPages, getMovieBySelectStatus} from "@/api/film";
import store from "@/store";

const QS = require('qs')
const filmData = []

export default {
    name: 'myHome',
    created() {
        // this.$store.commit("SELECT_STATUS", {
        //     queryCondition: []
        // })
        this.loadMovie();
        console.log(store.getters.roles.permissionList)
    },
    data() {
        return {
            currentPage: 0,
            filmData,
            queryCondition: {}
        }
    }
    ,
    methods: {
        linkTo() {
            console.log("123")
        }
        , loadMovie() {
            console.log(this.queryCondition)
            console.log(this.$store.state.selectStatus.queryCondition.resultSort)
            if (this.$store.state.selectStatus.queryCondition.resultSort !== undefined) {
                console.log(JSON.stringify(this.queryCondition))
                console.log(JSON.stringify(this.$store.state.selectStatus.queryCondition))
                this.queryCondition.currentPage = 1
                if (JSON.stringify(this.queryCondition) != JSON.stringify(this.$store.state.selectStatus.queryCondition)) {
                    this.currentPage = 2
                } else {
                    this.currentPage++;
                }
                this.queryCondition = JSON.parse(JSON.stringify(this.$store.state.selectStatus.queryCondition))
                this.queryCondition.currentPage = this.currentPage
            }
            if (this.queryCondition.resultSort === undefined) {
                this.currentPage++;
                let parameter = QS.stringify({'currentPage': this.currentPage, 'size': 30})
                getMovieByPages(parameter).then(res => {
                    let result = res.result;
                    this.currentPage = result.current
                    result.records.map(item => {
                        filmData.push({
                            movieId: item.id,
                            movieName: item.movieName,
                            movieUrl: item.url,
                            movieRating: item.rating
                        })
                    })
                }).catch(err => {
                    this.$notification.error({
                        message: '失败',
                        description: 'Failed Loading Movies'
                    })
                })
            } else {
                console.log("queryCon")
                console.log(this.queryCondition)
                getMovieBySelectStatus(this.queryCondition).then(res => {
                    let result = res.result
                    console.log(result)
                }).catch(err => {

                })
            }
            console.log(this.queryCondition.currentPage + "|page")
        },
        addListClick(value) {
            console.log("list|" + value)
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

    //.cover-link {
    //    cursor: pointer;
    //    display: block;
    //    position: absolute;
    //    top: 0;
    //    right: 0;
    //    bottom: 0;
    //    left: 0;
    //    z-index: 4;
    //    background: url(data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEHAAEALAAAAAABAAEAAAICTAEAOw==) repeat;
    //}

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

</style>