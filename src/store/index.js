import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import qs from 'qs'

Vue.use(Vuex)
const state = {
  title: null,
  stuManagementQB: {},
  xuejiActive: null,
  courseActive: null,
  classActive: null,
  xueji: null,
  isXiugai: null,
  schoolList: "",
  professionList: "",
  sourceToggle: true,
  taskList: [],
  courseId: "",
  reLogin: false,
  catalogId: '',
  isCurrentRow: null,
  userId: "",
  truename: '',
  nameVal: '',
  passVal: ''
}
// console.log(sessionStorage.getItem("userid"))
const actions = {
  SET_TITLE: ({ commit }, val) => commit("set_title", val),
  GET_USERNAME: ({ commit },val) => commit("get_username",val),
  GET_CURRENT: ({ commit }, val) => commit("get_current", val),
  GET_USERID: ({ commit }) => commit("get_userid"),
  GET_NAMEVAL: ({ commit }) => commit("get_nameVal"),
  GET_PASSVAL: ({ commit }) => commit("get_passVal"),
  LoginFalse: ({ commit }) => commit("login_false"),
  GET_SCHOOLLIST: ({ commit },obj) => {
    axios.get("/api/369research/yzh/research/inter/getAllSchool?userid=" + obj.keyId + "&accesstoken=" + obj.keyToken).then(res => {
      let data = res.data.schoolList;
      commit("get_schoolList", data)

    }, err => console.log(err))

  },
  GET_PROFESSIONLIST: ({ commit },obj) => {
    axios.get("/api/369research/yzh/research/inter/getAllProfession?userid=" + obj.keyId + "&accesstoken=" + obj.keyToken).then(res => {
      let data = res.data.professionList;
      commit("get_professionList", data)

    }, err => console.log(err))
  },
  addXuJi: ({ commit }) => commit("add_xueji"),
  RE_LOGIN: ({ commit }) => commit("re_login"),
  xiugaiXuJi: ({ commit }) => commit("xiugaixueji"),
  SHOW_ACTIVECLASS: ({ commit }, val) => commit("show_activeClass", val),
  SOURCE_HIDE: ({ commit }) => commit("source_hide"),
  SOURCE_ShOW: ({ commit }) => commit("source_show"),
}
const mutations = {
  set_title(state, val) {
    state.title = val
  },
  get_current(state, val) {
    state.courseId = val
  },
  get_userid(state) {
    state.userId = sessionStorage.getItem("userid");
  },
  get_username(state,val) {
    state.truename = val;
  },
  get_nameVal(state) {
    state.nameVal = localStorage.getItem("un");
  },
  get_passVal(state) {
    state.passVal = localStorage.getItem("pw");
  },
  xiugaixueji(state) {
    state.isXiugai = true;
  },
  show_activeClass: (state, val) => {
    state.xuejiActive = false;
    state.courseActive = false;
    state.classActive = false;
    switch (val) {
      case "xuejiActive":
        state.xuejiActive = true;
        break;
      case "courseActive":
        state.courseActive = true;
        break;
      case "classActive":
        state.classActive = true;
        break;
    }
  },
  add_xueji: (state) => {
    state.isXiugai = false;
  },
  re_login: (state) => {
    state.reLogin = true;
  },
  login_false(state) {
    state.reLogin = false;
  },
  get_schoolList: (state, data) => {
    state.schoolList = data;
  },
  get_professionList: (state, data) => {
    state.professionList = data;
  },
  source_hide: (state) => {
    state.sourceToggle = false;
  },
  source_show: (state) => {
    state.sourceToggle = true;
  },
  get_taskList: (state, data) => {
    state.taskList = data;
  },
  get_catalogId: (state, item) => {
    state.catalogId = item;
  },
  get_currentClass: (state, data) => {
    state.isCurrentRow = data;
  }

}
const getters = {
  title: state => state.title,
  userId: state => state.userId,
  truename: state => state.truename,
  nameVal: state => state.nameVal,
  passVal: state => state.passVal,
  courseId: state => state.courseId,
  stuManagementQB: state => state.stuManagementQB,
  xuejiActive: state => state.xuejiActive,
  courseActive: state => state.courseActive,
  classActive: state => state.classActive,
  isXiugai: state => state.isXiugai,
  schoolList: state => state.schoolList,
  professionList: state => state.professionList,
  sourceToggle: state => state.sourceToggle,
  taskList: state => state.taskList,
  reLogin: state => state.reLogin,
  catalogId: state => state.catalogId,
  isCurrentRow: state => state.isCurrentRow,

}
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations

})