<template>
    <div id="home">
        <div class="home-header con">
            <h1 class="home-header-title">
                <a href="javascript:;">
                    <img src="../assets/images/logo.png" alt="大唐网络和云智汇" width='500'>
                </a>
            </h1>
        </div>
        <div class="home-login" @keyup.enter='login'>
            <div class="home-login-con">
                <div class="home-login-con-title">用户登录</div>
                <ul>
                    <li class="home-login-con-user clearfix">
                        <span class="login-icon user"></span>
                        <input class="home-user-input" type="text" placeholder="请输入用户名" v-model='userid' v-focus>
                    </li>
                    <li class="home-login-con-user mar clearfix">
                        <span class="login-icon pw"></span>
                        <input class="home-user-input" type="password" placeholder="请输入密码" v-model='password'>
                    </li>
                    <li>
                        <el-checkbox v-model="checked" @change='rempw' fill="#0491cd">记住密码</el-checkbox>
                    </li>
                    <li>
                        <el-button class="home-login-btn" type="info" @click='login'>登陆</el-button>
                    </li>
                </ul>
    
            </div>
        </div>
        <div class="home-footer">
            <p class='con'>©大唐网络有限公司</p>
        </div>
        <el-button type="text"></el-button>
    </div>
</template>
<script>
import qs from 'qs'
export default {
    name: 'home',
    data() {
        return {
            checked: false,
            password: '',
            userid: '',
            alertMiss: false,
        }
    },
    beforeMount() {
        this.$store.dispatch("GET_NAMEVAL")
        this.$store.dispatch("GET_PASSVAL")
    },
    mounted() {
        this.doremmberpass()
    },
    computed: {
        nameVal() {
            return this.$store.getters.nameVal;
        },
        passVal() {
            return this.$store.getters.passVal;
        },
    },
    methods: {
        login() {
            if (this.userid === "" || this.password === "") {
                this.$alert('用户名或密码不能为空', '提示信息', {
                    confirmButtonText: '确定',
                })
            } else {
                this.$ajax.post("http://www.369college.com/369manage/yzh/manage/inter/login", qs.stringify({
                    userName: this.userid,
                    passWord: this.password
                })).then(res => {
                    if (res.data.loginFlag === true) {
                        sessionStorage.setItem('userid', this.userid)
                        sessionStorage.setItem('username', this.userid)
                        this.$store.dispatch("GET_USERID")
                        this.$router.push({ name: 'lab', query: { userid: this.userid } })
                        sessionStorage.setItem('rolelist', res.data.rolelist)
                    }
                }, error => {
                    if (error.message === "Network Error") {
                        this.$alert('网络错误', '提示信息', {
                            confirmButtonText: '确定',
                        });
                    } else {
                        this.open()
                    }

                })
            }

        },
        rempw() {
            if (this.checked === true) {
                localStorage.setItem('un', this.userid)
                localStorage.setItem('pw', this.password)
            } else {
                localStorage.removeItem("un")
                localStorage.removeItem("pw")
            }
        },
        doremmberpass() {
            if (this.nameVal) {
                this.userid = this.nameVal
            } if (this.passVal) {
                this.password = this.passVal
                this.checked = true;
            }
        },
        open() {
            this.$alert('用户名或密码输入错误', '提示信息', {
                confirmButtonText: '确定',
            });
        }

    }

}
</script>
<style lang="less" scoped>
#home {
    & .home-header {
        height: 73px;
        &-title {
            margin-top: 27px;
        }
    }
    & .home-login {
        width: 100%;
        height: 640px;
        background: url(../assets/images/homebg.jpg) no-repeat 100%;
        background-size: cover;
        &-con {
            width: 380px;
            float: right;
            height: 426px;
            margin-top: 103px;
            margin-right: 168px;
            background-color: rgba(255, 255, 255, .7);
            box-shadow: 0 0 0 10px rgba(234, 238, 240, 0.8);
            & ul {
                margin-left: 25px;
                margin-top: 40px;
                .mar {
                    margin-top: 31px;
                    margin-bottom: 22px;
                }
            }

            &-title {
                height: 60px;
                background-color: #0491cd;
                font-size: 30px;
                font-weight: 500; // text-shadow: 1px 2px 2px #171e27;
                color: #f2f8ff;
                line-height: 60px;
                padding-left: 20px;
            }
            &-user {
                .login-icon {
                    float: left;
                    display: block;
                    width: 52px;
                    height: 52px;
                }
                .user {
                    background: url(../assets/images/user.png) no-repeat #0491cd 16px 16px;
                }
                .pw {
                    background: url(../assets/images/password.png) no-repeat #0491cd 16px 16px;
                }
                .home-user-input {
                    float: left;
                    width: 270px;
                    height: 50px;
                    border: 1px solid #0491cd;
                    padding-left: 10px;
                    font-size: 16px;
                }
            }
            & .home-login-btn {
                width: 332px;
                height: 50px;
                border-radius: 50px;
                background-color: #0491cd;
                margin-top: 44px;
            }
        }
    }
    & .home-footer {
        text-align: center;
        height: 88px;
        line-height: 88px;
        font-size: 20px;
    }
}
</style>