<template>
    <div class="course">
        <div class="course-query">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="所属学校">
                    <el-select v-model="formInline.school" placeholder="全部学校" v-for='item in schoolList' :key='item.schoolCode' @change="get_schoolCode(item.schoolCode)">
                        <el-option :label="item.schoolName" value="青岛实训基地"></el-option>
    
                    </el-select>
                </el-form-item>
                <el-form-item label="所属专业">
                    <el-select v-model="formInline.professional" placeholder="全部专业" v-for='profession in professionList' :key='profession.professionName' @change="get_professionCode(profession.professionCode)">
                        <el-option :label="profession.professionName" value="移动互联产品研发"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="课程名称">
                    <el-input v-model="formInline.name"></el-input>
                </el-form-item>
                <el-form-item label="课程编码">
                    <el-input v-model="formInline.bianma"></el-input>
                </el-form-item>
                <el-form-item label="课程状态">
                    <el-select v-model="formInline.status" placeholder="全部状态">
                        <el-option label="有效" value="有效"></el-option>
                        <el-option label="失效" value="失效"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button class="btn" type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
    
        </div>
        <div class="course-list">
            <el-button class="btn" type="primary" @click="newCourse">新建课程</el-button>
            <el-table :data="courseList" border style="width: 100%" class='course-list' v-show='courseList.length!==0' row-key='courseList.courseId' current-row-key>
                <el-table-column fixed prop="index" label="序号" width="52" c class="course-index">
                </el-table-column>
                <el-table-column prop="courseCode" label="课程编码" width="218">
                </el-table-column>
                <el-table-column prop="courseName" label="课程名称" width="180">
                </el-table-column>
                <el-table-column prop="professionName" label="所属专业" width="180">
                </el-table-column>
                <el-table-column prop="schoolName" label="所属学校" width="180">
                </el-table-column>
                <el-table-column label="状态" width="120">
                    <template scope="scope">
                        {{scope.row.courseState | courseStatus}}
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="200">
                    <template scope="scope">
                        <el-button @click="handleClick(scope.row.courseId,scope.row.courseState)" class="my-btn"> {{scope.row.courseState |courseFilter}}</el-button>
                        <el-button @click='modiCourse(scope.row.courseId)' class="my-btn">修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog title="修改" :visible.sync="dialogVisible" size="small">
    
            <table class='baseNews'>
                <thead class="base-head">课程信息</thead>
                <tr>
                    <td class='tr'>课程名称：</td>
                    <td>
                        <el-input v-model="formInline.courseName" placeholder="支持中文,数字,英文,不超过40个字符" max-length='40'></el-input>
                    </td>
                </tr>
                <tr>
                    <td class="tr">
                        课程状态：
                    </td>
                    <td>
                        <el-select v-model="formInline.courseStatus" placeholder="全部状态">
                            <el-option label="有效" value="有效"></el-option>
                            <el-option label="失效" value="失效"></el-option>
                        </el-select>
                    </td>
                </tr>
                <tr>
                    <td class='tr'>课程说明：</td>
                    <td>
                        <el-input class='textarea-wh' v-model='formInline.courseContent' type="textarea" :rows="4" placeholder=" 填写有关课程的其他说明，200字以内，可选填">
                        </el-input>
                    </td>
                </tr>
    
            </table>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="changeCoourse">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import qs from 'qs'
import { courseStatus, courseFilter } from "../filters/index.js"
export default {
    name: 'course',
    data() {
        return {
            formInline: {
                name: '',
                bianma: '',
                school: '',
                professional: '',
                status: '',
                courseContent: '',
                courseName: '',
                courseStatus: ''
            },
            username: '',
            password: '',           
            schoolCode: '',
            professionCode: '',
            courseList: [],
            courseState: {
                "有效": 'Y',
                "失效": 'N'
            },
            dialogVisible: false,
            courseId: ""
        }
    },
    beforeMount(){
        this.username = sessionStorage.getItem("keyId");
        this.password = sessionStorage.getItem("keyToken")
    },
    mounted() {
        this.getAllCourse()
        this.$store.dispatch('SHOW_ACTIVECLASS', "courseActive")
        this.$store.dispatch('GET_SCHOOLLIST',{keyId:this.username,keyToken:this.password})
        this.$store.dispatch('GET_PROFESSIONLIST',{keyId:this.username,keyToken:this.password})
    },
    computed: {
        schoolList(){
            return this.$store.getters.schoolList
        },
         professionList(){
            return this.$store.getters.professionList
        }
    },
    filters: {
        courseStatus,
        courseFilter
    },

    methods: {
        // 按条件查询课程
        onSubmit() {
            if (this.formInline.status === "") {
                this.courseState[this.formInline.status] = "";
            }
            this.$ajax.get("/api/369research/yzh/research/inter/getCourseByCondition?userid=" + sessionStorage.getItem("keyId") + "&accesstoken=" + sessionStorage.getItem("keyToken") + "&schoolCode=" + this.schoolCode + "&professionCode=" + this.professionCode + "&courseName=" + encodeURIComponent(encodeURIComponent(this.formInline.name)) + "&courseState=" + this.courseState[this.formInline.status] + "&courseCode=" + this.formInline.bianma
            ).then(res => {
                this.courseList = res.data.courseList
            })
        },
        handleClick(courseId, courseState) {
            if (courseState === "N") {
                courseState = "Y"
            } else {
                courseState = "N"
            }
            this.$ajax.post("/api/369research/yzh/research/inter/updateCourse", qs.stringify({
                userid: this.username,
                accesstoken: this.password,
                courseId: courseId,
                courseState: courseState,

            })).then(res => {
                if (res.data.updateCourseFlag === "success") {
                    this.dialogVisible = false;
                    this.onSubmit()
                }

            })

        },
        modiCourse(courseId) {
            this.dialogVisible = true;
            this.courseId = courseId;

        },
        changeCoourse() {
            if (this.formInline.courseStatus === "") {
                this.courseState[this.formInline.courseStatus] = "";
            }
            if (this.formInline.courseName === "" && this.formInline.courseStatus === "" && this.formInline.courseContent === "") {
                this.dialogVisible = false;
            } else {
                this.$ajax.post("/api/369research/yzh/research/inter/updateCourse", qs.stringify({
                    userid: this.username,
                    accesstoken: this.password,
                    courseId: this.courseId,
                    courseName: this.formInline.courseName,
                    courseState: this.courseState[this.formInline.courseStatus],
                    courseContent: this.formInline.courseContent

                })).then(res => {
                    if (res.data.updateCourseFlag === "success") {
                        this.dialogVisible = false;
                        this.getAllCourse()
                    }

                })
            }


        },
        //获取所有课程
        getAllCourse() {
            this.$ajax.get("/api/369research/yzh/research/inter/getAllCourse?userid=" + this.username + "&accesstoken=" + this.password).then(res => {
                this.courseList = res.data.courseList;
            })
        },
        get_schoolCode(a) {
            this.schoolCode = a;
        },
        get_professionCode(b) {
            this.professionCode = b;
        },
        newCourse() {
            this.$router.push({ path: 'newCourse' })
        }


    }
}
</script>
<style lang="less" scoped>
.course {
    margin-left: 20px;
    width: 88%;
    &-query {
        margin-top: 22px;
        border-bottom: 1px solid #e8e8e8;
        input {
            width: 172px;
            height: 32px;
        }
        .demo-form-inline {
            color: rgb(51, 51, 51);
        }
        .el-form-item__label {
            border-radius: none;
            color: rgb(51, 51, 51);
            font-size: 16px;
        }
    }
    .course-list {
        margin-top: 20px;
    }
    .el-table th>div {
        padding: 0;
    }
}

.baseNews {
    font-family: '微软雅黑';
    font-weight: 400;
    font-style: normal;
    font-size: 16px;
    line-height: 28px;
    color: #111;
    .base-head {
        font-size: 18px;
        color: #44aee0;
    }
    tr {
        height: 61px;
        .el-select {
            width: 247px;
            height: 32px;
        }
        .el-input {
            width: 247px;
            height: 32px;
        }
    }

    .tr {
        text-align: right;
        width: 160px;
    }
}
</style>