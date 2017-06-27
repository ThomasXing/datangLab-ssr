<template>
  <div id="ability" class="clearfix">
  
    <div class="ability-tree" id="ability-tree">
      <el-tree :data="data" :props="defaultProps" node-key="id" ref="tree" highlight-current  default-expand-all @node-click="handleNodeClick" :expand-on-click-node="false">
      </el-tree>
    </div>
    <div class="ability-query">
      <el-form :inline="true" :model="test" class="demo-form-inline">
        <el-form-item label="测评名称">
          <el-input v-model="test.name"></el-input>
        </el-form-item>
        <el-form-item label="测评状态">
          <el-input v-model="test.status"></el-input>
        </el-form-item>
        <el-form-item label='发布时间' class="datePicker">
          <el-date-picker v-model="test.startTime" type="datetime" placeholder="选择日期" @change="creDate(test.startTime)">
          </el-date-picker>
          <label class="el-form-item__label">至</label>
          <el-date-picker v-model="test.endTime" type="datetime" placeholder="选择日期" @change="endDate(test.endTime)">
          </el-date-picker>
        </el-form-item>
        <br>
        <el-form-item>
          <el-button class="btn" type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="source-list">
        <el-button class="btn" style="margin-bottom:17px;" type="primary" @click="newTest">新建测评</el-button>
        <el-table :data="testQBList" border style="width: 100%" class='course-list' row-key='testQBList.testid' @row-click="rowClick" :row-class-name="tableRowClassName" highlight-current-row v-show="testQBList.length!==0">
          <el-table-column fixed prop="index" label="序号" width="52" class="course-index">
          </el-table-column>
          <el-table-column prop="testname" label="测评名称" width="180" class="course-index">
          </el-table-column>
          <el-table-column label="测评状态" width="180" class="course-index">
            <template scope="scope">
              {{scope.row.teststate|testState}}
            </template>
          </el-table-column>
          <el-table-column prop="publishdate" label="发布时间" width="180" class="course-index">
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="240">
            <template scope="scope">
              <el-button class="my-btn" @click.once="publishTest(scope.row)" :class="{addpublish:scope.row.ispublishActive==true}"> 发布</el-button>
              <el-button class="my-btn" @click="updateTest(scope.row.testid)" v-show="!scope.row.ispublishActive==true">修改</el-button>
              <el-button class="my-btn" @click="checkTest(scope.row.testid)" v-show="scope.row.ispublishActive==true">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
const jy_url = "http://www.369college.com/369education";
const get_testState = {
  '未发布': 'A',
  '预备': 'B',
  '进行中': 'C',
  '已结束': 'D'
}
import { testState } from '../../filters';
import { mapGetters } from 'vuex'
import qs from "qs"
export default {
  data() {
    return {
      data: [],
      defaultProps: {
        children: 'courseList',
        label: 'text'
      },
      test: {
        name: '',
        status: '',
        startTime: '',
        endTime: ''
      },
      courseid: '',
      classList: [],
      testQBList: [],
      ispublishActive: false,
    }
  },
  created() {
    this.getAllCourse()
    if (this.$store.state.courseId !== "") {
      let data = {
        courseid: this.$store.state.courseId,
      }
      this.handleNodeClick(data);

    };
  },
  mounted() {

  },
  
  filters: {
    testState
  },
  computed: {
    ...mapGetters(['courseId', 'isCurrentRow']),

  },
  methods: {
    getAllCourse() {
      this.$http.get(jy_url + "/yzh/education/inter/getAllCourse?userid=" + sessionStorage.getItem("keyId") + "&accesstoken=" + sessionStorage.getItem("keyToken")).then(res => {
        this.data = res.data.courseList;
      })
    },
    getAllTest() {
      this.$http.get(jy_url + "/yzh/education/inter/getAllTest?userid=" + sessionStorage.getItem("keyId") + "&accesstoken=" + sessionStorage.getItem("keyToken") + "&courseId=" + this.courseid).then(res => {
        if (res.data) {
          this.testQBList = res.data.testQBList;
          this.testQBList.forEach((elem, index) => {
            if (elem.publishdate) {
              this.$set(elem, 'ispublishActive', true)
            }
              this.$set(elem, 'index', (index + 1))
          })
        }
      }, err => console.log(err))

    },
    rowClick(row) {
      this.$store.dispatch("GET_CURRENTCLASS", row);
    },
    tableRowClassName(row, index) {
     if(this.$store.state.isCurrentRow!==null){
        let currentIndex = this.$store.state.isCurrentRow.index;
        if ((index+1) === currentIndex) {
          return 'current-row';
        } 
        return '';
     }
      },
    publishTest(data) {
      if (data.publishdate === null) {
        this.$http.post(jy_url + "/yzh/education/inter/publishTest", qs.stringify({
          userid: sessionStorage.getItem("keyId"),
          accesstoken: sessionStorage.getItem("keyToken"),
          testId: data.testid
        })).then(res => {
          if (res.data.publishTestFlag === "success") {
            this.getAllTest()
          }
        })
      }
    },
    updateTest(testid) {
      this.$http.get(jy_url + "/yzh/education/inter/getTestById?userid=" + sessionStorage.getItem("keyId") + "&accesstoken=" + sessionStorage.getItem("keyToken") + "&courseId=" + this.courseid + "&testId=" + testid).then(res => {
        this.$router.push({ path: 'addtest', query: { updateTest: JSON.stringify(res.data.testQB), update: 'true' } })
      })

    },
    checkTest(testid) {
      this.$http.get(jy_url + "/yzh/education/inter/getTestById?userid=" + sessionStorage.getItem("keyId") + "&accesstoken=" + sessionStorage.getItem("keyToken") + "&courseId=" + this.courseid + "&testId=" + testid).then(res => {
        this.$router.push({ path: 'testList', query: { checkTest: JSON.stringify(res.data.testQB) } })
      })

    },
    onSubmit() {
      if (this.courseid !== "") {
        if (this.test.status === "") {
          get_testState[this.test.status] = "";
        }
        this.$http.get(jy_url + "/yzh/education/inter/getTestByCondition?userid=" + sessionStorage.getItem("keyId") + "&accesstoken=" + sessionStorage.getItem("keyToken") + "&courseid=" + this.courseid + "&testname=" + encodeURIComponent(this.test.name) + "&teststate=" + get_testState[this.test.status] + "&publishstartdate=" + this.test.startTime + "&publishenddate=" + this.test.endTime).then(res => {
          this.testQBList = res.data.testQBList
        }, err => console.log(err))
      } else {
        this.$alert('请选择课程', '提示信息', {
          confirmButtonText: '确定',
        });
      }
    },
    creDate(time) {
      if (time) {
        let d = new Date(time);
        let m = (d.getMonth() + 1) < 10 ? "0" + (d.getMonth() + 1) : (d.getMonth() + 1);
        let dd = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
        let h = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
        let mm = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
        let s = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds();
        this.test.startTime = d.getFullYear() + '-' + m + '-' + dd + " " + h + ':' + mm + ':' + s;
      }
    },
    endDate(time) {
      if (time) {
        let d = new Date(time);
        let m = (d.getMonth() + 1) < 10 ? "0" + (d.getMonth() + 1) : (d.getMonth() + 1);
        let dd = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
        let h = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
        let mm = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
        let s = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds();
        this.test.endTime = d.getFullYear() + '-' + m + '-' + dd + " " + h + ':' + mm + ':' + s;
      }
    },
    newTest() {
      if (this.courseid !== "") {
        this.$router.push({ path: 'source', query: { source: 'test', classList: JSON.stringify(this.classList), courseid: this.courseid } })
      } else {
        this.$alert('请选择课程', '提示信息', {
          confirmButtonText: '确定',
        });
      }
    },

    handleNodeClick(data, node) {
      this.courseid = data.courseid;
      this.$http.get(jy_url + "/yzh/education/inter/getAllClassByCourseId?userid=" + sessionStorage.getItem("keyId") + "&accesstoken=" + sessionStorage.getItem("keyToken") + "&courseId=" + this.courseid).then(res => {
        this.classList = res.data.classList;
      })
      if (this.testQBList !== []) {
        this.getAllTest()
      } else {
        this.$alert('请添加测评', '提示信息', {
          confirmButtonText: '确定',
        });
      }
      this.$store.dispatch("GET_CURRENT", this.courseid)
    },

  }
}
</script>
<style lang="less" scoped>
.ability-tree {
  top: 0;
  position: fixed;
  bottom: 0;
  margin-top: 50px;
  .el-tree {
    border: none;
    background-color: #f6f6f6;
  }

  width: 20%;
  padding-left: 14px;
  background-color: #f6f6f6;
  #rename {
    position: absolute;
    z-index: 9999;
  }
}

.ability-query {
  float: left;
  left: 10px;
  width: 68%;
  margin-top: 22px;
  margin-left: 25%;
  .demo-form-inline {
    border-bottom: 1px solid #e8e8e8;
    margin-bottom: 17px;
  }
  input {
    width: 172px;
    height: 32px;
  }
  .demo-form-inline {
    color: rgb(51, 51, 51);
  }
  .el-form-item__label {
    border-radius: none;
    color: rgb(51, 51, 51);
    font-size: 16px;
  }
}

.addpublish {
  border: 1px solid #999999;
  color: #999999;
}
</style>


