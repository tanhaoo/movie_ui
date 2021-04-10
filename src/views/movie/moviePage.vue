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
                            <a-button style="margin-left: 30px" size="large" type="primary" icon="heart"
                                      shape="circle"/>
                            <a-button style="margin-left: 30px" size="large" type="primary" icon="star" shape="circle"/>
                            <a-button style="margin-left: 30px" size="large" type="primary" icon="tag" shape="circle"/>
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
import {getMovieById} from "@/api/film";

const QS = require('qs')
export default {
    name: "moviePage",
    mounted() {
        let parameter = QS.stringify({'id': this.$route.query.id})
        getMovieById(parameter).then(res => {
            let result = res.result
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
            movieDetail: {},
            timerToHour: '0h0m',
        }
    }, methods: {
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