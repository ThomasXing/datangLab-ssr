<template>
    <div id="jy">
        <HeadView></HeadView>
        <div>
    
            <ul class='labman-menu' id="lab-menu">
                <router-link tag='li' to='/sourceLab/source' active-class="active" class='labman-menu-item'>
                    <a href="javascript:;">资源库</a>
                </router-link>
                <router-link tag='li' to='/sourceLab/ability' active-class="active" class='labman-menu-item'>
                    <a href="javascript:;">能力评估</a>
                </router-link>
                <router-link tag='li' to='/sourceLab/jobeval' active-class="active" class='labman-menu-item'>
                    <a href="javascript:;">岗位评估</a>
                </router-link>
            </ul>
    
            <div class="labman-box">
                <transition name="slide-down">
                    <router-view></router-view>
                </transition>
            </div>
        </div>
    </div>
</template>
<script>
import HeadView from '../Head'
export default {
    data() {
        return {

        }
    },
    created() {
        this.$store.dispatch('SET_TITLE', '教研平台')
    },
    components: {
        HeadView
    }
}
</script>
<style lang='less'>
.labman {
    &-menu {
        margin-top: 50px;
        background: #383e4c;
        width: 10%; // height: 800px;
        color: #fff;
        font-size: 14px;
        font-family: "微软雅黑";
        padding-top: 36px;
        height: 100vh;
        position: fixed;
        &-item {
            display: block;
            height: 50px;
            text-align: center;
            line-height: 50px;
            color: #ffffff;
        }
        a {
            color: #ffffff;
        }
        .active {
            background: #1e222d;
            position: relative;
        }
        .active:before {
            content: '';
            width: 10px;
            height: 50px;
            background: #0491cd;
            position: absolute;
            left: 0;
        }
    }
    &-box {
        margin-top: 50px;
        float: right;
        width: 90%;
    }
}
</style>

