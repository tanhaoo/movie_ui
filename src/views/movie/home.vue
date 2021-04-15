<template>
    <div class="home" style="width: 80%;left: 10%;position:relative">
        <h2 style="font-family: Arial, Helvetica, sans-serif;color: #000;font-size:36px;font-weight: bold">
            欢迎。</h2>
        <h3>这里有海量的电影、剧集和人物等你来发现。快来探索吧！</h3>
        <a-select
            size="large"
            show-search
            placeholder="搜索电影、编剧、导演、明星...."
            :value="value"
            style="width: 1050px;"
            :default-active-first-option="false"
            :show-arrow="false"
            :filter-option="false"
            :not-found-content="null"
            :loading="isLoading"
            @search="handleSearch"
            @change="handleChange"
        >
            <a-select-option v-for="item in filmData" :key="item.id">
                <a-row type="flex">
                    <a-col :flex="1"><img style="height: 120px;width: 80px" :src="item.url"></a-col>
                    <a-col :flex="1">
                        <a-row type="flex">
                            <a-col :flex="1">
                                <div style="margin-left: 10px">
                                    <h2 style="font-size: 25px">{{ item.movieName }}</h2>
                                    <h2 style="font-size:15px">{{ item.genre }}</h2>
                                </div>
                            </a-col>
                        </a-row>
                    </a-col>
                </a-row>
            </a-select-option>
        </a-select>

        <div style="margin-top: 60px" v-for="item in allData">
            <h3 style="font-size: 20px">{{ item.title }}</h3>
            <a-carousel arrows>
                <div
                    slot="prevArrow"
                    slot-scope="props"
                    class="custom-slick-arrow"
                    style="left: 10px;zIndex: 1"
                >
                    <a-icon type="left-circle"/>
                </div>
                <div slot="nextArrow" slot-scope="props" class="custom-slick-arrow" style="right: 6px">
                    <a-icon type="right-circle"/>
                </div>
                <a-spin v-if="spinning" :spinning="spinning">
                    <a-icon slot="indicator" type="loading" style="font-size: 80px" spin/>
                </a-spin>
                <div>
                    <a-list :grid="{gutter: 1, column: 4 }" :data-source="item.data[0]">
                        <a-list-item style="width: 16%;" slot="renderItem" slot-scope="item, index">
                            <div
                                style="height:330px;width: 160px;border-radius: 8px;margin-left: 42px;margin-top: 20px;background-color: #fff">
                                <div style="position:absolute;right:-10px;">
                                    <a-tooltip overlayClassName="tooltip" trigger="click"
                                               placement="bottom">
                                        <template slot="title">
                                            <a-list v-if="isLogin" item-layout="horizontal">
                                                <a-list-item>
                                                    <a @click="addListClick(item.id)">
                                                        <a-icon type="bars"/>
                                                        添加到收藏清单</a>
                                                </a-list-item>
                                                <a-list-item>
                                                    <a @click="addHeartClick(item.id)">
                                                        <a-icon type="heart" theme="filled"/>
                                                        我的最爱</a>
                                                </a-list-item>
                                                <a-list-item>
                                                    <a-tooltip trigger="click"
                                                               placement="bottom">
                                                        <template slot="title">
                                                            <a-rate :default-value="2.5" allow-half/>
                                                            <br>
                                                            <a-button style="width: 100%" type="primary">确认
                                                            </a-button>
                                                        </template>
                                                        <a>
                                                            <a-icon type="star" theme="filled"/>
                                                            你的评分</a>
                                                    </a-tooltip>
                                                </a-list-item>
                                            </a-list>
                                            <a-list v-else item-layout="horizontal">
                                                <span style="color: #000">想对此项目评分或将其添加到清单中？</span>
                                                <a-list-item>
                                                    <a-button type="primary" style="width: 70%"
                                                              @click="login">登录
                                                    </a-button>
                                                </a-list-item>
                                                <span style="color: #000">不是会员？</span>
                                                <a-list-item>
                                                    <a-button type="primary" style="width: 70%"
                                                              @click="register">注册
                                                    </a-button>
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
                                <img class="showImg"
                                     :src="item.url"
                                     @click="toDetail(item.id)"/>
                                <div style="position:absolute;left:50px;margin-top: -17px">
                                    <a-progress class="progress" :strokeWidth=12
                                                :strokeColor="getProgressColor(item.rating/5*100)"
                                                type="circle"
                                                :percent="(item.rating/5*100)" :width="40">
                                        <template #format="percent">
                                                    <span style="color:#979A9A;font-size: 15px;font-weight: bold">{{
                                                            Number(percent).toFixed(0)
                                                        }}%</span>
                                        </template>
                                    </a-progress>
                                </div>
                                <p style="margin-top: 20px" @click="toDetail(item.id)">
                                    {{ item.movieName }}
                                </p>
                            </div>
                        </a-list-item>
                    </a-list>
                </div>
                <div>
                    <a-list :grid="{gutter: 1, column: 4 }" :data-source="item.data[1]">
                        <a-list-item style="width: 16%" slot="renderItem" slot-scope="item, index">
                            <div
                                style="height:330px;width: 160px;border-radius: 8px;margin-left: 42px;margin-top: 20px;background-color: #fff">
                                <div style="position:absolute;right:-10px;">
                                    <a-tooltip overlayClassName="tooltip" trigger="click"
                                               placement="bottom">
                                        <template slot="title">
                                            <a-list v-if="isLogin" item-layout="horizontal">
                                                <a-list-item>
                                                    <a @click="addListClick(item.id)">
                                                        <a-icon type="bars"/>
                                                        添加到收藏清单</a>
                                                </a-list-item>
                                                <a-list-item>
                                                    <a @click="addHeartClick(item.id)">
                                                        <a-icon type="heart" theme="filled"/>
                                                        我的最爱</a>
                                                </a-list-item>
                                                <a-list-item>
                                                    <a-tooltip trigger="click"
                                                               placement="bottom">
                                                        <template slot="title">
                                                            <a-rate :default-value="2.5" allow-half/>
                                                            <br>
                                                            <a-button style="width: 100%" type="primary">确认
                                                            </a-button>
                                                        </template>
                                                        <a>
                                                            <a-icon type="star" theme="filled"/>
                                                            你的评分</a>
                                                    </a-tooltip>
                                                </a-list-item>
                                            </a-list>
                                            <a-list v-else item-layout="horizontal">
                                                <span style="color: #000">想对此项目评分或将其添加到清单中？</span>
                                                <a-list-item>
                                                    <a-button type="primary" style="width: 70%"
                                                              @click="login">登录
                                                    </a-button>
                                                </a-list-item>
                                                <span style="color: #000">不是会员？</span>
                                                <a-list-item>
                                                    <a-button type="primary" style="width: 70%"
                                                              @click="register">注册
                                                    </a-button>
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
                                <img class="showImg"
                                     :src="item.url"
                                     @click="toDetail(item.id)"/>
                                <div style="position:absolute;left:50px;margin-top: -17px">
                                    <a-progress class="progress" :strokeWidth=12
                                                :strokeColor="getProgressColor(item.rating/5*100)"
                                                type="circle"
                                                :percent="(item.rating/5*100)" :width="40">
                                        <template #format="percent">
                                                    <span style="color:#979A9A;font-size: 15px;font-weight: bold">{{
                                                            Number(percent).toFixed(0)
                                                        }}%</span>
                                        </template>
                                    </a-progress>
                                </div>
                                <p style="margin-top: 20px" @click="toDetail(item.id)">
                                    {{ item.movieName }}
                                </p>
                            </div>
                        </a-list-item>
                    </a-list>
                </div>
                <div>
                    <a-list :grid="{gutter: 1, column: 4 }" :data-source="item.data[2]">
                        <a-list-item style="width: 16%" slot="renderItem" slot-scope="item, index">
                            <div
                                style="height:330px;width: 160px;border-radius: 8px;margin-left: 42px;margin-top: 20px;background-color: #fff">
                                <div style="position:absolute;right:-10px;">
                                    <a-tooltip overlayClassName="tooltip" trigger="click"
                                               placement="bottom">
                                        <template slot="title">
                                            <a-list v-if="isLogin" item-layout="horizontal">
                                                <a-list-item>
                                                    <a @click="addListClick(item.id)">
                                                        <a-icon type="bars"/>
                                                        添加到收藏清单</a>
                                                </a-list-item>
                                                <a-list-item>
                                                    <a @click="addHeartClick(item.id)">
                                                        <a-icon type="heart" theme="filled"/>
                                                        我的最爱</a>
                                                </a-list-item>
                                                <a-list-item>
                                                    <a-tooltip trigger="click"
                                                               placement="bottom">
                                                        <template slot="title">
                                                            <a-rate :default-value="2.5" allow-half/>
                                                            <br>
                                                            <a-button style="width: 100%" type="primary">确认
                                                            </a-button>
                                                        </template>
                                                        <a>
                                                            <a-icon type="star" theme="filled"/>
                                                            你的评分</a>
                                                    </a-tooltip>
                                                </a-list-item>
                                            </a-list>
                                            <a-list v-else item-layout="horizontal">
                                                <span style="color: #000">想对此项目评分或将其添加到清单中？</span>
                                                <a-list-item>
                                                    <a-button type="primary" style="width: 70%"
                                                              @click="login">登录
                                                    </a-button>
                                                </a-list-item>
                                                <span style="color: #000">不是会员？</span>
                                                <a-list-item>
                                                    <a-button type="primary" style="width: 70%"
                                                              @click="register">注册
                                                    </a-button>
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
                                <img class="showImg"
                                     :src="item.url" @click="toDetail(item.id)"/>
                                <div style="position:absolute;left:50px;margin-top: -17px">
                                    <a-progress class="progress" :strokeWidth=12
                                                :strokeColor="getProgressColor(item.rating/5*100)"
                                                type="circle"
                                                :percent="(item.rating/5*100)" :width="40">
                                        <template #format="percent">
                                                    <span style="color:#979A9A;font-size: 15px;font-weight: bold">{{
                                                            Number(percent).toFixed(0)
                                                        }}%</span>
                                        </template>
                                    </a-progress>
                                </div>
                                <p style="margin-top: 20px;" @click="toDetail(item.id)">
                                    {{ item.movieName }}
                                </p>
                            </div>
                        </a-list-item>
                    </a-list>
                </div>
                <div>
                    <a-list :grid="{gutter: 1, column: 4 }" :data-source="item.data[3]">
                        <a-list-item style="width: 16%" slot="renderItem" slot-scope="item, index">
                            <div
                                style="height:330px;width: 160px;border-radius: 8px;margin-left: 42px;margin-top: 20px;background-color: #fff">
                                <div style="position:absolute;right:-10px;">
                                    <a-tooltip overlayClassName="tooltip" trigger="click"
                                               placement="bottom">
                                        <template slot="title">
                                            <a-list v-if="isLogin" item-layout="horizontal">
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
                                                    <a @click="addHeartClick(item.id)">
                                                        <a-icon type="heart" theme="filled"/>
                                                        我的最爱</a>
                                                </a-list-item>
                                                <a-list-item>
                                                    <a-tooltip trigger="click"
                                                               placement="bottom">
                                                        <template slot="title">
                                                            <a-rate :default-value="2.5" allow-half/>
                                                            <br>
                                                            <a-button style="width: 100%" type="primary">确认
                                                            </a-button>
                                                        </template>
                                                        <a>
                                                            <a-icon type="star" theme="filled"/>
                                                            你的评分</a>
                                                    </a-tooltip>
                                                </a-list-item>
                                            </a-list>
                                            <a-list v-else item-layout="horizontal">
                                                <span style="color: #000">想对此项目评分或将其添加到清单中？</span>
                                                <a-list-item>
                                                    <a-button type="primary" style="width: 70%"
                                                              @click="login">登录
                                                    </a-button>
                                                </a-list-item>
                                                <span style="color: #000">不是会员？</span>
                                                <a-list-item>
                                                    <a-button type="primary" style="width: 70%"
                                                              @click="register">注册
                                                    </a-button>
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
                                <img class="showImg"
                                     :src="item.url" @click="toDetail(item.id)"/>
                                <div style="position:absolute;left:50px;margin-top: -17px">
                                    <a-progress class="progress" :strokeWidth=12
                                                :strokeColor="getProgressColor(item.rating/5*100)"
                                                type="circle"
                                                :percent="(item.rating/5*100)" :width="40">
                                        <template #format="percent">
                                                    <span style="color:#979A9A;font-size: 15px;font-weight: bold">{{
                                                            Number(percent).toFixed(0)
                                                        }}%</span>
                                        </template>
                                    </a-progress>
                                </div>
                                <p style="margin-top: 20px" @click="toDetail(item.id)">
                                    {{ item.movieName }}
                                </p>
                            </div>
                        </a-list-item>
                    </a-list>
                </div>
            </a-carousel>
            <br>
        </div>
    </div>
</template>

<script>
import store from "@/store";
import {getMovieByKeyWord, getMovieBySelectStatus, getMovieListNameByUserId, insertMovieToList} from "@/api/film";
import Vue from 'vue'
import {ACCESS_TOKEN} from "@/store/mutation-types";

let timeout;

function fetch(value, callback) {
    if (timeout) {
        clearTimeout(timeout);
        timeout = null;
    }

    function fake() {
        getMovieByKeyWord(QS.stringify({keyword: value})).then(res => {
            let result = res.result
            callback(result);
        }).catch(err => {
            this.$notification.error({
                message: 'error',
                description: "Loading Films Failed"
            })
        })
    }

    timeout = setTimeout(fake, 300);
}

const QS = require('qs')
export default {
    name: "Home",
    created() {
        if (store.getters.roles.permissionList != undefined)
            store.getters.roles.permissionList.map(item => {
                if (item == '901') {
                    this.isLogin = true;
                    getMovieListNameByUserId({userId: this.token}).then(res => {
                        let result = res.result
                        console.log(result)
                        result.map(item => {
                            this.listData.push(JSON.parse(JSON.stringify(item)))
                        })
                    }).catch(err => {

                    })
                }
            })
        this.getMovieShow()
        console.log(this.allData)
    },
    data() {
        return {
            token: Vue.ls.get(ACCESS_TOKEN),
            listData: [],
            value: undefined,
            filmData: [],
            movieId: [],
            hotDropsStatus: {
                userId: Vue.ls.get(ACCESS_TOKEN),
                resultSort: "hotDrops",
                //显示状态 1 全部 2未观看 3 已观看
                display: 1,
                type: [],
                rating: [1, 5],
                vote: 0,
                time: [0, 400],
                currentPage: 1,
                size: 30
            },
            rateDropsStatus: {
                userId: Vue.ls.get(ACCESS_TOKEN),
                resultSort: "rateDrops",
                //显示状态 1 全部 2未观看 3 已观看
                display: 1,
                type: [],
                rating: [1, 5],
                vote: 0,
                time: [0, 400],
                currentPage: 1,
                size: 30
            },
            showData: [],
            hotData: [],
            rateData: [],
            firstShow: [],
            isLogin: false,
            isLoading: false,
            allData: [
                {
                    "title": '热门',
                    "data": []
                },
                {
                    "title": "趋势",
                    "data": []
                }
            ],
            newList: {
                userId: this.token,
                listName: '',
                movieId: ''
            },
            spinning: true
        }
    },
    methods: {
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
        handleSearch(val) {
            if (val != '') {
                this.isLoading = true
                fetch(val, data => {
                    console.log(data)
                    this.filmData = data
                    this.isLoading = false
                })
            }
        },
        handleChange(val) {
            console.log('change ' + val)
            this.value = val.movieName
            this.filmData.map(item => {
                if (item.id === val) {
                    this.value = item.movieName
                }
            })
            this.$router.push({name: 'movieId', query: {id: val}})
        },
        toDetail(id) {
            this.$router.push({name: 'movieId', query: {id: id}})
        },
        login() {
            this.$router.push({name: 'login'});
        },
        register() {
            this.$router.push({name: 'register'});
        },
        addListClick(value) {
            this.newList.movieId = value
            console.log(this.newList)
        },
        addHeartClick(value) {
            console.log(this.isLogin)
        },
        getMovieShow() {
            getMovieBySelectStatus(this.hotDropsStatus).then(res => {
                let result = res.result
                let current = 0
                let flag = 0
                this.firstShow = []
                this.showData = JSON.parse(JSON.stringify(result.records))
                this.showData.map((item, index) => {
                    if (flag == current)
                        this.firstShow.push(item)
                    else {
                        flag++;
                        this.firstShow = []
                        this.firstShow.push(item)
                    }
                    if (index % 6 == 5) {
                        this.allData[0].data.push(JSON.parse(JSON.stringify(this.firstShow)))
                        current++;
                    }
                })
                console.log(this.allData)
                this.spinning = false
            }).catch(err => {
                this.$notification.error({
                    message: '失败',
                    description: 'Failed Loading Movies'
                })
            })
            getMovieBySelectStatus(this.rateDropsStatus).then(res => {
                let result = res.result
                let current = 0
                let flag = 0
                this.firstShow = []
                this.showData = JSON.parse(JSON.stringify(result.records))
                this.showData.map((item, index) => {
                    if (flag == current)
                        this.firstShow.push(item)
                    else {
                        flag++;
                        this.firstShow = []
                        this.firstShow.push(item)
                    }
                    if (index % 6 == 5) {
                        this.allData[1].data.push(JSON.parse(JSON.stringify(this.firstShow)))
                        current++;
                    }
                })
            }).catch(err => {
                this.$notification.error({
                    message: '失败',
                    description: 'Failed Loading Movies'
                })
            })

        }, getProgressColor(successPercent) {
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
        createList(val) {
            console.log(val)
            this.$router.push({name: 'newList'})
        }
    },
}
</script>

<style lang="scss" rel="stylesheet/scss">

.ant-progress-text {
    color: #e4e8ec;
    font-size: 15px;
    font-weight: bold;
}

p {
    font-family: Arial, Helvetica, sans-serif;
    color: #000;
    font-size: 16px;
    font-weight: bold;
    text-align: left;
    margin-left: 5px
}

.home {
    h2 {
        font-family: Arial, Helvetica, sans-serif;
        color: #000;
        font-size: 36px;
        font-weight: bold
    }
}

span {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 15px;
    font-weight: bold
}

h3 {
    font-family: Arial, Helvetica, sans-serif;
    color: #000;
    font-size: 26px;
    font-weight: bold
}

.showImg {
    width: 160px;
    height: 240px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    text-align: center;
}

img, p {
    cursor: pointer;
}

.ant-carousel {

    .custom-slick-arrow {
        width: 25px;
        height: 25px;
        font-size: 25px;
        color: #fff;
        background-color: rgba(31, 45, 61, 0.11);
        opacity: 0.3;
    }

    .slick-slide {
        text-align: center;
        height: 390px;
        line-height: 160px;
        background: #2d3a4b;
        overflow: hidden;
    }

    .custom-slick-arrow:before {
        display: none;
    }

    .custom-slick-arrow:hover {
        opacity: 0.5;
    }

    .slick-slide h3 {
        color: #fff;
    }
}

.tooltip {
    .ant-tooltip-inner {
        background-color: #fff !important;
    }

    max-width: 400px;
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