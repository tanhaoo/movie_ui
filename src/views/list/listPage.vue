<template>
    <div class="listPage">
        <h2 style="font-size: 25px">我的收藏清单</h2>
        <a-list :grid="{ gutter: 2, column: 2 }" :data-source="data">
            <a-list-item slot="renderItem" slot-scope="item, index">
                <div class="parent" @click="toInformation(item.listName)">
                    <!--                    <img style="width: 630px;height: 350px;opacity: 0.1;" :src="url">-->
                    <div>
                        <h2 class="son" style="font-size: 30px">{{ item.listName }}</h2>
                        <br>
                        <h2 class="son" style="margin-top: -12px;font-size: 20px">{{ item.count }}部影片</h2>
                    </div>
                </div>
            </a-list-item>
        </a-list>
    </div>
</template>

<script>
import {getUserMovieListCount} from "@/api/film";
import {ACCESS_TOKEN} from "@/store/mutation-types";
import Vue from 'vue'

const QS = require('qs')
export default {
    name: "listPage",
    created() {
        getUserMovieListCount(QS.stringify({uid: Vue.ls.get(ACCESS_TOKEN)})).then(res => {
            console.log(res.result)
            this.data = res.result
        }).catch(err => {
        })
    },
    data() {
        return {
            data: [],
            // url: 'https://m.media-amazon.com/images/M/MV5BMjQxM2YyNjMtZjUxYy00OGYyLTg0MmQtNGE2YzNjYmUyZTY1XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_UX182_CR0,0,182,268_AL_.jpg',
        }
    },
    methods: {
        toInformation(val) {
            console.log(val)
            this.$router.push({name: 'listDetail', query: {listName: val}})
        }
    }
}
</script>

<style lang="scss" rel="stylesheet/scss">
.listPage {
    margin-left: 6%;

    h2 {
        font-family: Arial, Helvetica, sans-serif;
        color: #000;
        font-weight: bold
    }

    .parent {
        text-align: center;
        display: table-cell;
        vertical-align: middle;
        background-color: #2e4a60;
        width: 630px;
        height: 350px;
        margin-top: 50px;
        border-radius: 15px;
        position: relative;
    }

    .son {
        display: inline-block;
        color: #fff;
        font-size: 25px;
        cursor: pointer;
    }
}
</style>