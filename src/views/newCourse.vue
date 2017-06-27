<template>
    <div class="newCourse">
        <div class='base-news'>
            <table class='baseNews'>
                <thead class="base-head">基本信息</thead>
                <el-form :model="formInline" class="demo-form-inline">
                    <tr>
                        <td class='tr'>
                            所属学校：
                        </td>
                        <td>
                            <el-select v-model="formInline.school" placeholder="全部学校" v-for='item in schoolList' :key='item.schoolCode' @change="get_schoolCode(item.schoolCode)">
                                <el-option :label="item.schoolName" value="青岛实训基地"></el-option>
    
                            </el-select>
                        </td>
    
                    </tr>
                    <tr>
                        <td class='tr'>
                            所属专业：
                        </td>
                        <td>
                            <el-select v-model="formInline.professional" placeholder="全部专业" v-for='profession in professionList' :key='profession.professionName' @change="get_professionCode(profession.professionCode)">
                                <el-option :label="profession.professionName" value="移动互联产品研发"></el-option>
                            </el-select>
    
                        </td>
                    </tr>
                    <tr v-show='productList.length>1'>
                        <td class='tr'>
                            所属产品：
                        </td>
                        <td>
                            <el-select v-model="formInline.product" placeholder="全部产品" v-for='list in productList' :key='list.productCode' @change="get_productCode(list.productCode)">
                                <el-option :label="list.productName" :value="list.productName"></el-option>
                            </el-select>
    
                        </td>
                    </tr>
                </el-form>
            </table>
        </div>
        <div class='base-news'>
            <table class='baseNews'>
                <thead class="base-head">课程信息</thead>
                <tr>
                    <td class='tr'>课程名称：</td>
                    <td>
                        <el-input v-model="formInline.courseName" placeholder="支持中文,数字,英文,不超过40个字符"></el-input>
                    </td>
                </tr>
                <tr>
                    <td class='tr'>课程编码：</td>
                    <td>
                        <el-input :disabled="true" placeholder="系统生成课程编码，用户不可修改"></el-input>
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
        </div>
        <div class="sub">
            <el-button class="btn-q" type="primary" size="large" @click='addCourse'>确定</el-button>
    
            <el-button class='btn-w' type="primary" size="large" @click="back">取消</el-button>
        </div>
    
    </div>
</template>
<script>
import qs from "qs"
import { mapGetters } from 'vuex'
export default {
    name: 'newCourse',
    data() {
        return {
            formInline: {
                school: '',
                professional: '',
                courseName: '',
                courseContent: '',
                product: ''
            },
            productList: '',
            schoolCode: '',
            professionCode: '',
            productCode: ''

        }
    },
     beforeMount() {
        this.username =sessionStorage.getItem("keyId")
        this.password =sessionStorage.getItem("keyToken")
    },
    mounted() {
        this.getAllProduct()
        this.$store.dispatch('SHOW_ACTIVECLASS', "courseActive")
        this.$store.dispatch('GET_SCHOOLLIST',{keyId:this.username,keyToken:this.password})
        this.$store.dispatch('GET_PROFESSIONLIST',{keyId:this.username,keyToken:this.password})
    },
    computed: {
        schoolList(){
            return this.$store.getters.schoolList;
        },
        professionList(){
            return this.$store.getters.professionList;
        }
    },
    methods: {
        get_schoolCode(a) {
            this.schoolCode = a;
        },
        get_professionCode(b) {
            this.professionCode = b;
        },
        get_productCode(c) {
            this.productCode = c;
        },
        getAllProduct() {
            this.$ajax.get("/api/369research/yzh/research/inter/getAllProduct?userid=" + this.username + "&accesstoken=" + this.password).then(res => {
                this.productList = res.data.productList;
                this.productCode = res.data.productList[0].productCode
            }).catch(err => console.log(err))
        },
        addCourse() {
            this.$ajax.post("/api/369research/yzh/research/inter/addCourse", qs.stringify({
                userid: this.username,
                accesstoken: this.password,
                schoolCode: this.schoolCode,
                professionCode: this.professionCode,
                courseName: this.formInline.courseName,
                courseContent: this.formInline.courseContent,
                productCode: this.productCode
            })).then(res => {
                if (res.data.addCourseFlag === "success") {
                    this.$alert('课程添加成功', '提示信息', {
                        confirmButtonText: '确定',
                    });
                }
            })
        },
        back() {
            this.$router.go(-1)
        }
    }
}

</script>
<style lang="less" scoped>
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

.base-news {
    margin: 34px;
    width: 908px;
    border-bottom: 1px solid #ddd;
}

.sub {
    text-align: center;
    .btn-w {
        background-color: #ffffff;
        width: 120px;
        height: 40px;
        border: 1px solid #0591ce;
        color: #008dce;
        border-radius: 20px;
    }
    .btn-q {
        background-color: #0591ce;
        width: 120px;
        height: 40px;
        color: #ffffff;
        border-radius: 20px;
    }
}
</style>