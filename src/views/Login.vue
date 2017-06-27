<template >
    <div id="login">
        <div class="login-title">
            <img src="../assets/images/logo_1.png" alt="logo">
            <h2>{{$route.params.id}}</h2>
        </div>
        <div class="login-box">
            <form action="" @keyup.enter="login">
                <div class='login-box-con mt20'>
                    <i class='login-user'></i>
                    <input v-focus class='login-user-input' type="text" placeholder="请输入用户名" v-model.lazy="userid">
                </div>
                <div class='login-box-con'>
                    <i class='login-pw'></i>
                    <input class='login-pw-input' type="password" placeholder="请输入密码" v-model="accesstoken">
                </div>
                <div class='login-rem'>
                    <el-checkbox v-model="checked" @change='rempw'>记住密码</el-checkbox>
                </div>
                <div>
                    <el-button class="home-login-btn basebg" type="info" @click='login'>登陆</el-button>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import qs from 'qs'
export default {
    name: 'login',
    data() {
        return {
            checked: false,
            accesstoken: "",
            userid: "",
            alertMiss: false
        }
    },
    beforeMount() {
        this.doremmberpass()
    },
    methods: {
        login() {
            if (this.userid == "" || this.accesstoken == "") {
                this.$alert('用户名或密码不能为空', '提示信息', {
                    confirmButtonText: '确定',
                })
            } else if (this.$route.params.id == "竞争力培养") {
                if (sessionStorage.getItem("rolelist") === "1") {
                    this.$ajax.post('/api/369research/yzh/inter/login', qs.stringify({
                        userName: this.userid,
                        passWord: this.accesstoken
                    })).then(res => {
                        sessionStorage.setItem('userid', this.userid)
                        sessionStorage.setItem('username', res.data.truename)
                        this.$router.push({ path: '/jingzheng/' + this.userid, params: { userId: this.userid } })
                        sessionStorage.setItem('keyId', res.data.userid)
                        sessionStorage.setItem('keyToken', res.data.accesstoken)

                    }, error => {
                        if (error.message === "Network Error" || new XMLHttpRequest().status == 0) {
                            this.$alert('网络错误', '提示信息', {
                                confirmButtonText: '确定',
                            });
                        } else {
                            this.$alert('用户名或密码输入错误', '提示信息', {
                                confirmButtonText: '确定',
                            })
                        }
                    })
                } else if (sessionStorage.getItem("rolelist") === "2") {
                    this.$http.post('http://www.369college.com/369education/yzh/inter/login', qs.stringify({
                        userName: this.userid,
                        passWord: this.accesstoken
                    })).then(res => {
                        sessionStorage.setItem('userid', this.userid)
                        sessionStorage.setItem('username', res.data.truename)
                        this.$router.push({ path: '/jingzheng/' + this.userid, params: { userId: this.userid } })
                        sessionStorage.setItem('keyId', res.data.userid)
                        sessionStorage.setItem('keyToken', res.data.accesstoken)

                    }, error => {
                        if (error.message === "Network Error" || new XMLHttpRequest().status == 0) {
                            this.$alert('网络错误', '提示信息', {
                                confirmButtonText: '确定',
                            });
                        } else {
                            this.$alert('用户名或密码输入错误', '提示信息', {
                                confirmButtonText: '确定',
                            })
                        }
                    })
                }

            }
        },
        rempw() {
            if (this.checked === true) {
                localStorage.setItem('keyName', this.userid)
                localStorage.setItem('keyPass', this.accesstoken)
            } else {
                localStorage.removeItem("keyName")
                localStorage.removeItem("keyPass")
            }
        },
        doremmberpass() {
            let nameVal = localStorage.getItem("keyName")
            let passVal = localStorage.getItem("keyPass")
            if (nameVal) {
                this.userid = nameVal
            } if (passVal) {
                this.accesstoken = passVal
                this.checked = true;
            }
        }
    }

}
</script>
<style lang='less'>
#login {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: -10;
    background-position: center top;
    background-repeat: no-repeat;
    background-attachment: fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
    zoom: 1;
    background: url(../assets/images/login-bg.png);
    overflow-y: hidden;
    .login-title {
        text-align: center;
        width: 203px;
        height: 73px;
        margin: 112px auto 20px;
        h2 {
            font-size: 30px;
            color: #fff;
            font-weight: 500;
        }
    }
    .login-box {
        width: 224px;
        height: 160px;
        border: 1px solid #fff;
        border-radius: 5px;
        position: absolute;
        margin-left: -203px;
        left: 50%;
        background: #fff;
        padding: 50px 90px;
        &-con {
            position: relative;
            display: inline-block;
        }
        .mt20 {
            margin-bottom: 20px;
        }
        i {
            width: 20px;
            height: 20px;
            display: inline-block;
            position: absolute;
            left: 10px;
            top: 9px;
        }
        .login-user {
            background-image: url(../assets/images/user1.png);
            background-repeat: no-repeat;
            background-size: 18px;
        }
        .login-pw {
            background-image: url(../assets/images/pass-wd.png);
            background-repeat: no-repeat;
            background-size: 18px;
        }
        .login-rem {
            margin: 20px 0;

            .el-checkbox__label {
                color: #2685d6;
            }
        }
    }
    input {
        width: 186px;
        height: 30px;
        line-height: 30px;
        padding-left: 34px;
    }
}
</style>