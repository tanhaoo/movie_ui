<template>
    <div class="recommendPage">
        <div style="height: 200px;width:120%;background-color: #2e4a60;margin-left: -25px;margin-top: -25px">
            <div style="margin-left: 6.5%;padding-top:1.5%;">
                <h2 style="color:#fff;font-size: 30px"> 我的推荐 </h2>
            </div>
        </div>
        <div style="margin-left: -25px">
            <a-carousel dot-position="left" autoplay>
                <a-spin v-if="spinning" :spinning="spinning">
                    <a-icon slot="indicator" type="loading" style="font-size: 100px;" spin/>
                    waiting...
                </a-spin>
                <div v-for="item in filmData">
                    <div style="margin-top: -2%">
                        <a-row>
                            <a-col :span="5"></a-col>
                            <a-col :span="4" style="margin-top: 5%">
                                <img style="width: 230px;height:360px;" :src="item.url" @click="toDetail(item.id)"/>
                            </a-col>
                            <a-col :span="4" style="margin-top: -8%">
                                <div style="height: 500px;width: 500px;">
                                    <h2 style="height: 30px;font-size:30px;width: 700px">{{ item.movieName }}</h2>
                                    <h2 style="height: 30px;font-size:20px;">时长：{{ item.timerToHour }}</h2>
                                    <h2 style="height: 30px;font-size:20px;">剧情：{{ item.genre }}</h2>
                                    <h2 style="height: 30px;font-size:20px;">导演：{{ item.directors }}</h2>
                                    <h2 style="height: 30px;font-size:20px;">明星：{{ item.stars }}</h2>
                                    <h2 style="height: 30px;font-size:20px;">上映时间：{{ item.releaseTime }}</h2>
                                </div>
                            </a-col>
                        </a-row>
                    </div>
                </div>
            </a-carousel>
        </div>
    </div>
</template>

<script>
import {getMovieByUserRecommend} from "@/api/film";
import Vue from 'vue'
import {ACCESS_TOKEN} from "@/store/mutation-types";


const QS = require('qs')
export default {
    name: "RecommendPage",
    components: {},
    beforeMount() {
        getMovieByUserRecommend(QS.stringify({uid: this.token})).then(res => {
            let result = res.result
            console.log(result)
            result.map(item => {
                item.timerToHour = parseInt(item.timer / 60) + 'H' + parseInt(item.timer % 60) + 'M'
                this.filmData.push(JSON.parse(JSON.stringify(item)))
            })
            this.spinning = false
        }).catch(err => {
            this.$notification.error({
                message: '失败',
                description: 'Failed Loading Movies'
            })
        })
    },
    data() {
        return {
            filmData: [],
            token: Vue.ls.get(ACCESS_TOKEN),
            spinning: true
        }
    },
    methods: {
        toDetail(id) {
            this.$router.push({name: 'movieId', query: {id: id}})
        },
    }
}
</script>

<style lang="scss" rel="stylesheet/scss">
.recommendPage {
    h2 {
        font-family: Arial, Helvetica, sans-serif;
        color: #fff;
        font-weight: bold;
        font-size: 15px;
        user-select: none;
        white-space: nowrap;
    }

    img {
        cursor: pointer;
    }

    .ant-carousel {
        width: 102%;

        .slick-slide {
            text-align: left;
            height: 490px;
            line-height: 490px;
            background: #1885d0;
            overflow: hidden;
        }

        .slick-slide h3 {
            color: #fff;
        }
    }

}
</style>