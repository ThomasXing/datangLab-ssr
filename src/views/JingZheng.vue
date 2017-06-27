<template>
    <div id="jingzheng">
        <HeadView></HeadView>
        <div class="con">
            <h2 class='company-title'>企业级实验室</h2>
            <ul class='company-detail clearfix'>
                <li>
                    <img src="../assets/images/study.png" alt="学">
                </li>
                <li>
                    <img class='jiange' src="../assets/images/add.png" alt="+">
                </li>
                <li>
                    <img src="../assets/images/train.png" alt="练">
                </li>
                <li>
                    <img class="jiange" src="../assets/images/add.png" alt="+">
                </li>
                <li>
                    <img src="../assets/images/use.png" alt="用">
                </li>
                <li>
                    <img class='jiange' src="../assets/images/arrows.png" alt="-->">
                </li>
                <li>
                    <img src="../assets/images/assess.png" alt="评">
                </li>
            </ul>
            <ul class='company-list'>
    
                <li v-for='(val,key) in item1'  class="company-item">                  
                    <router-link :to='key'>{{val}}</router-link>
                </li>
    
            </ul>
            <ul class='company-list'>
                <li v-for='val in item2' class="company-item">{{val}}</li>
            </ul>
            <ul class='company-list mr129'>
                <li v-for='val in item3' class="company-item">{{val}}</li>
            </ul>
            <ul class='company-list'>
                <li v-for='val in item4' class="company-item">{{val}}</li>
            </ul>
        </div>
    
    </div>
</template>
<script>
import HeadView from './Head.vue'
export default {
    name: 'jingzheng',
    data() {
        return {
            item1: {'/labman/course':'实验室管理平台', '/sourceLab/source':'实验设计平台', '/theory/check':'理论检测平台','/basis/make': '基础实验平台'},
            item2: ['技能实验平台'],
            item3: ['虚拟工作站'],
            item4: ['能力评估平台']
        }
    },
    created() {
        this.$store.dispatch('SET_TITLE', '竞争力培养')
    },
    components: {
        HeadView
    }
}
</script>
<style lang ="less">
#jingzheng {
    padding-top: 50px;
    height: 700px;
    .company-title {
        height: 132px;
        text-align: center;
        line-height: 132px;
        color: rgb(4, 145, 205);
        font-family: 微软雅黑;
        font-size: 30px;
        font-weight: normal;
    }
    .company-detail {
        margin-bottom: 35px;
    }
    .company-detail li {
        float: left;
    }
    .jiange {
        margin: 78px 40px 0;
    }
    .company-item {
        width: 150px;
        height: 36px;
        border-radius: 18px;
        font-size: 16px;
        font-family: "微软雅黑";
        border: 1px solid #0491cd;
        text-align: center;
        line-height: 36px;
        a {
            color: #0491cd;
        }
    }
    .company-list {
        float: left;
        width: 176px;
        margin-right: 120px;
        & li {
            margin: 0 auto 22px;
        }
    }
    .mr129 {
        margin-right: 129px;
    }
}
</style>