<template>
    <div class="home">
        <div class="banner">
            <div class="activity-panel">
                <ul class="box">
                    <div style="margin-left: -28px;">
                        <li class="content" v-for="(item, index) in filmData" :key="index" @click="linkTo(item)">
                            <img :src="item.movieUrl" class="i"/>
                            <a class="cover-link"></a>
                            <span style="font-size: 15px;font-family: 微软雅黑;font-weight: bold">{{
                                    item.movieName
                                }}</span>
                        </li>
                    </div>
                </ul>
            </div>
            <a-button class="load-button" type="primary" @click="loadMovie()">
                加载更多
            </a-button>
        </div>
    </div>
</template>
<script>


import {getMovieByPages} from "@/api/film";
import store from "@/store";

const QS = require('qs')
const filmData = []

export default {
    name: 'myHome',
    created() {
        this.loadMovie();
        console.log(store.getters.roles.permissionList)
    },
    data() {
        return {
            currentPage: 0,
            filmData
        }
    }
    ,
    methods: {
        linkTo() {
            console.log("123")
        }
        , loadMovie() {
            console.log("loadMovie")
            this.currentPage++;
            let parameter = QS.stringify({'currentPage': this.currentPage, 'size': 30})
            getMovieByPages(parameter).then(res => {
                let result = res.result;
                this.currentPage = result.current
                result.records.map(item => {
                    filmData.push({
                        movieName: item.movieName,
                        movieUrl: item.url
                    })
                })
            }).catch(err => {
                this.$notification.error({
                    message: '失败',
                    description: 'Failed Loading Movies'
                })
            })
        },

    }
}
</script>
<style lang="scss" rel="stylesheet/scss">

.home {
    display: flex;
    flex-direction: column;
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
    margin: 0 auto;

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
        width: 20%;
        height: 320px;
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
        width: 210px;
        height: 280px;
    }

    .cover-link {
        cursor: pointer;
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 4;
        background: url(data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEHAAEALAAAAAABAAEAAAICTAEAOw==) repeat;
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

</style>