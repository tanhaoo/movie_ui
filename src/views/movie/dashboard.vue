<template>
    <div class="dashboard" style="width: 100%">

        <a-layout>
            <a-layout-header style="background-color: #2d3a4b;height: 63px">
                <a-row type="flex" style="margin-top: 2px">
                    <a-col :span="12">
                        <h2 @click="toDash" style="color: #fff">MovieDB</h2>
                    </a-col>
                    <a-col :span="12">
                        <a-button style="float:right;margin-top: 15px;" type="primary" @click="register">加入我们</a-button>
                        <a-button style="float:right;margin-top: 15px;margin-right: 20px" type="primary" @click="login">
                            登录
                        </a-button>
                    </a-col>
                </a-row>
            </a-layout-header>
            <a-layout-content>
                <home></home>
            </a-layout-content>
            <!-- layout footer -->
            <a-layout-footer>
                <global-footer/>
            </a-layout-footer>
        </a-layout>
    </div>
</template>

<script>
import GlobalFooter from "@/components/GlobalFooter";
import {getMovieBySelectStatus} from "@/api/film";
import store from "@/store";
import Home from "@/views/movie/home";


export default {
    name: "dashboard",
    components: {
        GlobalFooter,
        Home
    }, methods: {
        toDash() {
            this.$router.push({name: 'index'})
        },
        login() {
            this.$router.push({name: 'login'});
        },
        register() {
            this.$router.push({name: 'register'});
        },
    }

}
</script>

<style lang="scss" rel="stylesheet/scss">

.ant-progress-text {
    color: #e4e8ec;
    font-size: 15px;
    font-weight: bold;
}


.dashboard {
    p {
        font-family: Arial, Helvetica, sans-serif;
        color: #000;
        font-size: 16px;
        font-weight: bold;
        text-align: left;
        margin-left: 5px
    }

    h2 {
        cursor: pointer;
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