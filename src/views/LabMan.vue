<template>
    <div class="labman" id='jw'>
        <HeadView></HeadView>
        <div>
    
            <ul class='labman-menu' id="lab-menu">
    
                <router-link to='/labman/course' tag='li' :class="{active:courseActive}" class='labman-menu-item'>
                    <a href="javascript:;">课程管理</a>
                </router-link>
    
                <router-link to='/labman/classs' tag='li' :class="{active:classActive}" class='labman-menu-item'>
                    <a href="javascript:;">班级管理</a>
                </router-link>
    
                <router-link to='/labman/xueji' tag='li' :class="{active:xuejiActive}" class='labman-menu-item'>
                    <a href="javascript:;">学籍管理</a>
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
import HeadView from '../views/Head.vue'
import { mapGetters } from "vuex"
export default {
    name: 'jw',
    data() {
        return {

        }
    },
    created() {
        this.$store.dispatch('SET_TITLE', '实验室管理平台')
    },
    computed: {
        xuejiActive() {
            return this.$store.getters.xuejiActive;
        },
        courseActive() {
            return this.$store.getters.courseActive;
        },
        classActive() {
            return this.$store.getters.classActive;
        }
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
        float: left;
        width: 90%;
        margin-left: 10%;
        margin-top: 50px;
    }
}
</style>