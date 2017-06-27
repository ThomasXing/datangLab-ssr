<template>
    <div id="addTest">
        <div class="source-head ">
            <div class="source-head-incre">
                <el-button class="btn" type="primary" @click="saveTest('B')" v-show="!update">保存并发布</el-button>
                <el-button class="btn" type="primary" @click="updateTest('B')" v-show="update">保存并发布</el-button>
                <el-button class="btn" type="primary" @click="saveTest('A')" v-show="!update">保存</el-button>
                <el-button class="btn" type="primary" @click="updateTest('A')" v-show="update">保存</el-button>
                <el-button class="btn" type="primary" @click="$router.push({path:'ability'})">取消</el-button>
            </div>
        </div>
        <div class="source-head">
            <el-form :inline="true" class="source-choice demo-form-inline">
                <el-form-item label="测评任务：">
                    <el-button class="btn" type="primary" @click="choiceSourceTest">从资源库中选择</el-button>
                </el-form-item>
            </el-form>
        </div>
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
        </div>
        <div class="source-con clearfix">
            <table cellspacing="10px">
                <tr class="source-con-row">
                    <td class="source-con-row-f">测评时间：</td>
                    <td>
                        <el-date-picker v-model="test.startTime" type="datetime" placeholder="选择日期" @change="creDate(test.startTime)">
                        </el-date-picker>
                        <label class="el-form-item__label " style="float:none;">至</label>
                        <el-date-picker v-model="test.endTime" type="datetime" placeholder="选择日期" @change="endDate(test.endTime)">
                        </el-date-picker>
                    </td>
                </tr>
                <tr class="source-con-row">
                    <td>测评班级：</td>
                    <td>
                        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                        <el-checkbox v-model="Recheck" @change="handleCheckNotChange">反选</el-checkbox>
                        <div style="margin: 15px 0;"></div>
                        <el-checkbox-group @change="handleCheckedCitiesChange" fill="#0491cd" v-model="checkedClass">
                            <el-checkbox v-for="myclass in classList" :label="myclass.pxClassName" :key="myclass.pxClassId" @change="get_checkedClassId($event,myclass.pxClassId)">{{myclass.pxClassName}}</el-checkbox>
                        </el-checkbox-group>
                    </td>
                </tr>
    
            </table>
    
        </div>
    
    </div>
</template>
<script>
const jy_url = "http://www.369college.com/369education";
import HeadView from '../Head'
import { mapGetters } from 'vuex'
import qs from "qs"
export default {
    data() {
        return {
            test: {
                name: '',
                status: '',
                startTime: '',
                endTime: ''
            },
            checkAll: true,
            Recheck: false,
            checkedClass: [],
            checkedClassId: [],
            isIndeterminate: true,
            item: {},
            classList: [],
            update: false,
            testid: ''
        }
    },
    created() {
        if (this.$route.query.update === 'true') {
            this.update = true;
            let testQD = JSON.parse(this.$route.query.updateTest);
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
                    this.checkedClass.push(elem['pxClassName'])
                    this.checkedClassId.push(elem['pxClassId'])
                }
            })
            this.test.startTime = testQD['startdate']
            this.test.endTime = testQD['enddate']
            this.testid = testQD['testid']
        } else {
            this.item = JSON.parse(this.$route.query.taskinfo)
            this.classList = JSON.parse(this.$route.query.classList)
        }
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
    },
    // computed: {
    //      ...mapGetters(['classList']),

    // },
    components: {
        HeadView
    },
    methods: {
        creDate(time) {
            if (time) {
                let d = new Date(time);
                let m = (d.getMonth() + 1) < 10 ? "0" + (d.getMonth() + 1) : (d.getMonth() + 1);
                let dd = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
                let h = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
                let mm = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
                let s = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds();
                this.test.startTime = d.getFullYear() + '-' + m + '-' + dd + " " + h + ':' + mm + ':' + s;
            }
        },
        endDate(time) {
            if (time) {
                let d = new Date(time);
                let m = (d.getMonth() + 1) < 10 ? "0" + (d.getMonth() + 1) : (d.getMonth() + 1);
                let dd = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
                let h = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
                let mm = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
                let s = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds();
                this.test.endTime = d.getFullYear() + '-' + m + '-' + dd + " " + h + ':' + mm + ':' + s;
            }
        },
        saveTest(testState) {
            this.$http.post("api/369education/yzh/education/inter/addTest", qs.stringify({
                userid: sessionStorage.getItem("keyId"),
                accesstoken: sessionStorage.getItem("keyToken"),
                courseId: this.$route.query.courseid,
                taskId: this.item.taskid,
                testName: this.item.taskname,
                testContent: this.item.taskcontent,
                testStartDate: this.test.startTime,
                testEndDate: this.test.endTime,
                classIdListStr: JSON.stringify(this.checkedClassId),
                testState: testState
            })).then(res => {
                if (res.data.addTestFlag === "success") {
                    this.$router.push({ path: 'ability' })
                } else {
                    this.$alert("添加错误，请重新添加", '提示信息', {
                        confirmButtonText: '确定',
                    });
                }
            })
        },
        updateTest(teststate) {
            let params = {
                userid: sessionStorage.getItem("keyId"),
                accesstoken: sessionStorage.getItem("keyToken"),
                testid: this.testid,
                taskid: this.item.taskid,
                testname: this.item.taskname,
                testcontent: this.item.taskcontent,
                startdate: this.test.startTime,
                enddate: this.test.endTime,
                classIdListStr: JSON.stringify(this.checkedClassId),
                teststate: teststate
            }
            this.$http.post("api/369education/yzh/education/inter/updateTest", qs.stringify(params)).then(res => {
                if (res.data.updateTestFlag === "success") {
                    this.$router.push({ path: 'ability' })
                } else {
                    this.$alert("添加错误，请重新添加", '提示信息', {
                        confirmButtonText: '确定',
                    });
                }
            })
        },
        choiceSourceTest() {
            if (this.$route.query.update === 'true') {
                this.$router.push({ path: 'source', query: { source: 'test', update: 'true', updateTest: this.$route.query.updateTest } })
            } else {
                
                this.$router.push({ path: 'source', query: { source: 'test', newTest: 'true', classList: this.$route.query.classList, courseid: this.$route.query.courseid } })
            }
        },
        handleCheckAllChange(event) {
            let classArr = [];
            let classIdList = []
            this.classList.forEach(val => {
                classArr.push(val.pxClassName);
                classIdList.push(val.pxClassId)
            })
            this.checkedClass = event.target.checked ? classArr : [];
            this.checkedClassId = event.target.checked ? classIdList : [];
            this.isIndeterminate = false;

        },
        handleCheckNotChange(event) {
            let classArr = [];
            let classIdList = []
            this.classList.forEach(function (val) {
                if (this.checkedClassId.indexOf(val.pxClassId) === -1) {
                    classArr.push(val.pxClassName)
                    classIdList.push(val.pxClassId)
                }
            }, this)
            this.checkedClass = event.target.checked ? classArr : [];
            this.checkedClassId = event.target.checked ? classIdList : [];
            this.isIndeterminate = false;
        },
        handleCheckedCitiesChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.classList.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.classList.length;
        },
        get_checkedClassId(event, classid) {
            if (event.target.checked) {
                this.checkedClassId.push(classid)
            } else {
                this.checkedClassId.splice(classid, 1);
            }

        }

    }
}
</script>
<style lang="less" scoped>
#addTest {
    .source-head {
        height: 74px;
        float: left;
        width: 100%;
        border-bottom: 1px solid #e8e8e8;
        &-incre {
            width: 40%;
            padding: 17px 0 17px 14px;
            border-bottom: 1px solid #e8e8e8;
        }
        .source-choice {
            .el-form-item {
                margin: 17px 0 0 14px;
            }
        }
    }
    .source-con {
        width: 80%;
        float: left;
        padding: 15px;
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
            &-f {
                padding-left: 6px;
                border-left: 5px solid #fff;
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
}
</style>

