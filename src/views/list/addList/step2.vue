<template>
    <div>
        <h2>添加电影</h2>
        <a-select
            size="large"
            show-search
            :value="value"
            placeholder="输入电影、剧集和人物关键字"
            style="width: 800px"
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

        <a-list
            v-if="showData.length!=0"
            item-layout="horizontal"
            :data-source="showData"
        >
            <a-list-item slot="renderItem" slot-scope="item, index">
                <a slot="actions" @click="removeData(item)">
                    <a-icon style="font-size: 20px" type="delete"/>
                </a>
                <a-list-item-meta
                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                >
                    <a style="font-size: 23px" slot="title">{{ item.movieName }}</a>
                    <a-avatar
                        style="width: 80px;height: 120px"
                        slot="avatar"
                        :src="item.url"
                        shape="square"
                    />
                </a-list-item-meta>
            </a-list-item>
        </a-list>
    </div>
</template>

<script>
import {getMovieByKeyWord} from "@/api/film";

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

const QS = require('qs');
export default {
    name: "step2",
    data() {
        return {
            filmData: [],
            value: '',
            isLoading: false,
            movieId: [],
            showData: [],
            repeat: false
        }
    },
    methods: {
        handleSearch(val) {
            if (val != '') {
                this.isLoading = true
                fetch(val, data => {
                    console.log(data)
                    this.filmData = data
                    this.isLoading = false
                })
            }
        }, handleChange(val) {
            console.log('change ' + val)
            this.value = ''
            this.filmData.map(item => {
                this.showData.map((item2, index) => {
                    if (item.id == item2.id)
                        this.repeat = true
                })
                if (item.id === val) {
                    this.value = item.movieName
                    if (!this.repeat) {
                        this.showData.push(item)
                        this.movieId.push(item.id)
                    }
                }
                this.repeat = false
            })
        },
        getMovieId() {
            return this.movieId
        },
        removeData(val) {
            console.log(val.id)
            this.showData.map((item, index) => {
                if (item.id == val.id) {
                    this.showData.splice(index, 1)
                    this.movieId.splice(index, 1)
                }
            })
        }
    }
}
</script>

<style lang="scss" rel="stylesheet/scss">

</style>