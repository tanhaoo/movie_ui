<template>
    <div class="top-rated">
        <a-layout>
            <a-layout-sider width="250" style="background: #fff;margin-left: 30px">
                <a-collapse v-model="activeKey" :expand-icon-position="'right'" class="shadow">
                    <a-collapse-panel key="1" header="排序" :style="customStyle">
                        <p>结果排序</p>
                        <a-select v-model="selectStatus.resultSort" default-value="hotUp" style="width: 200px;"
                                  @change="handleChange">
                            <a-select-option value="hotDrops">
                                热门降序
                            </a-select-option>
                            <a-select-option value="hotUp">
                                热门升序
                            </a-select-option>
                            <a-select-option value="rateDrops">
                                评分降序
                            </a-select-option>
                            <a-select-option value="rateUp">
                                评分升序
                            </a-select-option>
                            <a-select-option value="releaseDateDrops">
                                上映日期降序
                            </a-select-option>
                            <a-select-option value="releaseDateUp">
                                上映日期升序
                            </a-select-option>
                            <a-select-option value="nameDrops">
                                片名(A-Z)
                            </a-select-option>
                            <a-select-option value="nameUp">
                                片名(Z-A)
                            </a-select-option>
                        </a-select>
                    </a-collapse-panel>
                </a-collapse>
                <a-collapse v-model="activeKey" :expand-icon-position="'right'" class="shadow">
                    <a-collapse-panel key="2" header="筛选" :style="customStyle">
                        <p>显示
                            <a-tooltip placement="right">
                                <template slot="title">
                                    登录以过滤你观看的影片
                                </template>
                                <a-icon type="question-circle"/>
                            </a-tooltip>
                        </p>
                        <a-radio-group v-model="selectStatus.display" @change="onRadioChange">
                            <a-radio :style="radioStyle" :value="1">
                                全部
                            </a-radio>
                            <a-radio :style="radioStyle" :value="2">
                                未观看的电影
                            </a-radio>
                            <a-radio :style="radioStyle" :value="3">
                                已观看的电影
                            </a-radio>
                        </a-radio-group>
                        <hr align=left width=300 color=#d9d9d9 size=1/>
                        <p>上映日期</p>
                        <a-range-picker @change="onSelectDateChange"/>
                        <hr align=left width=300 color=#d9d9d9 size=1/>
                        <p>类型</p>
                        <a-checkbox-group @change="onCheckChange">
                            <a-row>
                                <a-col :span="8">
                                    <a-checkbox value="Animation">
                                        动画
                                    </a-checkbox>
                                </a-col>
                                <a-col :span="8">
                                    <a-checkbox value="Adventure">
                                        冒险
                                    </a-checkbox>
                                </a-col>
                                <a-col :span="8">
                                    <a-checkbox value="Comedy">
                                        喜剧
                                    </a-checkbox>
                                </a-col>
                                <a-col :span="8">
                                    <a-checkbox value="Family">
                                        家庭
                                    </a-checkbox>
                                </a-col>
                                <a-col :span="8">
                                    <a-checkbox value="Romance">
                                        爱情
                                    </a-checkbox>
                                </a-col>
                                <a-col :span="8">
                                    <a-checkbox value="Drama">
                                        戏剧
                                    </a-checkbox>
                                </a-col>
                                <a-col :span="8">
                                    <a-checkbox value="Crime">
                                        犯罪
                                    </a-checkbox>
                                </a-col>
                                <a-col :span="8">
                                    <a-checkbox value="Thriller">
                                        惊悚
                                    </a-checkbox>
                                </a-col>
                                <a-col :span="8">
                                    <a-checkbox value="Action">
                                        动作
                                    </a-checkbox>
                                </a-col>
                                <a-col :span="8">
                                    <a-checkbox value="Fantasy">
                                        奇幻
                                    </a-checkbox>
                                </a-col>
                                <a-col :span="8">
                                    <a-checkbox value="Horror">
                                        恐怖
                                    </a-checkbox>
                                </a-col>
                                <a-col :span="8">
                                    <a-checkbox value="Biography">
                                        传记
                                    </a-checkbox>
                                </a-col>
                                <a-col :span="8">
                                    <a-checkbox value="History">
                                        历史
                                    </a-checkbox>
                                </a-col>
                                <a-col :span="8">
                                    <a-checkbox value="Mystery">
                                        悬疑
                                    </a-checkbox>
                                </a-col>
                                <a-col :span="8">
                                    <a-checkbox value="Sci-Fi">
                                        科幻
                                    </a-checkbox>
                                </a-col>
                                <a-col :span="8">
                                    <a-checkbox value="War">
                                        战争
                                    </a-checkbox>
                                </a-col>
                                <a-col :span="8">
                                    <a-checkbox value="Sport">
                                        体育
                                    </a-checkbox>
                                </a-col>
                                <a-col :span="8">
                                    <a-checkbox value="Musical">
                                        音乐
                                    </a-checkbox>
                                </a-col>
                                <a-col :span="8">
                                    <a-checkbox value="Documentary">
                                        纪录
                                    </a-checkbox>
                                </a-col>
                                <a-col :span="8">
                                    <a-checkbox value="Western">
                                        西部
                                    </a-checkbox>
                                </a-col>
                                <a-col :span="8">
                                    <a-checkbox value="Short">
                                        短片
                                    </a-checkbox>
                                </a-col>
                                <a-col :span="8">
                                    <a-checkbox value="Film-Noir">
                                        黑色
                                    </a-checkbox>
                                </a-col>
                                <a-col :span="8">
                                    <a-checkbox value="News">
                                        新闻
                                    </a-checkbox>
                                </a-col>
                            </a-row>
                        </a-checkbox-group>
                        <hr align=left width=300 color=#d9d9d9 size=1/>
                        <p>用户评分</p>
                        <a-slider range :default-value="selectStatus.rating" :marks="rateMarks" :min="1" :max="5"
                                  :tip-formatter="rateFormatter" @afterChange="onRateAfterChange"/>
                        <hr align=left width=300 color=#d9d9d9 size=1/>
                        <p>最少人投票数</p>
                        <a-slider v-model="selectStatus.vote" :step="50" :marks="voteMarks" :default-value="0" :min="0"
                                  :max="peopleMaxValue"/>
                        <hr align=left width=300 color=#d9d9d9 size=1/>
                        <p>时长</p>
                        <a-slider range :default-value="selectStatus.time" :step="50" :marks="timeMarks" :min="0"
                                  :max="400"
                                  :tip-formatter="timeFormatter" @afterChange="onTimeAfterChange"/>
                        <p style="font-size: 14px;margin-left: 8px"></p>
                        <hr align=left width=300 color=#d9d9d9 size=1/>
                    </a-collapse-panel>
                </a-collapse>
                <a-button type="primary" style="width: 250px;height: 50px;border-radius: 25px">搜索</a-button>
            </a-layout-sider>
            <a-layout-content>
                <my-home style="margin-left: -15px"></my-home>
            </a-layout-content>
        </a-layout>
    </div>
</template>

<script>
import MyHome from "@/views/movie/myHome";
import {getCurrentRatePeople} from "@/api/film";

export default {
    components: {MyHome},
    mounted() {
        getCurrentRatePeople().then(res => {
            this.peopleMaxValue = (parseInt(res.result / 100) + 1) * 100
        }).catch(() => {
            this.$notification.error({
                message: '提示',
                duration: 3,
                description: '统计评分人数失败，请检查网络',
                placement: 'topLeft'
            })
        })
    },
    data() {
        return {
            rateValue: [3, 5],
            peopleMaxValue: 0,
            timeValue: [],
            text: 1,
            activeKey: ['1'],
            customStyle:
                'width:250px; background: #ffffff; border-radius: 10px;margin-bottom: 24px;border: 20;overflow: hidden;' +
                'font-size:20px;text-align: left;font-weight:bold',
            radioStyle: {
                display: 'block',
                height: '30px',
                lineHeight: '30px',
            },
            timeMarks: {
                0: '0',
                100: '100',
                200: '200',
                300: '300',
                400: '400'
            },
            rateMarks: {
                0: '0', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5'
            },
            voteMarks: {
                0: '0', 100: '100', 200: '200', 300: '300', 400: '400'
            },
            selectStatus: {
                resultSort: "hotDrops",
                //显示状态 1 全部 2未观看 3 已观看
                display: 1,
                releaseData: [],
                type: [],
                rating: [1, 5],
                vote: 0,
                time: [0, 400]
            }
            // movieType: [Animation, Adventure, Comedy, Family, Romance, Drama,
            // Crime, Thriller, Action, Fantasy, Horror, Biography, History, Mystery,
            // Sci - Fi, War, Sport, Music, Documentary, Musical, Western, Short, Film - Noir, News]

        }
    },
    methods: {
        handleClick(event) {
            // If you don't want click extra trigger collapse, you can prevent this:
            event.stopPropagation();
        }, onRateAfterChange(value) {
            this.rateValue = value
            console.log(this.rateValue)
        },
        onTimeAfterChange(value) {
            this.timeValue = value
            console.log(this.timeValue)
        }
        , rateFormatter(value) {
            return `Rated ${this.rateValue[0]} - ${this.rateValue[1]}`;
        },
        timeFormatter(value) {
            return ` 0 - ${value} minutes`;
        },
        handleChange() {
            this.$notification.error({
                message: '提示',
                duration: 3,
                description: '登录以过滤你观看的影片',
                placement: 'topLeft'
            })
        },
        onRadioChange(e) {
            // console.log('radio checked', e.target.value);
            console.log(this.selectStatus.display)
        },
        onSelectDateChange(date, dateString) {
            this.selectStatus.releaseData = dateString;
            console.log(date, dateString);
            console.log(this.selectStatus.releaseData)
        },
        onCheckChange(checkedValues) {
            this.selectStatus.type = checkedValues;
            console.log('checked = ', this.selectStatus.type);
        }
    }
}
</script>

<style lang="scss" rel="stylesheet/scss">
.top-rated {
    text-align: center;
}

.shadow {
    box-shadow: darkgrey 1px 1px 1px 1px;
    border-radius: 10px;
}

p {
    font-size: 17px;
    margin-bottom: 10px;
}
</style>
