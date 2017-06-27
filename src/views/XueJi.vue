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
                <br>
                <el-form-item label="学员学号">
                    <el-input v-model="formInline.id"></el-input>
                </el-form-item>
                <el-form-item label="学员姓名">
                    <el-input v-model="formInline.firstname"></el-input>
                </el-form-item>
                <br>
                <el-form-item label="学籍状态">
                    <el-radio-group v-model="formInline.xujiStatus">
                        <el-radio :label="key" v-for='(val,key) in xujiStatus' :key="val">{{key}}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <br>
                <el-form-item label="学籍记录">
                    <el-radio-group v-model="formInline.xujiRecord">
                        <el-radio :label="key" v-for="(val,key) in xujiRecord" :key="val">{{key}}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <br>
                <el-form-item label='入学日期' class="datePicker">
                    <el-date-picker v-model="formInline.startTime" type="date" placeholder="选择日期" @change="creDate(formInline.startTime)">
                    </el-date-picker>
                    <label class="el-form-item__label">至</label>
                    <el-date-picker v-model="formInline.endTime" type="date" placeholder="选择日期" @change="endDate(formInline.endTime)">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button class="btn" type="primary" @click="onSubmit">查询</el-button>
                </el-form-item>
            </el-form>
    
        </div>
        <div class="xueji-list">
            <el-button class="btn" type="primary" @click="addXuJi">新建学籍</el-button>
            <el-table :data="stuManagementList" border style="width: 100%" class='xueji-list' v-show='stuManagementList.length!==0'>
                <el-table-column fixed type='index' label="序号" width="80">
                </el-table-column>
                <el-table-column prop="stuCode" label="学员学号" width="140">
                </el-table-column>
                <el-table-column prop="stuTrueName" label="学员姓名" width="180">
                </el-table-column>
                <el-table-column label="性别" width="180">
                    <template scope="scope">{{scope.row.stuSex | sex}}</template>
                </el-table-column>
                <el-table-column prop="className" label="班级名称" width="180">
                </el-table-column>
                <el-table-column prop="professionName" label="专业名称" width="180">
                </el-table-column>
                <el-table-column prop="schoolName" label="学校名称" width="180">
                </el-table-column>
                <el-table-column prop="stuPhone" label="联系电话" width="120">
                </el-table-column>
                <el-table-column label="学籍状态" width="120">
                    <template scope="scope">{{scope.row.managementState | managementState}}</template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" width="200">
                    <template scope="scope">
                        <el-button @click="handleClick(scope.row)" class="my-btn"> 重置密码</el-button>
                        <el-button @click='modiXuJi(scope.row.stuId)' class="my-btn">修改</el-button>
                    </template>
                </el-table-column>
            </el-table>
    
        </div>
    </div>
</template>
<script>
import { sex, managementState } from "../filters/index"
import qs from "qs"
export default {
    data() {
        return {
            formInline: {
                name: '',
                bianma: '',
                school: '',
                professional: '',
                id: '',
                firstname: '',
                xujiStatus: '',
                xujiRecord: '',
                startTime: '',
                endTime: ''
            },
            xujiStatus: {
                "在读": "A",
                "旁听": "B",
                "休学": "C",
                "退学": "D",
                "已毕业": "E",
                "已结业": "F"
            },
            xujiRecord: {
                "曾休学": 4,
                "曾留级": 6,
                "曾重读": 9
            },
            schoolCode: '',
            professionCode: '',
            stuManagementList: []
        }
    },
    beforeMount() {
        this.username =sessionStorage.getItem("keyId")
        this.password =sessionStorage.getItem("keyToken")
    },
    mounted() {
        this.getAllStuManagement()
        this.$store.dispatch('SHOW_ACTIVECLASS', 'xuejiActive')
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
    methods: {
        //获取所有学籍
        getAllStuManagement() {
            this.$ajax.get("/api/369research/yzh/research/inter/getAllStuManagement?userid=" + this.username + "&accesstoken=" + this.password ).then(res => {
                this.stuManagementList = res.data.stuManagementList
            })
        },
        get_schoolCode(a) {
            this.schoolCode = a;
        },
        get_professionCode(b) {
            this.professionCode = b;
        },
        creDate(time) {
            if (time) {
                let d = new Date(time);
                this.formInline.startTime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
            }
        },
        endDate(time) {
            if (time) {
                let d = new Date(time);
                this.formInline.endTime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
            }
        },
        handleClick(list) {
            this.$ajax.get("/api/369research/yzh/research/inter/getStuManagementByStuId?userid=" + this.username + "&accesstoken=" + this.password  + "&stuId=" + list.stuId).then(res => {
                let pass = res.data.stuManagementQB.stuIdCard.slice(-6);
                this.$confirm('确定要为选中的学生，重置密码吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'info'
                }).then(() => {
                    this.$ajax.post("/api/369research/yzh/research/inter/updateStuPassword", qs.stringify({
                        userid: this.username,
                        accesstoken: this.password ,
                        stuId: list.stuId
                    })).then(res => {
                        if (res.data.updateStuManagementFlag === "success") {
                            // this.$alert("密码重置成功!\n重置后的新密码：学生的身份证后六位", '提示', {
                            //     confirmButtonText: '确定',
                            // });
                            this.$message({
                                type: 'info',
                                message: '密码重置成功,重置后的新密码：学生的身份证后六位!'
                            });
                        }
                    }).catch(err => console.log(err))
                })


            }, err => console.log(err))

        },
        onSubmit() {
            if (this.formInline.xujiStatus === "") {
                this.xujiStatus[this.formInline.xujiStatus] = "";
            }
            if (this.formInline.xujiRecord === "") {
                this.xujiRecord[this.formInline.xujiRecord] = "";
            }
            this.$ajax.get("/api/369research/yzh/research/inter/getStuManagementByCondition?userid=" + this.username + "&accesstoken=" + this.password  + "&schoolCode=" + this.schoolCode + "&professionCode=" + this.professionCode + "&className=" + encodeURIComponent(encodeURIComponent(this.formInline.name)) + "&classCode=" + this.formInline.bianma + "&stuCode=" + this.formInline.id + "&stuName=" + encodeURIComponent(encodeURIComponent(this.formInline.firstname)) + "&creDate=" + this.formInline.startTime + "&endDate=" + this.formInline.endTime + "&stateListStr=" + this.xujiStatus[this.formInline.xujiStatus] + "&eventListStr=" + this.xujiRecord[this.formInline.xujiRecord]).then(res => {
                this.stuManagementList = res.data.stuManagementList;
            }, err => console.log(err))
        },
        addXuJi() {
            this.$router.push({ path: 'newXueJi/new' })
        },
        modiXuJi(stuId) {
            this.$router.push({ path: 'newXueJi/' + stuId, params: { stuId: stuId } })
        }
    },
    filters: {
        sex,
        managementState
    }
}
</script>
<style lang="less">
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
    .datePicker .el-input__icon {
        right: 20px;
    }
    .xueji-list {
        margin-top: 20px;
    }
}
</style>
