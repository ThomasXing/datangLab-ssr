<template>
  <div class="lab-header basebg">
    <a href="/" class="lab-logo fl"><img src="../assets/images/logo_1.png" alt="logo"></a>
    <span class="lab-name fl">{{title}}</span>
    <div class="user fr">
      <a href="javascript:;" class="fl" @click="userCheck">{{truename}}</a><a href='javascript:;' class="exit fl">退出</a>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
     
    }
  },
  beforeMount(){
      this.$store.dispatch("GET_USERNAME",sessionStorage.getItem("username"))
  },

  computed:{
    title(){
      return this.$store.getters.title;
    },
      truename(){
      return this.$store.getters.truename;
    }
  },
  methods:{
    userCheck(){
      this.$router.push({path:'/cultivate/stubasenews'})
    }
  }

}
</script>
<style lang='less' scoped>
.lab-header {
  height: 50px;
  line-height: 50px;
  color: #ffffff;
  overflow: hidden;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 999;
  & .lab-logo {
    margin: 7px 20px;
  }
  & .lab-name {
    font-size: 24px;
  }
  & .user {
    font-size: 17px;
    a {
      color: #ffffff;
      box-sizing: border-box;
      height: 50px;
    }
    a:hover {
      border-bottom: 4px solid #ffffff;
    }
    & .exit {
      margin-right: 91px;
      margin-left: 56px;
    }
  }
}
</style>