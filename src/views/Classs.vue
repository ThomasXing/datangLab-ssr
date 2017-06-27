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
                <el-form-item label="班级名称">
                    <el-input v-model="formInline.name"></el-input>
                </el-form-item>
                <el-form-item label="班级编码">
                    <el-input v-model="formInline.bianma"></el-input>
                </el-form-item>
                <el-form-item label="班级状态">
                    <el-select v-model="formInline.status" placeholder="全部状态">
                        <el-option :label="key" :value="key" v-for="(val,key) in classStatus" :key="val"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="架构师">
                    <el-select v-model="formInline.jiagoushi" placeholder="全部架构师" v-for="teacher in teacherList" :key="teacher.pxTeacherId" @change="get_teacherOne(teacher.pxTeacherId)">
                        <el-option :label="teacher.pxTeacherName" :value="teacher.pxTeacherName"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="项目经理">
                    <el-select v-model="formInline.PM" placeholder="全部项目经理" v-for="teacher in pmList" :key="teacher.pxTeacherId" @change="get_teacherTwo(teacher.pxTeacherId)">
                        <el-option :label="teacher.pxTeacherName" :value="teacher.pxTeacherName"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button class="btn" type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
    
        </div>
        <div class="class-list">
            <el-button class="btn" type="primary" @click="newClass">新建班级</el-button>
            <el-table :data="classList" border style="width: 100%" class='class-list' v-show='classList.length!==0'>
                <el-table-column fixed type="index" label="序号" width="80">
                </el-table-column>
                <el-table-column prop="classCode" label="班级编码" width="140">
                </el-table-column>
                <el-table-column prop="className" label="班级名称" width="180">
                </el-table-column>
                <el-table-column prop="professionName" label="所属专业" width="180">
                </el-table-column>
                <el-table-column prop="schoolName" label="所属学校" width="180">
                </el-table-column>
                <el-table-column prop="teacherOne" label="架构师" width="140">
                </el-table-column>
                <el-table-column prop="teacherTwo" label="项目经理" width="140">
                </el-table-column>
                <el-table-column prop="classStuCount" label="班级人数" width="100">
                </el-table-column>
                <el-table-column label="状态" width="100">
                    <template scope="scope">
                        {{scope.row.classState | classStatus}}
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="200">
                    <template scope="scope">
                        <el-button @click="handleClick(scope.row.classId,scope.row.classState,scope.row.teacherOne)" class="my-btn"> {{scope.row.classState |classFilter}}</el-button>
                        <el-button @click='modiClass(scope.row.classId)' class="my-btn">修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
    
        </div>
    
        <el-dialog title="修改" :visible.sync="dialogVisible" size="small">
    
            <table class='baseNews' :model="modify">
                <thead class="base-head">课程信息</thead>
                <tr>
                    <td class='tr'>架构师：</td>
                    <td>
                        <el-select v-model="modify.jiagoushi" placeholder="全部架构师" v-for="teacher in teacherList" :key="teacher.pxTeacherId" @change="get_teacherOne(teacher.pxTeacherId)">
                            <el-option :label="teacher.pxTeacherName" :value="teacher.pxTeacherName"></el-option>
                        </el-select>
                    </td>
                </tr>
                <tr>
                    <td class="tr">
                        项目经理：
                    </td>
                    <td>
                        <el-select v-model="modify.PM" placeholder="全部项目经理" v-for="teacher in pmList" :key="teacher.pxTeacherId" @change="get_teacherTwo(teacher.pxTeacherId)">
                            <el-option :label="teacher.pxTeacherName" :value="teacher.pxTeacherName"></el-option>
                        </el-select>
                    </td>
                </tr>
                <tr>
                    <td class='tr'>班级状态：</td>
                    <td>
                        <el-select v-model="modify.status" placeholder="全部状态">
                            <el-option :label="key" :value="key" v-for="(val,key) in classStatus" :key="val"></el-option>
                        </el-select>
                    </td>
                </tr>
                <tr>
                    <td class='tr'>班级名称：</td>
                    <td>
                        <el-input v-model="modify.name"></el-input>
                    </td>
                </tr>
                <tr>
                    <td class='tr'>选择课程：</td>
                    <td>
                        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                        <el-checkbox v-model="Recheck" @change="handleCheckNotChange">反选</el-checkbox>
                        <div style="margin: 15px 0;"></div>
                        <el-checkbox-group @change="handleCheckedCitiesChange" fill="#0491cd" v-model="checkedCourse">
                            <el-checkbox v-for="course in courseList" :label="course.courseId" :key="course">{{course.courseName}}</el-checkbox>
                        </el-checkbox-group>
                    </td>
                </tr>
            </table>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="changeClass">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { classStatus, classFilter } from '../filters'
import qs from "qs"
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
                jiagoushi: '',
                PM: '',
            },
            modify: {
                jiagoushi: '',
                PM: '',
                status: '',
                name: '',
                courseIdList: []
            },
            username: '',
            password: '',
            schoolCode: '',
            professionCode: '',
            teacherList: '',
            teacherCode: '',
            pmList: '',
            pmCode: '',
            classStatus: {
                '准备开课': "W",
                '开课': "S",
                '结课': "E",
                '无效': "N"
            },
            classList: [],
            classId: '',
            dialogVisible: false,
            checkAll: true,
            Recheck: false,
            checkedCourse: [],
            isIndeterminate: true,
            courseList: []
        }
    },
    beforeMount() {
        this.username =  sessionStorage.getItem("keyId")
        this.password = sessionStorage.getItem("keyToken")
    },
    mounted() {

        this.getTeacherList()
        this.getpmList()
        this.onSubmit()
        this.$store.dispatch('SHOW_ACTIVECLASS', "classActive")
        this.$store.dispatch('GET_SCHOOLLIST',{keyId:this.username,keyToken:this.password})
        this.$store.dispatch('GET_PROFESSIONLIST',{keyId:this.username,keyToken:this.password})
    },
    computed: {
        schoolList() {
            return this.$store.getters.schoolList;
        },
        professionList() {
            return this.$store.getters.professionList;
        }
    },
    filters: {
        classStatus,
        classFilter
    },
    methods: {
        //获取所有班级
        getAllClass() {
            this.$ajax.get("/api/369research/yzh/research/inter/getAllClass?userid=" + this.username + "&accesstoken=" + this.password).then(res => {
                this.classList = res.data.classList
            })
        },
        //查询教师
        getTeacherList() {
            this.$ajax.get("/api/369research/yzh/research/inter/getTeacherList?userid=" + this.username + "&accesstoken=" + this.password + "&roleName=teacherJGRole").then(res => {
                this.teacherList = res.data.teacherList;
            })
        },
        //查询项目经理
        getpmList() {
            this.$ajax.get("/api/369research/yzh/research/inter/getTeacherList?userid=" + this.username + "&accesstoken=" + this.password + "&roleName=teacherXMRole").then(res => {
                this.pmList = res.data.teacherList;
            })
        },
        // 按条件查询班级
        onSubmit() {
            if (this.formInline.status === "") {
                this.classStatus[this.formInline.status] = "";
            }
            this.$ajax.get("/api/369research/yzh/research/inter/getClassByCondition?userid=" +  this.username + "&accesstoken=" + this.password  + "&schoolCode=" + this.schoolCode + "&professionCode=" + this.professionCode + "&className=" + encodeURIComponent(encodeURIComponent(this.formInline.name)) + "&classState=" + this.classStatus[this.formInline.status] + "&classCode=" + this.formInline.bianma + "&teacherOne=" + this.teacherCode + "&teacherTwo=" + this.pmCode).then(res => {
                this.classList = res.data.classList
            }).catch(err => console.log(err))
        },
        //获取所有课程
        getAllCourse() {
            this.$ajax.get("/api/369research/yzh/research/inter/getAllCourse?userid=" +  this.username + "&accesstoken=" + this.password ).then(res => {
                this.courseList = res.data.courseList
            })
        },
        get_schoolCode(a) {
            this.schoolCode = a;
        },
        get_professionCode(b) {
            this.professionCode = b;
        },
        get_teacherOne(c) {
            this.teacherCode = c;
        },
        get_teacherTwo(d) {
            this.pmCode = d;
        },
        newClass() {
            this.$router.push({ path: 'newclass' })
        },
        modiClass(classId) {
            this.dialogVisible = true;
            this.classId = classId;
            this.getAllCourse()
        },
        handleClick(classId, classState, teacherOne) {
            if (classState === "N") {
                classState = "S"
            } else {
                classState = "N"
            }
            this.$ajax.post("/api/369research/yzh/research/inter/updateClass", qs.stringify({
                userid: this.username,
                accesstoken: this.password,
                classId: classId,
                classState: classState,

            })).then(res => {
                if (res.data.updateClassFlag === "success") {
                    this.dialogVisible = false;
                    this.onSubmit()
                }

            })
        },
        changeClass() {
            // if (this.formInline.ClassStatus === "") {
            //     this.classStatus[this.formInline.ClassStatus] = "";
            // }
            // if (this.formInline.courseName === "" && this.formInline.courseStatus === "" && this.formInline.courseContent === "") {
            //     this.dialogVisible = false;
            // } else {
            this.$ajax.post("/api/369research/yzh/research/inter/updateClass", qs.stringify({
                userid: this.username,
                accesstoken: this.password,
                classId: this.classId,
                teacherOne: this.teacherCode,
                teacherTwo: this.pmCode,
                classState: this.classStatus[this.modify.status],
                className: this.modify.name,
                courseIdListStr: JSON.stringify(this.checkedCourse)

            })).then(res => {

                if (res.data.updateClassFlag === "success") {
                    this.dialogVisible = false;
                    this.onSubmit()
                }

            })
            // }
        },
        handleCheckAllChange(event) {
            let courseArr = []
            this.courseList.forEach(function (val) {
                courseArr.push(val.courseId)
            })
            this.checkedCourse = event.target.checked ? courseArr : [];
            this.isIndeterminate = false;
        },
        handleCheckNotChange(event) {
            let courseArr = []
            let that = this;
            this.courseList.forEach(function (val) {
                if (that.checkedCourse.indexOf(val.courseId) === -1) {
                    courseArr.push(val.courseId)
                }
            })
            this.checkedCourse = event.target.checked ? courseArr : [];
            this.isIndeterminate = false;
        },
        handleCheckedCitiesChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.courseList.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.courseList.length;
        }
    }
}
</script>
<style lang="less" scoped>
.course {
    margin-left: 20px;
    width: 88%;
    .course-query {
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
    .class-list {
        margin-top: 20px;
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