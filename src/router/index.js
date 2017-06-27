import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// We are using Webpack code splitting here so that each route's associated
// component code is loaded on-demand only when the route is visited.
// It's actually not really necessary for a small project of this size but
// the goal is to demonstrate how to do it.
//
// Note that the dynamic import syntax should actually be just `import()`
// but buble/acorn doesn't support parsing that syntax until it's stage 4
// so we use the old System.import here instead.
//
// If using Babel, `import()` can be supported via
// babel-plugin-syntax-dynamic-import.

const createListView = name => () =>
  System.import('../views/CreateListView').then(m => m.createListView(name))
const Home = () => System.import('../views/Home.vue')
const Lab = () => System.import('../views/Lab.vue')
const Login = () => System.import('../views/Login.vue')
const JingZheng = () => System.import('../views/JingZheng.vue')
const LabMan = () => System.import('../views/LabMan.vue')
const Course = () => System.import('../views/Course.vue')
const NewCourse = () => System.import('../views/NewCourse.vue')
const Classs = () => System.import('../views/Classs.vue')
const NewClass = () => System.import('../views/NewClass.vue')
const XueJi = () => System.import('../views/XueJi.vue')
const NewXueJi = () => System.import('../views/NewXueJi.vue')
// const SourceLab = () => System.import('../views/jy/SourceLab.vue')
// const Source = () => System.import('../views/jy/Source.vue')
// const Ability = () => System.import('../views/jy/Ability.vue')
// const JobEval = () => System.import('../views/jy/JobEval.vue')
// const AddTest = () => System.import('../views/jy/AddTest.vue')
// const TestList = () => System.import('../views/jy/TestList.vue')
// const Cultivate = () => System.import('../views/Cultivate.vue')
// const StuBaseNews = () => System.import('../views/StuBaseNews.vue')
// const Gaimi = () => System.import('../views/Gaimi.vue')

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/Home',
      component: createListView('Home')
    },
    {
      path: '/lab',
      name: 'lab',
      component: Lab
    },
     {
      path: '/login/:id',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      redirect: '/Home'
    },
     {
      path: '/JingZheng/:userid',
      name: 'jingzheng',
      component: JingZheng
    },
    {
      path: '/labman',
      name: 'jw',
      component: LabMan,
      meta: {
        requireAuth: true
      },
         children: [
        { path: 'course', component: Course },
        { path: 'newCourse', name: 'newCourse', component: NewCourse },
        { path: 'classs', component: Classs },
        { path: 'newclass', name: 'newClass', component: NewClass },
        { path: 'xueji', component: XueJi },
        { path: 'newXueJi/:stuId', name: 'newXuJi', component: NewXueJi }
      ]
    },
    // {
    //   path: '/sourceLab',
    //   name: 'jy',
    //   component: SourceLab,
    //   meta: {
    //     requireAuth: true
    //   },
    //   children: [
    //     { path: 'source', component: Source },
    //     { path: 'ability', component: Ability },
    //     { path: 'jobeval', component: JobEval },
    //     { path: 'addtest', component: AddTest },
    //     { path: 'testList', component: TestList },
    //   ]
    // },
    // {
    //   path: '/cultivate', component: Cultivate,
    //   children: [
    //     { path: 'stuBaseNews', component: StuBaseNews },
    //     { path: 'gaimi', component: Gaimi },
    //   ]
    // },
    // { path: '/stulogin', component: StuLogin }
  
      ]
})
