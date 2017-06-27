import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import axios from 'axios'
import { sync } from 'vuex-router-sync'
import ElementUI from 'element-ui'

Vue.use(ElementUI)
// sync the router with the vuex store.
// this registers `store.state.route`
sync(store, router)
Vue.prototype.$ajax = axios;

axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
// axios.interceptors.response.use((res) => {
//   if (res.status >= 200 && res.status < 300) {
//     return res;
//   }
//   return Promise.reject(res);
// }, (error) => {
//   // 网络异常
//   return Promise.reject({message: '网络异常，请刷新重试', err: error});
// });

axios.interceptors.response.use(function (res) { //配置请求回来的信息
 
  if (res.data.loginFlag === "fail") {
    store.dispatch("RE_LOGIN")
  }

  return res;
}, function (error) {
  if (error.message === "Network Error" || new XMLHttpRequest().status == 0) {
    this.$alert('网络错误', '提示信息', {
      confirmButtonText: '确定',
    });
  }
  return Promise.reject(error);
});
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    if (store.state.userId) {  // 通过vuex state获取当前的token是否存在
      next();
    } else {
      next({
        path: '/home',
        query: { redirect: to.fullPath }  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  }
  else{
    next()
  }
})
Vue.directive('focus', {
  // 当绑定元素插入到 DOM 中。
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})
/**
 * 创建vue实例
 * 在这里注入 router  store 到所有的子组件
 * 这样就可以在任何地方使用 `this.$router` and `this.$store`
 * @type {Vue$2}
 */
const app = new Vue({
  router,
  store,
  render: h => h(App)
})

/**
 * 导出 router and store.
 * 在这里不需要挂载到app上。这里和浏览器渲染不一样
 */
export { app, router, store }
