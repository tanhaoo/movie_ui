<template>
    <div class="listDetail">
        <div style="height: 200px;width:120%;background-color: #2e4a60;margin-left: -25px;margin-top: -25px">
            <div style="margin-left: 6.5%;padding-top:1.5%;">
                <h2 style="color:#fff;font-size: 30px">{{ movieList.listName }}</h2>
                <div style="margin-left: 4%">
                    <a-row type="flex">
                        <a-col :flex="1">
                            <h2 style="color:#fff;font-size: 20px;">A list by</h2>
                            <a style="font-size: 20px;">{{ nickname }}</a>
                        </a-col>
                        <a-col :flex="1" style="margin-left: 40px">
                            <a-button type="primary" style="width: 70px;height: 40px;margin-top: 10px"
                                      @click="showModal(movieList.listName)">编辑
                            </a-button>
                            <a-modal
                                :title="title"
                                :visible="visible"
                                @ok="handleOk"
                                @cancel="handleCancel"
                            >
                                <a-input v-if="updateName" v-model="newList.listName"/>
                                <h2 v-else>操作不可取消！</h2>
                            </a-modal>
                        </a-col>
                        <a-col :flex="1" style="margin-left: 20px">
                            <a-button type="primary" style="width: 70px;height: 40px;margin-top: 10px"
                                      @click="showConfirm(movieList)">移除
                            </a-button>
                        </a-col>
                    </a-row>
                </div>
            </div>
        </div>
        <div style="height: 105px;width:120%;background-color: #eeeded;margin-left: -25px;margin-top: -25px">
            <div style="margin-left: 6.5%;padding-top:1.5%;">
                <div style="margin-left: 4%">
                    <a-row :gutter="16">
                        <a-col :span="6">
                            <h2 style="color:#01b4e4;font-size: 30px;font-style:oblique;text-align: center">
                                {{ count }}</h2>
                            <h2 style="color:#01b4e4;font-size: 15px;margin-top: -20px;text-align: center">清单项</h2>
                        </a-col>
                        <a-col :span="6">
                            <h2 style="color:#01b4e4;font-size: 30px;font-style:oblique;text-align: center">
                                {{ Number(averageScore).toFixed(0) }}%</h2>
                            <h2 style="color:#01b4e4;font-size: 15px;margin-top: -20px;text-align: center">平均分</h2>
                        </a-col>
                        <a-col :span="6">
                            <h2 style="color:#01b4e4;font-size: 30px;font-style:oblique;text-align: center">
                                {{ Math.floor(allTime / 60) }}H{{ allTime % 60 }}M</h2>
                            <h2 style="color:#01b4e4;font-size: 15px;margin-top: -20px;text-align: center">总时长</h2>
                        </a-col>
                    </a-row>
                </div>
            </div>
        </div>
        <div style="height: 105px;width:120%;background-color: #f0f2f5;margin-left: -25px;">
            <div style="margin-left: 6.5%;padding-top:1.5%;">
                <a-list :grid="{gutter: 1, column: 4 }" :data-source="filmData">
                    <a-list-item style="width: 16%" slot="renderItem" slot-scope="item, index">
                        <img class="showImg"
                             :src="item.url"
                             @click="toDetail(item.id)"/>
                        <div style="width: 200px;height: 30px;background-color: #032541;">
                            <a-row>
                                <a-col :span="14" style="margin-top: 5px">
                                    <a style="margin-left:10px;font-size: 15px">{{ index + 1 }}</a>
                                </a-col>
                                <a-col :span="10" style="margin-top: 5px">
                                    <a :style="item.spanStyle" @click="changeMyHeart(item.id)">
                                        <a-icon type="heart" theme="filled"/>
                                        {{ item.listName }}
                                    </a>
                                    <a-icon type="star" theme="filled" style="color: #eec407;margin-left: 5px"/>
                                    <span
                                        style="color: #01b4e4;margin-left: 5px;font-family: Arial, Helvetica, sans-serif;font-weight: bold">{{
                                            Number(item.rating / 5 * 100).toFixed(0)
                                        }}%</span>
                                </a-col>
                            </a-row>
                        </div>
                    </a-list-item>
                </a-list>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from "vuex";
import {deleteMovieList, getMovieListByUserId, InsertDelMovieList, updateMovieList} from "@/api/film";
import Vue from 'vue'
import {ACCESS_TOKEN} from "@/store/mutation-types";

export default {
    name: "listDetail",
    computed: {
        ...mapGetters(['nickname', 'avatar'])
    }, created() {
        this.filmData = []
        this.movieList.listName = this.$route.query.listName
        getMovieListByUserId(this.movieList).then(res => {
            let result = res.result
            result.map(item => {
                this.count++;
                this.averageScore += item.rating
                this.allTime += Number(item.timer)
                if (item.movieList != null) {
                    if (item.movieList.listName == "我的最爱") {
                        item.spanStyle = "color:#dd56b2;"
                    } else {
                        item.spanStyle = ""
                    }
                } else {
                    item.spanStyle = ""
                }
                this.filmData.push(JSON.parse(JSON.stringify(item)))
            })
            console.log(this.filmData)
            this.averageScore = (this.averageScore / this.count) / 5 * 100
        }).catch(err => {
            this.$notification.error({
                message: '失败',
                description: 'Failed Loading Movies'
            })
        })
    },
    data() {
        return {
            movieList: {
                listName: '',
                userId: Vue.ls.get(ACCESS_TOKEN)
            },
            newList: {
                listName: '',
            },
            list: [],
            count: 0,
            averageScore: 0,
            allTime: 0,
            filmData: [],
            spanStyle: '',
            visible: false,
            updateName: true,
            title: ''
        }
    }, methods: {
        showConfirm(val) {
            this.visible = true
            this.updateName = false
            this.title = '确定删除当前列表吗？'
        },
        handleOk(e) {
            if (this.updateName) {
                this.list.push(this.movieList)
                this.list.push(this.newList)
                updateMovieList(this.list).then(res => {
                    this.$router.push({name: 'listDetail', query: {listName: this.newList.listName}})
                    this.movieList.listName = this.newList.listName
                    this.$notification.success({
                        description: res.result
                    })
                }).catch(err => {
                    this.$notification.error({
                        message: '失败',
                        description: '操作失败'
                    })
                })
            } else {
                deleteMovieList(this.movieList).then(res => {
                    this.$router.push({name: 'listPage'})
                    this.$notification.success({
                        description: res.result
                    })
                }).catch(err => {
                    this.$notification.error({
                        message: '失败',
                        description: '操作失败'
                    })
                })
            }
            this.visible = false;
        },
        handleCancel(e) {
            this.visible = false
        },
        showModal(name) {
            this.visible = true
            this.updateName = true
            this.newList.listName = name
            this.title = '修改收藏列表名称'
        },
        toDetail(id) {
            this.$router.push({name: 'movieId', query: {id: id}})
        }
        ,
        changeMyHeart(val) {
            console.log(val)
            InsertDelMovieList({userId: this.movieList.userId, movieId: val, listName: "我的最爱"}).then(res => {
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
                console.log(this.filmData)
            }).catch(error => {
                this.$notification.error({
                    message: 'error',
                    description: "操作失败"
                })
            })
        }
    }
}
</script>

<style lang="scss" rel="stylesheet/scss">
.listDetail {
    background-color: #fff;

    h2 {
        font-family: Arial, Helvetica, sans-serif;
        color: #000;
        font-weight: bold
    }

    a {
        font-family: Arial, Helvetica, sans-serif;
        color: #01b4e4;
        font-weight: bold
    }

    a:hover {
        color: #1ed5a9;
    }

    .showImg {
        width: 200px;
        height: 330px;
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        text-align: center;
    }

    img {
        cursor: pointer;
    }
}
</style>