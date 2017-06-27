<template>
    <div class="newCourse">
        <div class='base-news'>
            <div class='baseNews'>
                <h3 class="base-head">基本信息</h3>
                <el-form :model="stuManagementQB" :rules="rules" ref="stuManagementQB" :label-position="labelPosition" label-width="175px" class="demo-form-inline">
                    <el-form-item label="所属学校：">
                        <el-select v-model="stuManagementQB.schoolName" placeholder="全部学校" v-for='item in schoolList' :key='item.schoolCode' @change="get_schoolCode(item.schoolCode)">
                            <el-option :label="item.schoolName" value="青岛实训基地"></el-option>
    
                        </el-select>
                    </el-form-item>
    
                    <el-form-item label="所属专业：">
                        <el-select v-model="stuManagementQB.professionName" placeholder="全部专业" v-for='profession in professionList' :key='profession.professionName' @change="get_professionCode(profession.professionCode)">
                            <el-option :label="profession.professionName" value="移动互联产品研发"></el-option>
                        </el-select>
    
                    </el-form-item>
    
                    <el-form-item label="学员学号：">
                        <el-input :disabled="true" placeholder="系统生成学员学号，用户不可修改"></el-input>
                    </el-form-item>
    
                    <el-form-item label="姓名：" prop="stuTrueName">
                        <el-input placeholder="" v-model="stuManagementQB.stuTrueName"></el-input>
                    </el-form-item>
    
                    <el-form-item label="身份证：" prop="stuIdCard">
                        <el-input placeholder="" v-model="stuManagementQB.stuIdCard" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="性别：">
                        <el-select v-model="stuManagementQB.stuSex" placeholder="请选择">
                            <el-option :label="key" :value="key" v-for="(val,key) in stuSex" :key="val">
                            </el-option>
    
                        </el-select>
                    </el-form-item>
                    <el-form-item label="学历：">
                        <el-select v-model="stuManagementQB.stuQualification" placeholder="请选择">
                            <el-option :label="key" :value="key" v-for="(val,key) in stuQualification" :key="val"></el-option>
    
                        </el-select>
                    </el-form-item>
                    <el-form-item label="毕业学校：">
                        <el-input placeholder="" v-model="stuManagementQB.stuSelfSchoolName"></el-input>
                    </el-form-item>
    
                    <el-form-item label="专业：">
                        <el-input placeholder="" v-model="stuManagementQB.stuSelfProfessionName"></el-input>
                    </el-form-item>
    
                    <el-form-item label="手机：" prop="stuPhone">
                        <el-input placeholder="" v-model="stuManagementQB.stuPhone"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱：" prop="stuMail">
                        <el-input placeholder="" v-model="stuManagementQB.stuMail"></el-input>
                    </el-form-item>
    
                </el-form>
            </div>
        </div>
        <div class='base-news'>
            <table class='baseNews'>
                <thead class="base-head">班级信息</thead>
                <tr>
                    <td class='tr'>
                        <el-popover ref="addxueji" placement="left" width="400" v-model="visible2">
                            <tr class="addxueji">
                                <td class='tr choClass'>选择班级：</td>
                                <td>
                                    <el-select v-model="stuManagementQB.className" placeholder="请选择" @change="get_classId(stuManagementQB.className)">
                                        <el-option :label="item.className" :value="item.className" v-for="item in classList" :key="item"></el-option>
                                    </el-select>
                                </td>
                            </tr>
                            <div style="text-align: center; margin: 0">
                                <el-button class="btn-q" type="primary" size="small" @click='addClassList'>确定</el-button>
    
                                <el-button class='btn-w' type="text" size="small" @click="visible2 = false">取消</el-button>
                            </div>
                        </el-popover>
                        <el-button class="btn" type="primary" v-popover:addxueji>添加班级</el-button>
                    </td>
    
                </tr>
                <tr v-for="(val,key) in myClassList">
                    <td class='tr'>班级：</td>
                    <td>
                        {{val}}
                    </td>
                    <td class="text-ddd">添加时间：</td>
                    <td class="text-ddd">{{key | normalTime}}</td>
                </tr>
                <tr>
                    <td v-for="(list,key,index) in myClassList" class="tr">
                        <el-button type="primary" @click="get_classId(list)">{{list}}</el-button>
                    </td>
                </tr>
            </table>
        </div>
        <div class='base-news'>
            <table class='baseNews'>
                <thead class="base-head">学籍信息</thead>
                <tr v-for="item in this.stuXueJiNews[this.classId]">
                    <td class='tr'>学籍状态：</td>
                    <td>
                        {{item.graduationState | courseStatus}}
                    </td>
                    <td>毕业资格：</td>
                    <td>{{item.managementState | managementState}}</td>
                    <td>当前纪律分：</td>
                    <td>{{item.score}}</td>
                </tr>
            </table>
        </div>
        <div class='base-news'>
            <table class='baseNews'>
                <thead class="base-head">学籍记录</thead>
                <tr>
                    <td class='tr'>
                        <el-popover ref="addxueji" placement="left" v-model="visible3">
                            <tr class="addxueji">
                                <td class='choClass'>添加事件：</td>
                                <td>
                                    <el-select v-model="stuEventList.stuEventName" placeholder="请选择" @change="get_stuEvent">
                                        <el-option :label="key" :value="key" v-for="(val,key) in stuEventName" :key="val"></el-option>
                                    </el-select>
                                </td>
                            </tr>
                            <tr class="addxueji" v-show="stuEvent.ruxue">
                                <td class="choClass">说明：</td>
                                <td>
                                    <el-input type="textarea" v-model="stuEventList.instructions"></el-input>
                                </td>
                            </tr>
                            <tr class="addxueji" v-show="stuEvent.jilv">
                                <td class="choClass">说明：</td>
                                <td>
                                    <el-select v-model="stuEventList.jilv" placeholder="请选择">
                                        <el-option label="-1" value="-1"></el-option>
                                        <el-option label="-2" value="-2"></el-option>
                                        <el-option label="-5" value="-5"></el-option>
                                        <el-option label="-10" value="-10"></el-option>
                                    </el-select>
    
                                    <el-input style="margin-top:20px;" type="textarea" placeholder="请填写扣除纪律分的原因" v-model="stuEventList.instructions"></el-input>
                                </td>
                            </tr>
                            <tr class="addxueji" v-show="stuEvent.pangting">
                                <td class="choClass">说明：</td>
                                <td>
                                    <el-input type="textarea" v-model="stuEventList.instructions"></el-input>
                                </td>
                            </tr>
                            <tr class="addxueji" v-show="stuEvent.xiuxue">
                                <td class="choClass">休学时段：</td>
                                <td>
                                    <el-form :inline="true" class="demo-form-inline">
                                        <el-date-picker v-model="stuEventList.startTime" type="date" placeholder="选择日期" @change="creDate(stuEventList.startTime)">
                                        </el-date-picker>
                                        <label class="el-form-item__label">至</label>
                                        <el-date-picker v-model="stuEventList.endTime" type="date" placeholder="选择日期" @change="endDate(stuEventList.endTime)">
                                        </el-date-picker>
                                    </el-form>
                                    <!--<el-date-picker v-model="stuEventList.startTime" type="daterange" placeholder="选择日期范围">
                                                                                                                                                                    </el-date-picker>-->
                                    <el-input style="margin-top:20px;" type="textarea" placeholder="请填写休学原因" v-model="stuEventList.instructions"></el-input>
                                </td>
                            </tr>
                            <tr class="addxueji" v-show="stuEvent.fuxue">
                                <td class="choClass">复学时间：</td>
                                <td>
                                    <el-date-picker v-model="stuEventList.fuxueTime" type="date" placeholder="选择日期" @change="fuxueTime(stuEventList.fuxueTime)">
                                    </el-date-picker>
                                </td>
                            </tr>
    
                            <tr class="addxueji" v-show="stuEvent.fuxue">
                                <td class="choClass">选择班级：</td>
                                <td>
                                    <el-select v-model="stuEventList.fuxueClass" placeholder="请选择">
                                        <el-option v-for="(val,key) in classList" :key="val" :label="val.className" :value="val.className">
                                        </el-option>
                                    </el-select>
                                    <el-input style="margin-top:20px;" type="textarea" placeholder="请填写复学原因" v-model="stuEventList.instructions"></el-input>
    
                                </td>
                            </tr>
                            <tr class="addxueji" v-show="stuEvent.liuji">
                                <td class="choClass">选择班级：</td>
                                <td>
                                    <el-select v-model="stuEventList.liuji" placeholder="请选择">
                                        <el-option v-for="(val,key) in classList" :key="val" :label="val.className" :value="val.className">
                                        </el-option>
                                    </el-select>
                                    <el-input style="margin-top:20px;" type="textarea" placeholder="请填写留级原因" v-model="stuEventList.instructions"></el-input>
    
                                </td>
                            </tr>
                            <tr class="addxueji" v-show="stuEvent.biye">
                                <td class="choClass">就业方式：</td>
                                <td>
                                    <el-select v-model="stuEventList.biye" placeholder="请选择">
                                        <el-option :label="key" :value="key" v-for="(val,key) in stuEventName" :key="val"></el-option>
                                    </el-select>
                                    <el-input style="margin-top:20px;" type="textarea" placeholder="请填写所选就业方式的原因" v-model="stuEventList.instructions"></el-input>
    
                                </td>
                            </tr>
                            <tr class="addxueji" v-show="stuEvent.jieye">
                                <td class="choClass">结业原因：</td>
                                <td>
                                    <el-select v-model="stuEventList.jieye" placeholder="请选择">
                                        <el-option :label="key" :value="key" v-for="(val,key) in stuEventName" :key="val"></el-option>
                                    </el-select>
                                    <el-input style="margin-top:20px;" type="textarea" placeholder="请填写结业的详细原因" v-model="stuEventList.instructions"></el-input>
    
                                </td>
                            </tr>
                            <tr class="addxueji" v-show="stuEvent.chongdu">
                                <td class="choClass">选择班级：</td>
                                <td>
                                    <el-select v-model="stuEventList.fuxueClass" placeholder="请选择">
                                        <el-option v-for="(val,key) in classList" :key="val" :label="val.className" :value="val.className">
                                        </el-option>
                                    </el-select>
                                    <el-input style="margin-top:20px;" type="textarea" placeholder="请填写重读的详细原因" v-model="stuEventList.instructions"></el-input>
    
                                </td>
                            </tr>
                            <tr class="addxueji" v-show="stuEvent.tuixue">
                                <td class="choClass">退学原因：</td>
                                <td>
                                    <el-select v-model="stuEventList.tuixue" placeholder="请选择">
                                        <el-option label="纪律分低于要求" value="纪律分低于要求"></el-option>
                                    </el-select>
                                    <el-input style="margin-top:20px;" type="textarea" placeholder="请填写退学的详细原因" v-model="stuEventList.instructions"></el-input>
    
                                </td>
                            </tr>
                            <tr class="addxueji" v-show="stuEvent.zigeFail">
                                <td class="choClass">说明：</td>
                                <td>
                                    <el-input type="textarea" placeholder="" v-model="stuEventList.instructions"></el-input>
    
                                </td>
                            </tr>
                            <div style="text-align: center; margin: 0">
                                <el-button class="btn-q" type="primary" size="small" @click='addStuEvent()'>确定</el-button>
    
                                <el-button class='btn-w' type="text" size="small" @click="visible3 = false">取消</el-button>
                            </div>
                        </el-popover>
                        <el-button class="btn" type="primary" v-popover:addxueji style="display:block;margin-left:51px;">添加事件</el-button>
                    </td>
    
                </tr>
                <table v-for="(newEvent,key) in classEvent[this.classId]">
    
                    <tr v-for="(evitem,keyTime) in newEvent">
    
                        <td class="tr">{{keyTime|normalTime}}</td>
                        <td v-for="(item,ikey) in evitem" :key="ikey" style="min-width:100px;">{{ikey==='eventDate'?'':item}}</td>
                    </tr>
    
                </table>
            </table>
        </div>
        <div class="sub">
            <el-button class="btn-q" type="primary" size="large" @click='addXueJi("stuManagementQB")' v-show="!isXiugai">确定</el-button>
            <el-button class="btn-q" type="primary" size="large" @click='updateXueJi("stuManagementQB")' v-show="isXiugai">确定</el-button>
            <el-button class='btn-w' type="primary" size="large" @click="back">取消</el-button>
        </div>
    </div>
</template>
<script>
import qs from "qs"
import { normalTime, managementState, courseStatus, sex } from "../filters/index.js"
import { mapGetters } from "vuex"
const get_stuQualification = {
    A: '硕士及以上',
    B: '本科',
    C: '专科'
}
export default {
    data() {
        let validateIdCard = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('身份证号码不能为空'));
            } else {
                if (!/^([0-9]){7,18}(x|X)?$/.test(value)) {
                    callback(new Error('身份证号码格式错误'));
                }
                callback();
            }
        };
        let validatePhone = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('手机号码不能空'));
            } else {
                if (!/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|7[0135678]|18[0-9])\d{8}$/.test(value)) {
                    callback(new Error('手机号码格式错误'));
                }
                callback();
            }
        };
        let validateMail = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('邮箱不能为空'));
            } else {
                if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value)) {
                    callback(new Error('邮箱格式格式错误'));
                }
                callback();
            }
        }
        return {
            labelPosition: "right",
            stuManagementQB: {
                schoolName: '',
                professionName: '',
                stuTrueName: '',
                stuIdCard: '',
                stuSex: '',
                stuQualification: '',
                stuSelfSchoolName: '',
                stuPhone: '',
                product: '',
                className: '',
                stuEventName: '',
                stuMail: ''

            },
            rules: {
                stuIdCard: [
                    { validator: validateIdCard, trigger: 'blur' }
                ],
                stuTrueName: [
                    { min: 2, max: 16, message: '长度在 2 到 5 个字符', trigger: 'blur' }
                ],
                stuPhone: [
                    { validator: validatePhone, trigger: 'blur' }

                ],
                stuMail: [
                    { validator: validateMail, trigger: 'blur' }
                ]
            },
            stuEvent: {
                ruxue: false,
                jilv: false,
                pangting: false,
                xiuxue: false,
                fuxue: false,
                liuji: false,
                biye: false,
                jieye: false,
                chongdu: false,
                tuixue: false,
                zigeFail: false
            },
            stuEventList: {
                stuEventName: null,
                jilv: null,
                xiuxue: null,
                startTime: null,
                endTime: null,
                fuxueTime: null,
                fuxueClass: null,
                liuji: null,
                biye: null,
                jieye: null,
                chongdu: null,
                tuixue: null,
                instructions: null
            },
            classEvent: {

            },
            classthis: {
                "等待开课": "W",
                "开课": "S",
                "结课": "E",
                "失效": "N"
            },
            stuSex: {
                "男": 'M',
                "女": 'F'
            },
            stuQualification: {
                "硕士及以上": "A",
                "本科": "B",
                "专科": "C"
            },
            stuEventName: {
                "入学进班": 1,
                "扣除纪律分": 2,
                "旁听": 3,
                "休学": 4,
                "复学": 5,
                "留级": 6,
                "毕业": 7,
                "结业": 8,
                "重读": 9,
                "退学": 10,
                "毕业资格无效": 11
            },
            stuXueJiNews: {
            },
            stuEventIntro: {
                stuEvent1: {
                    stuEvent1Intro: "",
                },
                stuEvent2: {
                    stuEvent2Intro: "",
                    stuEvent2Score: ""
                },
                stuEvent3: {
                    stuEvent3Intro: "",
                },
                stuEvent4: {
                    stuEvent4Intro: "",
                    stuEvent4StartDate: "",
                    stuEvent4EndDate: ""
                },
                stuEvent5: {
                    stuEvent5Intro: "",
                    stuEvent5Date: "",
                    stuEvent5ClassId: ""
                },
                stuEvent6: {
                    stuEvent6Intro: "",
                    stuEvent6ClassId: ""
                },
                stuEvent7: {
                    stuEvent7Intro: "",
                    stuEvent7Way: ""
                },
                stuEvent8: {
                    stuEvent8Intro: "",
                    stuEvent8Reason: ""
                },
                stuEvent9: {
                    stuEvent9Intro: "",
                    stuEvent9ClassId: ""
                },
                stuEvent10: {
                    stuEvent10Intro: "",
                    stuEvent10Reason: ""
                },
                stuEvent11: {
                    stuEvent11Intro: ""
                }
            },
            schoolCode: '',
            professionCode: '',
            productList: '',
            productCode: '',
            visible2: false,
            visible3: false,
            teacherList: '',
            classList: [],
            myClassList: {},
            classId: "",
            eventListStr: [],
            stuEventInfo: null,
            newStuEvent: [],
            XueJiNews: [],
            isActive: false
        }

    },
    beforeMount() {
        this.username = sessionStorage.getItem("keyId")
        this.password = sessionStorage.getItem("keyToken")
    },
    mounted() {
        this.getTeacherList()
        this.getpmList()
        this.getAllCourse()
        this.getAllClass()
        this.$store.dispatch('SHOW_ACTIVECLASS', 'xuejiActive')
        if (this.$route.params.stuId === "new") {
            this.$store.dispatch("addXuJi")
            this.stuXueJiNews[this.classId] = [{
                "graduationState": "Y",
                "managementState": "A",
                "score": 100
            }]
        } else {
            this.$store.dispatch("xiugaiXuJi")
            this.get_newXueJI()

        }
        this.$store.dispatch('GET_SCHOOLLIST',{keyId:this.username,keyToken:this.password})
        this.$store.dispatch('GET_PROFESSIONLIST',{keyId:this.username,keyToken:this.password})
    },
    computed: {
        schoolList() {
            return this.$store.getters.schoolList;
        },
        professionList() {
            return this.$store.getters.professionList;
        },
        isXiugai() {
            return this.$store.getters.isXiugai;
        }
    },
    filters: {
        normalTime,
        managementState,
        courseStatus,
        sex
    },
    methods: {
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
        getAllClass() {
            this.$ajax.get("/api/369research/yzh/research/inter/getClassByCondition?userid=" + this.username + "&accesstoken=" + this.password).then(res => {
                this.classList = res.data.classList;
            })
        },
        addClassList() {
            if (this.stuManagementQB.className) {
                this.$set(this.myClassList, new Date().getTime(), this.stuManagementQB.className)
                this.stuXueJiNews[this.classId] = [{
                    "graduationState": "Y",
                    "managementState": "A",
                    "score": 100
                }]
                this.visible2 = false;
            }
        },
        creDate(time) {
            if (time) {
                let d = new Date(time);
                this.stuEventList.startTime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
            } else {
                this.stuEventList.startTime = null;
            }
        },
        endDate(time) {

            if (time) {
                let d = new Date(time);
                this.stuEventList.endTime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
            } else {
                this.stuEventList.endTime = null;
            }
        },
        fuxueTime(time) {
            if (time) {
                let d = new Date(time);
                this.stuEventList.fuxueTime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
            } else {
                this.stuEventList.fuxueTime = null;
            }

        },
        get_classId(list) {
            this.$ajax.get("/api/369research/yzh/research/inter/getClassByCondition?userid=" + this.username + "&accesstoken=" + this.password + "&className=" + encodeURIComponent(encodeURIComponent(list))).then(res => {
                this.classId = res.data.classList[0].classId;
                if (this.$store.state.isXiugai === true) {
                    this.newStuEvent = this.classEvent[this.classId]
                }
            })
        },
        get_stuEvent() {
        //     let stuEv = this.stuEventName[this.stuEventList.stuEventName];
        //     for (let list of Object.keys(this.stuEvent)) {
        //         this.stuEvent[list] = false;
        //     }
        //     for (let key of Object.keys(this.stuEventList)) {
        //         if (key !== "stuEventName") {
        //             this.stuEventList[key] = null;
        //         }
        //     }
        //     if (this.classId === "") {
        //         this.$alert('请选择班级', '提示信息', {
        //             confirmButtonText: '确定',
        //         });
        //     }
        //     switch (stuEv) {
        //         case 1:
        //             this.stuEvent.ruxue = true;
        //             break
        //         case 2:
        //             this.stuEvent.jilv = true;

        //             break
        //         case 3:
        //             this.stuEvent.pangting = true;

        //             break
        //         case 4:
        //             this.stuEvent.xiuxue = true;

        //             break
        //         case 5:
        //             this.stuEvent.fuxue = true;

        //             break
        //         case 6:
        //             this.stuEvent.liuji = true;

        //             break
        //         case 7:
        //             this.stuEvent.biye = true;
        //             break
        //         case 8:
        //             this.stuEvent.jieye = true;
        //             break
        //         case 9:
        //             this.stuEvent.chongdu = true;
        //             break
        //         case 10:
        //             this.stuEvent.tuixue = true;
        //             break
        //         case 11:
        //             this.stuEvent.zigeFail = true;
        //             break
        //     }

        },
        get_newXueJI() {
        //     this.$ajax.get("/api/369research/yzh/research/inter/getStuManagementByStuId?userid=" + this.username + "&accesstoken=" +  this.password + "&stuId=" + this.$route.params.stuId).then(res => {
        //         let data = res.data.stuManagementQB
        //         data.stuSex === "F" ? data.stuSex = "女" : data.stuSex = "男";
        //         let stuQualification = data.stuQualification;
        //         data.stuQualification = get_stuQualification[stuQualification]
        //         this.stuManagementQB = data;
        //         let id = [];
        //         this.stuManagementQB.classRefList.forEach(function (list, key) {
        //             for (let item of list.stuEventList) {
        //                 for (let key of Object.keys(item)) {
        //                     if (!item[key]) {
        //                         delete item[key]
        //                     }
        //                 }
        //                 let newStuEvent = {};
        //                 list.stuEventList.forEach((val, index) => {
        //                     this.$set(newStuEvent, list.stuEventList[index].eventDate, list.stuEventList[index]);
        //                 })
        //                 if (Object.keys(this.classEvent).indexOf(this.classId) === -1) {
        //                     this.newStuEvent = [];
        //                 }
        //                 this.newStuEvent.push(newStuEvent)
        //                 for (let key in this.newStuEvent[0]) {
        //                     for (let stuEventIndex of Object.keys(this.stuEventName)) {
        //                         if (this.stuEventName[stuEventIndex] === this.newStuEvent[0][key].eventName) {
        //                             this.newStuEvent[0][key].eventName = stuEventIndex;
        //                             for (let index in this.classList) {
        //                                 if (this.newStuEvent[0][key].event5ClassId === this.classList[index].classId) {
        //                                     this.newStuEvent[0][key]['event5ClassId'] = this.classList[index].className;
        //                                 } else if (this.newStuEvent[0][key].event6ClassId === this.classList[index].classId) {
        //                                     this.newStuEvent[0][key]['event6ClassId'] = this.classList[index].className;

        //                                 } else if (this.newStuEvent[0][key].event9ClassId === this.classList[index].classId) {
        //                                     this.newStuEvent[0][key]['event9ClassId'] = this.classList[index].className;

        //                                 }
        //                             }
        //                         }
        //                     }
        //                 }
        //                 this.stuManagementQB.className = list.className;
        //                 this.$set(this.classEvent, list.classId, this.newStuEvent)
        //             };
        //             this.$set(this.myClassList, list.classCreDate, list.className)

        //             // console.log(this.myClassList,this.stuManagementQB.className)
        //             let obj = {};
        //             let XueJiNews = [];
        //             obj['graduationState'] = this.stuManagementQB.classRefList[key]['graduationState']
        //             obj['managementState'] = this.stuManagementQB.classRefList[key]['managementState']
        //             obj['score'] = this.stuManagementQB.classRefList[key]['score']
        //             XueJiNews.push(obj)
        //             this.$set(this.stuXueJiNews, list.classId, XueJiNews);
        //             id.push(list.classId)
        //         }, this)
        //     }, err => console.log(err))
        },
        get_schoolCode(a) {
            this.schoolCode = a;
        },
        get_professionCode(b) {
            this.professionCode = b;
        },
        get_productCode(c) {
            this.productCode = c;
        },
        get_teacherOne(d) {
            this.teacherCode = d;
        },
        get_teacherTwo(e) {
            this.pmCode = e;
        },
        getAllCourse() {
            this.$ajax.get("/api/369research/yzh/research/inter/getAllCourse?userid=" + this.username + "&accesstoken=" + this.password).then(res => {
                this.courseList = res.data.courseList
            })
        },
        addStuEvent() {
            let stuEv = this.stuEventName[this.stuEventList.stuEventName];
            switch (stuEv) {
                case 1:
                    this.stuEventIntro.stuEvent1.stuEvent1Intro = this.stuEventList.instructions;
                    this.stuEventInfo = this.stuEventIntro.stuEvent1;
                    break
                case 2:
                    this.stuEventIntro.stuEvent2.stuEvent2Intro = this.stuEventList.instructions;
                    this.stuEventIntro.stuEvent2.stuEvent2Score = Math.abs(this.stuEventList.jilv);
                    this.stuEventInfo = this.stuEventIntro.stuEvent2;
                    break
                case 3:
                    this.stuEventIntro.stuEvent3.stuEvent3Intro = this.stuEventList.instructions;
                    this.stuEventInfo = this.stuEventIntro.stuEvent3;
                    break
                case 4:
                    this.stuEventIntro.stuEvent4.stuEvent4Intro = this.stuEventList.instructions;
                    this.stuEventIntro.stuEvent4.stuEvent4StartDate = this.stuEventList.startTime;
                    this.stuEventIntro.stuEvent4.stuEvent4EndDate = this.stuEventList.endTime;
                    this.stuEventInfo = this.stuEventIntro.stuEvent4;
                    break
                case 5:
                    this.stuEventIntro.stuEvent5.stuEvent5Intro = this.stuEventList.instructions;
                    this.stuEventIntro.stuEvent5.stuEvent5Date = this.stuEventList.fuxueTime;
                    this.stuEventIntro.stuEvent5.stuEvent5ClassId = this.classId;
                    this.stuEventInfo = this.stuEventIntro.stuEvent5;
                    break
                case 6:
                    this.stuEventIntro.stuEvent6.stuEvent6Intro = this.stuEventList.instructions;
                    this.stuEventIntro.stuEvent6.stuEvent6ClassId = this.classId;
                    this.stuEventInfo = this.stuEventIntro.stuEvent6;
                    break
                case 7:
                    this.stuEventIntro.stuEvent7.stuEvent7Intro = this.stuEventList.instructions;
                    this.stuEventIntro.stuEvent7.stuEvent7Way = this.stuEventList.biye;
                    this.stuEventInfo = this.stuEventIntro.stuEvent7;
                    break
                case 8:
                    this.stuEventIntro.stuEvent8.stuEvent8Intro = this.stuEventList.instructions;
                    this.stuEventIntro.stuEvent8.stuEvent8Reason = this.stuEventList.jieye;

                    this.stuEventInfo = this.stuEventIntro.stuEvent8;
                    break
                case 9:
                    this.stuEventIntro.stuEvent9.stuEvent9Intro = this.stuEventList.instructions;
                    this.stuEventIntro.stuEvent9.stuEvent9ClassId = this.stuEventList.chongdu;
                    this.stuEventInfo = this.stuEventIntro.stuEvent9;
                    break
                case 10:
                    this.stuEventIntro.stuEvent10.stuEvent10Intro = this.stuEventList.instructions;
                    this.stuEventIntro.stuEvent10.stuEvent10Reason = this.stuEventList.tuixue;
                    this.stuEventInfo = this.stuEventIntro.stuEvent10;
                    break
                case 11:
                    this.stuEventIntro.stuEvent11.stuEvent11Intro = this.stuEventList.instructions;
                    this.stuEventInfo = this.stuEventIntro.stuEvent11;
                    break
            }



        //     let time = new Date().getTime();
        //     let stuEventObj = { "classId": this.classId, "stuEventName": this.stuEventName[this.stuEventList.stuEventName] };
        //     let newStuEvent = {};
        //     let stuEventList = {};
        //     let stuEventLists = []
        //     for (let key of Object.keys(this.stuEventInfo)) {
        //         this.$set(stuEventObj, key, this.stuEventInfo[key])
        //     }

        //     this.eventListStr = [stuEventObj];
        //     if (Object.keys(this.classEvent).indexOf(this.classId) === -1) {
        //         this.newStuEvent = [];
        //     }
        //     this.$set(newStuEvent, time, this.stuEventList)
        //     for (let stuEvent of Object.keys(newStuEvent[time])) {
        //         if (!newStuEvent[time][stuEvent]) {
        //             delete newStuEvent[time][stuEvent]
        //         } else {
        //             if (this.newStuEvent[0] === undefined) {
        //                 stuEventLists.push(newStuEvent[time][stuEvent])
        //             } else {
        //                 stuEventList[stuEvent] = newStuEvent[time][stuEvent];
        //             }
        //         }
        //     }

        //     if (this.newStuEvent[0] === undefined) {
        //         this.$set(newStuEvent, time, stuEventLists)
        //         this.newStuEvent.push(newStuEvent)
        //     } else {
        //         this.$set(this.newStuEvent[0], time, stuEventList)
        //     }
        //     this.$set(this.classEvent, this.classId, this.newStuEvent)
        //     this.visible3 = false;
        },
        addXueJi(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let params = {
                        userid: this.username,
                        accesstoken: this.password,
                        stuName: this.stuManagementQB.stuTrueName,
                        stuIDCard: this.stuManagementQB.stuIdCard,
                        stuSex: this.stuSex[this.stuManagementQB.stuSex],
                        stuQualification: this.stuQualification[this.stuManagementQB.stuQualification],
                        stuSelfSchoolName: this.stuManagementQB.stuSelfSchoolName,
                        stuSelfProfessionName: this.stuManagementQB.stuSelfProfessionName,
                        stuPhone: this.stuManagementQB.stuPhone,
                        stuMail: this.stuManagementQB.stuMail,
                        eventListStr: JSON.stringify(this.eventListStr),
                        schoolCode: this.schoolCode,
                        professionCode: this.professionCode
                    }
                    this.$ajax.post("/api/369research/yzh/research/inter/addStuManagement", qs.stringify(params)).then(res => {
                        if (res.data.addStuManagementFlag === "success") {
                            this.$alert('学籍添加成功', '提示信息', {
                                confirmButtonText: '确定',
                            });
                        }
                    })
                } else {
                    return false;
                }
            });

        },
        updateXueJi(formName) {
        //     for (let key of this.schoolList) {
        //         if (key.schoolName === this.stuManagementQB.school) {
        //             this.schoolCode = key.schoolCode;
        //         }
        //     }
            // for (let key of this.professionList) {
            //     if (key.professionName === this.stuManagementQB.professional) {
            //         this.professionCode = key.professionCode;
            //     }
            // }
            let params = {
                userid: this.username,
                accesstoken:  this.password,
                stuName: this.stuManagementQB.stuTrueName,
                stuIDCard: this.stuManagementQB.stuIdCard,
                stuSex: this.stuSex[this.stuManagementQB.stuSex],
                stuQualification: this.stuQualification[this.stuManagementQB.stuQualification],
                stuSelfSchoolName: this.stuManagementQB.stuSelfSchoolName,
                stuSelfProfessionName: this.stuManagementQB.stuSelfProfessionName,
                stuPhone: this.stuManagementQB.stuPhone,
                stuMail: this.stuManagementQB.stuMail,
                eventListStr: JSON.stringify(this.eventListStr),
                schoolCode: this.schoolCode,
                professionCode: this.professionCode,
                stuId: this.$route.params.stuId
            }
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$ajax.post("/api/369research/yzh/research/inter/updateStuManagement", qs.stringify(params)).then(res => {
                        if (res.data.updateStuManagementFlag === "success") {
                            this.$alert('学籍修改成功', '提示信息', {
                                confirmButtonText: '确定',
                            });
                        }
                    })
                } else {
                    return false;
                }
            });

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
        font-weight: normal;
    }
    tr {
        height: 61px;
        vertical-align: middle;
        td {
            padding-right: 10px;
        }
        .el-select {
            width: 247px;
            height: 32px;
        }
        .el-input {
            width: 247px;
            height: 32px;
        }
    }
    .el-select {
        width: 247px;
        height: 32px;
    }
    .el-input {
        width: 247px;
        height: 32px;
    }
    .tr {
        text-align: right;
        width: 160px;
    }
    .text-ddd {
        color: #BCBCBC;
    }
}

.base-news {
    margin: 34px;
    width: 1200px;
    border-bottom: 1px solid #ddd;

    .baseNews {
        .el-button:focus,
        .el-button:hover {
            color: #eee;
            border-color: #20a0ff;
        }
    }
}


.sub {
    width: 1200px;
    margin: 34px;
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

.addxueji {
    margin: 20px auto;
    display: block; // width: 253px;
    .choClass {
        width: 80px;
        font-size: 16px;
        text-align: right;
    }
    .instructions {
        display: block;
        resize: vertical;
        padding: 5px 7px;
        line-height: 1.5;
        width: 100%;
        color: #1f2d3d;
        background-color: #fff;
        background-image: none;
        border: 1px solid #bfcbd9;
        border-radius: 4px;
        transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
        font-size: 14px;
        box-sizing: border-box;
    }
}
</style>