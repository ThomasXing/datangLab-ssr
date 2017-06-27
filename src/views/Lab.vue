<template>
  <div class="lab">
    <HeadView></HeadView>
    <div class="lab-con">
       <ul class="clearfix">
          <li class="lab-con-box basebg fl">
              <router-link to='/login/优势分析'>  
            <img src="../assets/images/analyze.jpg" alt="优势分析">
            <h3 class="lab-con-box-title">优势分析</h3>
             </router-link>
          </li>
            <li class="lab-con-box basebg fl mar">  
            <router-link to='/login/事业发展规划'>
               <img src="../assets/images/plan.jpg" alt="事业发展规划">
            <h3 class="lab-con-box-title">事业发展规划</h3>
            </router-link>
          </li>
            <li class="lab-con-box basebg fl">  
           <router-link to="/login/竞争力培养">
              <img src="../assets/images/train.jpg" alt="竞争力培养">
              <h3 class="lab-con-box-title">竞争力培养</h3>
           </router-link>
          </li>

           <li class="lab-con-box basebg fl mar-l">  
              <router-link to="/login/事业启航">
            <img src="../assets/images/Career.png" alt="事业启航">
            <h3 class="lab-con-box-title">事业启航</h3>
             </router-link>
          </li>
            <li class="lab-con-box basebg fl mar-r">  
               <router-link to="/login/创业提升">
            <img src="../assets/images/promote.jpg" alt="创业提升">
            <h3 class="lab-con-box-title">创业提升</h3>
             </router-link>
          </li>
       </ul>
    </div>
  </div>
</template>

<script>
import HeadView from './Head.vue'
// console.log(sessionStorage)
export default {
  name: 'hello',
  data () {
    return {
    }
  },
  created(){
      this.$store.dispatch("SET_TITLE",'教研平台')
  },
  components:{
    HeadView
  }
}
</script>

<style scoped lang='less'>
    & .lab-con{
      width:916px;
      padding-top: 50px;
      margin:63px auto;    
     &-box{
        width:252px;
        height:240px;
        text-align: center;
        &-title{
          margin-top:5px;
          font-size:20px;
          color:#ffffff;
        }
        &:after{
              content:'';
              display: block;
              width: 46px;
              height: 3px;
              margin: 15px auto;
              background-color:#ffffff;
        }  
        }
         .mar{
          margin: 0 80px;     
      }
      .mar-l{
        margin:45px 0 65px 165px;
      }
      .mar-r{
         margin: 45px 0 65px 80px;
      }
      
    }

</style>
