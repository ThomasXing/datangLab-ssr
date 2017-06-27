<template>
  <div id="app">
  
    <router-view></router-view>
    <el-dialog title="提示" :visible.sync="reLogin" size="tiny" @keyup.enter="reLoginId">
      <span class="re-tool">登录失效，请重新登录</span>
  
      <el-input v-model="accesstoken" type="password" placeholder="请输入用户密码"></el-input>
  
      <span slot="footer" class="dialog-footer">
        <el-button @click="reLoginfalse">取 消</el-button>
        <el-button type="primary" @click="reLoginId">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import qs from 'qs'
export default {
  name: 'app',
  data() {
    return {
      accesstoken: '',
      userid: '',
      rolelist: ''
    }
  },
  beforeMount() {
    let Storage = sessionStorage;
    this.userid = sessionStorage.getItem("userid");
    this.rolelist = sessionStorage.getItem("rolelist");
  },
  computed: {
    reLogin() {
      return this.$store.getters.reLogin
    },
  },
  methods: {
    reLoginId() {
      if (this.rolelist === "1") {
        this.$ajax.post('/api/369research/yzh/inter/login', qs.stringify({
          userName: this.userid,
          passWord: this.accesstoken
        })).then(res => {
          sessionStorage.setItem('keyId', res.data.userid)
          sessionStorage.setItem('keyToken', res.data.accesstoken)
          this.$router.go(0)


        }, error => {
          if (error.message === "Network Error") {
            this.$alert('网络错误', '提示信息', {
              confirmButtonText: '确定',
            });
          } else {
            this.$alert('用户名或密码输入错误', '提示信息', {
              confirmButtonText: '确定',
            })
          }
        })
      } else if (this.rolelist === "2") {
        this.$ajax.post('/api/369education/yzh/inter/login', qs.stringify({
          userName: this.userid,
          passWord: this.accesstoken
        })).then(res => {
          sessionStorage.setItem('keyId', res.data.userid)
          sessionStorage.setItem('keyToken', res.data.accesstoken)

          this.$router.go(0)

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
    },
    reLoginfalse() {
      this.$store.dispatch("LoginFalse")
    }
  }
}
</script>

<style lang = "less">
@import 'assets/css/base.less';
@import '../node_modules/element-ui/lib/theme-default/index.css';
.re-tool {
  font-size: 16px;
  display: block;
  margin: 10px;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all .4s cubic-bezier(0, 1.2, 1, 0.5);
  opacity: .7;
  transform: translate3d(0, 4em, 0);
}

.slide-up-enter,
.slide-up-leave-active {
  opacity: .3;
  transform: translate3d(0, 4em, 0);
}

.slide-down-enter-active,
.slide-down-leave-active {
  transition: all .4s cubic-bezier(0, 1.2, 1, 0.5);
  opacity: .7;
  transform: translate3d(0, 6em, 0);
}

.slide-down-enter,
.slide-down-leave-active {
  opacity: .1;
  transform: translate3d(0, 6em, 0);
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition: all .2s cubic-bezier(0, 1.2, 1, 0.5);
  opacity: .5;
  transform: translate3d(2em, 0, 0);
}

.slide-left-enter,
.slide-left-leave-active {
  opacity: .3;
  transform: translate3d(2em, 0, 0);
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: all .4s cubic-bezier(0, 1.2, 1, 0.5);
  opacity: .5;
  transform: translate3d(5em, 0, 0);
}

.slide-right-enter,
.slide-right-leave-active {
  opacity: .3;
  transform: translate3d(5em, 0, 0);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .4s
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}
</style>
