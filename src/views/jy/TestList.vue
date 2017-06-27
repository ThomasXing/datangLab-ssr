<template>
    <div id="testList">
        <div class="source-con">
            <table cellspacing="10px">
                <tr class="source-con-row">
                    <td class="source-con-row-t">任务名称：</td>
                    <td>{{item.taskname}}</td>
                </tr>
                <tr class="source-con-row">
                    <td>任务说明：</td>
                    <td>{{item.taskintro}}</td>
    
                </tr>
                <tr class="source-con-row">
                    <td>测评内容：</td>
                    <td>{{item.taskcontent}}</td>
                </tr>
                <tr class="source-con-row">
                    <td>测评标准：</td>
                    <td>{{item.taskstandard}}</td>
                </tr>
            </table>
            <div class="source-con-file clearfix" v-for="list in item.taskFileList">
                <div class="item">
                    <a :href="list.fileurl" class="source-item " :download="list.download">
                        <div class="source-img">
                            <img :src="list.filethumbnail" :alt="list.fileattachname" width="220" height="140">
                        </div>
                        <div class="mask" :style="`background:#000 url(${list.playIcon})no-repeat 50% 50%`"></div>
                        <h3>{{list.filename}}</h3>
                    </a>
                </div>
            </div>
            <div class="clearfix"> </div>
            <table cellspacing="10px">
                <tr class="source-con-row">
                    <td style="padding-left:11px">测评时间：</td>
                    <td>{{test.startTime}}</td>
                    <span>至</span>
                    <td>{{test.endTime}}</td>
                </tr>
            </table>
            <div class="source-list">
                <table cellspacing="10px">
                    <tr class="source-con-row">
                        <td class="source-con-row-t">测评结果：</td>
                    </tr>
                </table>
                <el-tabs v-model="activeName" @tab-click="getClassTest">
                    <el-tab-pane :label="item" :name="$key" v-for="(item,$key,index) in checkedClassObj" :key="$key"></el-tab-pane>
                </el-tabs>
                <el-table :data="stuTestList" border style="width: 100%" class='course-list' row-key='stuTestList.stuId' current-row-key v-show="stuTestList.length!==0">
                    <el-table-column fixed prop="index" label="序号" width="52" class="course-index">
                    </el-table-column>
                    <el-table-column prop="stuName" label="姓名" width="152" class="course-index">
                    </el-table-column>
                    <el-table-column label="提交状态" width="152" class="course-index">
                        <template scope="scope">
                            {{scope.row.testFlag}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="creDate" label="测评结果" width="152" class="course-index">
                    </el-table-column>
                    <el-table-column prop="creDate" label="提交时间" width="152" class="course-index">
                    </el-table-column>
                    <el-table-column fixed="right" label="操作" width="240">
                        <template scope="scope">
                            <el-button class="my-btn" @click="checkStuTestDetail(scope.row.stuId)">测评详情</el-button>
                            <el-button class="my-btn">查看项目</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>
<script>
const jy_url = "http://www.369college.com/369education";

export default {
    data() {
        return {
            taskList: {},
            item: {},
            test: {
                name: '',
                status: '',
                startTime: '',
                endTime: ''
            },
            activeName: '',
            checkedClassObj: {},
            stuTestList: []
        }
    },
    created() {
        let testQD = JSON.parse(this.$route.query.checkTest);
        this.item['taskFileList'] = testQD['taskFileList'];
        this.item['taskcontent'] = testQD['testcontent'];
        this.item['taskintro'] = testQD['testintro'];
        this.item['taskname'] = testQD['testname'];
        this.item['taskid'] = testQD['taskid'];
        this.item['taskstandard'] = testQD['teststandard'];
        this.classList = testQD['classList'];
        this.classList.forEach((elem) => {
            elem['pxClassId'] = elem['classid']
            elem['pxClassName'] = elem['classname'];
            if (elem['checkflag'] === true) {
                this.$set(this.checkedClassObj, elem['pxClassId'], elem['pxClassName'])
            }
        })
        this.activeName = Object.keys(this.checkedClassObj)[0]
        this.test.startTime = testQD['startdate']
        this.test.endTime = testQD['enddate']
        this.testid = testQD['testid']
        this.item.taskFileList.forEach(elem => {
            if (elem.fileurl.slice(-3) === "ogg" || elem.fileurl.slice(-3) === "pdf") {
                this.$set(elem, 'playIcon', "http://www.369college.com/yzhcmnet/yzh_user1/static/img/play.png")
                this.$set(elem, 'download', false)
            } else {
                this.$set(elem, 'playIcon', "http://www.369college.com/yzhcmnet/yzh_user1/static/img/download.png")
                this.$set(elem, 'download', elem.filename)
            }
            elem.fileurl = "http://115.182.107.198/" + elem.fileurl.replace(/http:\/\/115.182.107.198\//g, "");
            elem.filethumbnail = "http://115.182.107.198/" + elem.filethumbnail.replace(/http:\/\/115.182.107.198\//g, "");
        })
        this.getClassTest()
    },
    methods: {
        getClassTest() {
            this.$http.get(jy_url + "/yzh/education/inter/getAllStuTestByCondition?userid=" + sessionStorage.getItem("keyId") + "&accesstoken=" + sessionStorage.getItem("keyToken") + "&testId=" + this.testid + "&classId=" + this.activeName).then(res => {
                this.stuTestList = res.data.stuTestList
                this.stuTestList.forEach((elem, index) => {
                    if (elem.testFlag === "N") {
                        elem.testFlag = "未提交";
                        elem.creDate = "————";
                    } else if (elem.testFlag === "Y") {
                        elem.testFlag = "已提交";
                    }
                    this.$set(elem, 'index', (index + 1))
                })
            })
        },
        checkStuTestDetail(stuId) {
            this.$http.get(jy_url + "/yzh/education/inter/getStuTestDetail?userid=" + sessionStorage.getItem("keyId") + "&accesstoken=" + sessionStorage.getItem("keyToken") + "&testId=" + this.testid + "&stuId=" + stuId).then(res => {
                console.log(res)

            })
        }
    }
}
</script>
<style lang="less" scoped>
.source-con {
    width: 80%;
    float: left;
    padding: 15px;
    position: relative;
    &-row {
        font-size: 16px;
        color: #111111;
        min-height: 70px;
        td:first-child {
            min-width: 80px;
            text-align: right;
        }
        &-t {
            padding-left: 6px;
            border-left: 5px solid #0491cd;
        }
    }
    &-file {
        float: left;
        .item {
            margin: 20px;
            float: left;
            text-align: center;
            h3 {
                line-height: 50px;
                color: #4d4d4d;
            }
        }
        .source-item {
            display: block;
            position: relative;
        }
        .source-item:hover .mask {
            transition: opacity .2s;
            opacity: .3;
            filter: alpha(opacity=30);
        }
        .source-item .source-img {
            overflow: hidden;
            width: 220px;
            height: 140px;
        }
        .source-item img {
            transition: transform .4s;
        }
        .source-item:hover img {
            transform: scale(1.2);
        }

        .mask {
            position: absolute;
            top: 0;
            left: 0;
            width: 220px;
            height: 140px;
            opacity: 0;
            filter: alpha(opacity=0);
        }
    }
}
</style>


