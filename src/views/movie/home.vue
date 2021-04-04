<template>
    <div style="width: 80%;left: 10%;position:relative">
        <h2 style="font-family: Arial, Helvetica, sans-serif;color: #000;font-size:36px;font-weight: bold">
            欢迎。</h2>
        <h3>这里有海量的电影、剧集和人物等你来发现。快来探索吧！</h3>
        <a-input-search
            style="height: 80px"
            placeholder="搜索电影、编剧、导演、明星...."
            :loading="loading"
            enter-button="Search"
            size="large"
            @search="onSearch"
        />
        <div v-for="item in allData">
            <h3 style="font-size: 20px">{{ item.title }}</h3>
            <a-carousel autoplay>
                <div>
                    <a-list :grid="{gutter: 1, column: 4 }" :data-source="item.data[0]">
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
                                     :src="item.url"/>
                                <div style="position:absolute;left:50px;margin-top: -17px">
                                    <a-progress class="progress" :strokeWidth=12
                                                :strokeColor="getProgressColor(item.rating/5*100)"
                                                type="circle"
                                                :percent="(item.rating/5*100)" :width="40">
                                        <template #format="percent">
                                                    <span style="color:#979A9A;font-size: 15px;font-weight: bold">{{
                                                            percent
                                                        }}%</span>
                                        </template>
                                    </a-progress>
                                </div>
                                <p style="margin-top: 20px">
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
                                     :src="item.url"/>
                                <div style="position:absolute;left:50px;margin-top: -17px">
                                    <a-progress class="progress" :strokeWidth=12
                                                :strokeColor="getProgressColor(item.rating/5*100)"
                                                type="circle"
                                                :percent="(item.rating/5*100)" :width="40">
                                        <template #format="percent">
                                                    <span style="color:#979A9A;font-size: 15px;font-weight: bold">{{
                                                            percent
                                                        }}%</span>
                                        </template>
                                    </a-progress>
                                </div>
                                <p style="margin-top: 20px">
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
                                     :src="item.url"/>
                                <div style="position:absolute;left:50px;margin-top: -17px">
                                    <a-progress class="progress" :strokeWidth=12
                                                :strokeColor="getProgressColor(item.rating/5*100)"
                                                type="circle"
                                                :percent="(item.rating/5*100)" :width="40">
                                        <template #format="percent">
                                                    <span style="color:#979A9A;font-size: 15px;font-weight: bold">{{
                                                            percent
                                                        }}%</span>
                                        </template>
                                    </a-progress>
                                </div>
                                <p style="margin-top: 20px">
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
                                     :src="item.url"/>
                                <div style="position:absolute;left:50px;margin-top: -17px">
                                    <a-progress class="progress" :strokeWidth=12
                                                :strokeColor="getProgressColor(item.rating/5*100)"
                                                type="circle"
                                                :percent="(item.rating/5*100)" :width="40">
                                        <template #format="percent">
                                                    <span style="color:#979A9A;font-size: 15px;font-weight: bold">{{
                                                            percent
                                                        }}%</span>
                                        </template>
                                    </a-progress>
                                </div>
                                <p style="margin-top: 20px">
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
import {getMovieBySelectStatus} from "@/api/film";

export default {
    name: "Home",
    created() {
        if (store.getters.roles.permissionList != undefined)
            store.getters.roles.permissionList.map(item => {
                if (item == '901')
                    this.isLogin = true;
            })
        this.getMovieShow()
        console.log(this.allData)
    },
    data() {
        return {
            loading: false,
            hotDropsStatus: {
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
            secondShow: [],
            thirdShow: [],
            forthShow: [],
            isLogin: false,
            allData: [
                {
                    "title": '热门',
                    "data": []
                },
                {
                    "title": "趋势",
                    "data": []
                }
            ]
        }
    },
    methods: {
        login() {
            this.$router.push({name: 'login'});
        },
        register() {
            this.$router.push({name: 'register'});
        },
        addListClick(value) {
            console.log("list|" + value)
        },
        addHeartClick(value) {
            console.log(this.isLogin)
        },
        onSearch(value) {
            this.loading = true
            console.log(value);
            setTimeout(() => {
                console.log(1)
                this.loading = false
            }, 1000)
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

h2 {
    font-family: Arial, Helvetica, sans-serif;
    color: #000;
    font-size: 36px;
    font-weight: bold
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

.ant-carousel {

    .slick-slide {
        text-align: center;
        height: 390px;
        line-height: 160px;
        background: #2d3a4b;
        overflow: hidden;
    }
}

.ant-carousel {
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

</style>