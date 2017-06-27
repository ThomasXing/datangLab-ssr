<template>
    <div id="cul">
        <HeadView></HeadView>
          <ul class='labman-menu'>
                <li>
                    <router-link to='/cultivate/stubasenews' class='labman-menu-item'>
                        学籍信息
                    </router-link>
                </li>
                <li>
                    <router-link to='/cultivate/gaimi' class='labman-menu-item'>
                        修改密码
                    </router-link>
                </li>
            </ul>
         <div class="labman-box">
                <router-view></router-view>
        </div>
    </div>
</template>
<script>
import HeadView from '../components/Head'
    export default{
        name:'',
        components:{
            HeadView
        }
    }
</script>