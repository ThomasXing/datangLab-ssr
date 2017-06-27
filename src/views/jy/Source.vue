
<template>
    <div id="source" class="clearfix">
        <!--C:\Users\369云智汇\AppData\Local\Microsoft\Windows\INetCache\IE\IAAS9U4C-->
        <div class="source-head clearfix" v-show="sourceToggle">
            <div class="source-head-incre">
                <el-button class="btn" type="primary" @click="RootVisible = true">新增课程</el-button>
            </div>
            <div class="source-head-title">
                任务
            </div>
            <div class="source-head-editor">
                <el-button class="btn" type="primary" @click="createSource">编辑</el-button>
            </div>
        </div>
    
        <div class="source-head clearfix" v-show="!sourceToggle">
            <div class="source-head-incre">
                <el-button class="btn" type="primary" @click="saveTest">保存</el-button>
                <el-button class="btn" type="primary" @click="$router.push({path:'ability'})">取消</el-button>
            </div>
        </div>
    
        <div class="source-tree" id="tree">
            <div class="filter" v-show="showDire">
                <el-input type="text" placeholder="请输入内容" @keyup.native="newName($event)" v-show="showDire" @blur="newName($event)" id="direNewName"></el-input>
            </div>
            <div class="filter" v-show="renameShow">
                <el-input placeholder="请输入内容" @keyup.native="renameV($event)" @blur="renameV($event)" v-show="renameShow" id="rename"></el-input>
            </div>
            <el-tree :data="data" :props="defaultProps" node-key="catalogId" ref="tree" highlight-current default-expand-all @node-click="handleNodeClick" :expand-on-click-node="false" :render-content="renderContent">
            </el-tree>
    
        </div>
        <div id="treemenu" v-show="menuShow">
            <ul class="treemenu">
                <li @click='newDirectory' v-show="newDire">新建目录</li>
                <li @click='createSource' v-show="creShow">创建资源</li>
                <li @click='delDirectory'>删除课程</li>
                <li @click='rename'>重命名</li>
            </ul>
        </div>
        <el-dialog title="提示" :visible.sync="RootVisible" size="tiny">
            <el-input id="rootNode" placeholder="请输入内容" autofocus value=""></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="RootVisible = false">取 消</el-button>
                <el-button type="primary" @click.native="sureIcre">确 定</el-button>
            </span>
        </el-dialog>
    
        <el-dialog title="任务" :visible.sync="IcredialogFormVisible">
            <el-form :model="icreTask" label-width="80px">
                <el-form-item label="任务名称">
                    <el-input v-model="icreTask.taskname" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="任务说明">
                    <el-input type="textarea" :rows="5" placeholder="最多输入1000个汉字" v-model="icreTask.taskintro"></el-input>
                </el-form-item>
                <el-form-item label="测评内容">
                    <el-input type="textarea" :rows="6" placeholder="最多输入1000个汉字" v-model="icreTask.taskcontent"></el-input>
                </el-form-item>
                <el-form-item label="测评标准">
                    <el-input type="textarea" :rows="6" placeholder="最多输入1000个汉字" v-model="icreTask.taskstandard"></el-input>
                </el-form-item>
                <el-form-item label="上传文件">
                    <el-upload class="upload-demo" drag action="/api/369education/yzh/education/inter/uploadFile" multiple :on-success="TaskSuccess" :on-preview="clickfile">
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或
                            <em>点击上传</em>
                        </div>
                        <!--<div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>-->
                    </el-upload>
                    <ul class="el-upload-list el-upload-list--text">
                        <li class="el-upload-list__item is-success" v-for="(list,index) in this.icreTask.taskFileList" @click="modifyfile(list)" :class="{modifyfile:list.fileActive===true}">
                            <!---->
                            <a class="el-upload-list__item-name">
                                <i class="el-icon-document"></i>{{list.fileattachname}}
                            </a>
                            <label class="el-upload-list__item-status-label">
                                <i class="el-icon-upload-success el-icon-circle-check"></i>
                            </label>
                            <i class="el-icon-close" @click="delTaskFile(list,index)"></i>
                            <!---->
                            <!---->
                        </li>
                    </ul>
    
                </el-form-item>
                <el-form-item>
                    <el-form :inline="true" class="demo-form-inline">
                        <el-form-item label="标题">
                            <el-input type="text" id="testTitle" @blur="getTitle" name="filetitle"></el-input>
                        </el-form-item>
                        <el-form-item label="缩略图">
                            <el-upload class="upload-demo" action="/api/369education/yzh/education/inter/uploadFile" :show-file-list="false" :on-success="imgHandleSuccess">
                                <el-input placeholder="点击上传" id="img-thumbnail" name='filethumbnail'></el-input>
                            </el-upload>
    
                        </el-form-item>
                    </el-form>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="IcredialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="icreTaskSource" v-show="!modifyFile">确 定</el-button>
                <el-button type="primary" @click="modifyFileSource" v-show="modifyFile">确 定</el-button>
            </div>
        </el-dialog>
        <div class="source-box">
            <div class="source-con" v-for="item in taskList" @click="addTest(taskList,item)" :class="{chioceTest:item.isActive===true}">
                <table cellspacing="10px">
                    <tr class="source-con-row">
                        <td class="source-con-row-t">任务名称：</td>
                        <td>{{item.taskname}}</td>
                    </tr>
                    <tr class="source-con-row">
                        <td>任务说明：</td>
                        <td>{{item.taskintro}}</td>
    
                    </tr>
                    <tr class="source-con-row">
                        <td>测评内容：</td>
                        <td>{{item.taskcontent}}</td>
                    </tr>
                    <tr class="source-con-row">
                        <td>测评标准：</td>
                        <td>{{item.taskstandard}}</td>
                    </tr>
                </table>
                <div class="source-con-file" v-for="list in item.taskFileList">
                    <div class="item">
                        <a :href="list.fileurl" class="source-item " :download="list.download">
                            <div class="source-img">
                                <img :src="list.filethumbnail" :alt="list.fileattachname" width="220" height="140">
                            </div>
                            <div class="mask" :style="`background:#000 url(${list.playIcon}) no-repeat 50% 50%`"></div>
                            <h3>{{list.filename}}</h3>
                        </a>
                    </div>
                </div>
                <span class="source-con-modify" @click="modifyTask(item)"></span>
                <span class="source-con-remove" @click="removeTask(item)"></span>
            </div>
        </div>
    </div>
</template>
<script>
import qs from 'qs'
import { mapGetters } from 'vuex'
const jy_url = "http://www.369college.com/369education";
export default {
    data() {
        return {
            menuShow: false,
            RootVisible: false,
            IcredialogFormVisible: false,
            creShow: true,
            newDire: true,
            showDire: false,
            renameShow: false,
            isActive: false,
            modifyFile: false,
            data: [],
            defaultProps: {
                children: 'catalogList',
                label: 'catalogName'
            },
            icreTask: {
                taskname: '',
                taskintro: '',
                taskcontent: '',
                taskstandard: ''
            },
            item: {},
            taskFileStr: {},
            fileList: [],
            treeObj: {
                data: {},
                node: '',
                obj: ''
            },
            res: {}
        }
    },
    created() {
        if (this.$route.query.source === "test") {
            this.$store.dispatch('SOURCE_HIDE');
        } else {
            this.$store.dispatch('SOURCE_ShOW');
        }
        this.getAllCatalog()
    },
    computed: {
        ...mapGetters(['sourceToggle', 'taskList', "catalogId"])
    },

    mounted() {

        this.$nextTick(() => {
            let vm = this;
            let tree = document.getElementById("tree");
            let treemenu = document.getElementById('treemenu')
            tree.oncontextmenu = function () {
                return false;
            }
            function bindEvent(elem, eventType, callback) {
                var ieType = ["on" + eventType];
                if (ieType in elem) {
                    elem[ieType] = callback;
                } else if ("attachEvent" in elem) {
                    elem.attachEvent(ieType, callback);
                } else {
                    elem.addEventListener(eventType, callback, false);
                }
            }
            function closeContextMenu() {
                return false;
            }
            function closeNewContextMenu(ev) {
                if (ev.target !== treemenu) {
                    vm.menuShow = false;
                }
            }
            bindEvent(tree, 'mouseup', function (ev) {
                if (ev.target !== tree) {
                    ev = ev || window.event;
                    var btn = ev.button;
                    if (btn == 2) {
                        treemenu.style.left = ev.clientX + "px";
                        treemenu.style.top = ev.clientY + "px";
                        vm.menuShow = true;
                        vm.nodeTarget = ev.target;
                        ev.target.click()

                    }
                }
            })
            bindEvent(document, 'click', closeNewContextMenu)
            bindEvent(treemenu, 'click', closeNewContextMenu)
            bindEvent(treemenu, 'contextmenu', closeContextMenu);
        })

    },
    methods: {
        getTitle() {
            if (JSON.stringify(this.taskFileStr) !== "{}") {
                let testTitle = document.getElementById('testTitle').getElementsByTagName("input")[0];
                this.taskFileStr['fileName'] = testTitle.value;
            } else {
                 this.$alert('请选择要修改的文件', '提示信息', {
                        confirmButtonText: '确定',
                    });
            }

        },
        clickfile(file) {
            // console.log(file)
        },
        TaskSuccess(res, file) {
            let testTitle = document.getElementById('testTitle').getElementsByTagName("input")[0];
            let imgThumbnail = document.getElementById('img-thumbnail').getElementsByTagName("input")[0];
            if (res.success === true) {
                this.res = res;
                this.taskFileStr.fileAttachName = file.name;
                this.taskFileStr.fileUrl = res.filePath;
                testTitle.value = "";
                imgThumbnail.value = "";
            }

        },
        imgHandleSuccess(res, file) {
            let taskFileStr = {};
            let url = "http://115.182.107.198/";
            let imgThumbnail = document.getElementById('img-thumbnail').getElementsByTagName("input")[0];
            if (res.success === true && JSON.stringify(this.res) !== "{}") {
                this.taskFileStr.fileThumbnail = res.filePath;
                imgThumbnail.value = file.name;
                taskFileStr["fileName"] = this.taskFileStr.fileName;
                taskFileStr["fileAttachName"] = this.taskFileStr.fileAttachName;
                taskFileStr["fileThumbnail"] = this.taskFileStr.fileThumbnail;
                taskFileStr["fileUrl"] = this.taskFileStr.fileUrl;
                if (this.modifyFile === true) {
                    taskFileStr['fileMethod'] = "C";
                }
                this.fileList.push(taskFileStr)
            } else {
                this.taskFileStr.filethumbnail = url + res.filePath;
                imgThumbnail.value = file.name;

            }
        },
        async modifyFileSource() {
            let taskFile = {};
            taskFile['fileId'] = this.taskFileStr['fileId'];
            taskFile['fileName'] = this.taskFileStr['fileName'];
            taskFile['fileThumbnail'] = this.taskFileStr['filethumbnail'];
            taskFile['fileUrl'] = this.taskFileStr['fileurl'];
            taskFile['fileAttachName'] = this.taskFileStr['fileattachname'];
            taskFile['fileMethod'] = "U";
            this.fileList.push(taskFile);
            await this.modifyTaskSource();
        },
        modifyTaskSource() {
            this.$http.post("/api/369education/yzh/education/inter/updateTask", qs.stringify({
                userid: sessionStorage.getItem("keyId"),
                accesstoken: sessionStorage.getItem("keyToken"),
                taskId: this.icreTask.taskid,
                taskName: this.icreTask.taskname,
                taskIntro: this.icreTask.taskintro,
                testContent: this.icreTask.taskcontent,
                testStandard: this.icreTask.taskstandard,
                taskFileStr: JSON.stringify(this.fileList)
            })).then(res => {
                if (res.data.updateTaskFlag === "success") {
                    this.$alert('修改成功', '提示信息', {
                        confirmButtonText: '确定',
                    });
                    this.IcredialogFormVisible = false;
                    this.$store.dispatch("GET_TASKLIST", this.catalogId);
                }
            })
        },
        getAllCatalog() {
            this.$http.get(jy_url + "/yzh/education/inter/getAllCatalog?userid=" + sessionStorage.getItem("keyId") + "&accesstoken=" + sessionStorage.getItem("keyToken")).then(res => {
                this.data = res.data.catalogList;
            })
        },
        sureIcre() {
            let rootNode = document.getElementById("rootNode").getElementsByTagName('input')[0].value;
            if (rootNode !== "") {
                this.$http.post(jy_url + "/yzh/education/inter/addPXCatalog", qs.stringify({
                    userid: sessionStorage.getItem("keyId"),
                    accesstoken: sessionStorage.getItem("keyToken"),
                    catalogName: rootNode,
                })).then(res => {
                    if (res.data.addCatalogFlag === "success") {
                        let obj = {
                            id: '',
                            label: rootNode,
                            children: []
                        }
                        this.data.push(obj)
                        this.getAllCatalog()
                    }
                })
            }
            this.RootVisible = false;
        },
        newDirectory() {
            let direNewName = document.getElementById('direNewName')
            let currentNode = document.getElementsByClassName('is-current')[0];
            let direInput = direNewName.getElementsByTagName('input')[0];
            setTimeout(function () {
                direInput.focus();
            }, 10);
            currentNode.appendChild(direNewName)
            this.showDire = true;
        },
        newName(ev) {
            let direInput = document.getElementById('direNewName').getElementsByTagName('input')[0];
            if (ev.keyCode === 13 || (ev.type === "blur" && ev.keyCode !== 13)) {
                if (direInput.value !== "") {
                    let nodeData = { catalogId: '', catalogName: direInput.value, catalogList: [] };
                    this.$http.post(jy_url + "/yzh/education/inter/addPXCatalog", qs.stringify({
                        userid: sessionStorage.getItem("keyId"),
                        accesstoken: sessionStorage.getItem("keyToken"),
                        catalogName: direInput.value,
                        catalogPid: this.treeObj.data.catalogId
                    })).then(res => {
                        if (res.data.addCatalogFlag === "success") {
                            this.$refs.tree.store.append(nodeData, this.treeObj.data);
                            this.getAllCatalog();
                        }
                    })
                }
                direInput.value = "";
                this.showDire = false;

            }
        },
        delDirectory() {
            this.$http.post(jy_url + "/yzh/education/inter/deletePXCatalog", qs.stringify({
                userid: sessionStorage.getItem("keyId"),
                accesstoken: sessionStorage.getItem("keyToken"),
                catalogId: this.treeObj.data.catalogId,
            })).then(res => {
                if (res.data.deleteCatalogFlag === "success") {
                    this.$refs.tree.store.remove(this.treeObj.data)
                    this.getAllCatalog()
                }
            })
        },

        rename() {
            let rename = document.getElementById('rename')
            let currentNode = document.getElementsByClassName('is-current')[0];
            let renameVal = rename.getElementsByTagName('input')[0];
            renameVal.value = this.treeObj.node.label;
            setTimeout(function () {
                renameVal.focus();
                renameVal.select();
            }, 10);
            this.preappend(rename, currentNode);
            this.renameShow = true;
        },
        preappend(node, scope) {
            if (node.nodeType === 1 || node.nodeType === 9 || node.nodeType === 11) {
                scope.insertBefore(node, scope.firstChild);
            }

        },
        renameV(ev) {
            let renameVal = document.getElementById('rename').getElementsByTagName('input')[0].value;
            if (ev.keyCode === 13 || ev.type === "blur") {
                if (renameVal !== "") {
                    this.$http.post(jy_url + "/yzh/education/inter/updatePXCatalogName", qs.stringify({
                        userid: sessionStorage.getItem("keyId"),
                        accesstoken: sessionStorage.getItem("keyToken"),
                        catalogName: renameVal,
                        catalogId: this.treeObj.data.catalogId
                    })).then(res => {
                        if (res.data.updateCatalogFlag === "success") {
                            this.getAllCatalog();
                        }
                    })
                }
                this.renameShow = false;

            }
        },
        createSource() {
            this.IcredialogFormVisible = true;
            this.icreTask = {};
            this.modifyFile = false;
        },
        icreTaskSource() {

            this.$http.post("/api/369education/yzh/education/inter/addTask", qs.stringify({
                userid: sessionStorage.getItem("keyId"),
                accesstoken: sessionStorage.getItem("keyToken"),
                catalogId: this.treeObj.data.catalogId,
                taskName: this.icreTask.taskname,
                taskIntro: this.icreTask.taskintro,
                testContent: this.icreTask.taskcontent,
                testStandard: this.icreTask.taskstandard,
                taskFileStr: JSON.stringify(this.fileList)
            })).then(res => {
                if (res.data.addTaskFlag === "success") {
                    this.IcredialogFormVisible = false;
                    this.$alert('添加成功', '提示信息', {
                        confirmButtonText: '确定',
                    });
                    this.$store.dispatch("GET_TASKLIST", this.treeObj.data.catalogId)
                }
            })
        },

        modifyTask(item) {
            this.IcredialogFormVisible = true;
            this.fileList = [];
            this.modifyFile = true;
            this.icreTask = item;
        },
        modifyfile(file) {
            this.icreTask.taskFileList.forEach(elem => {
                elem.fileActive = false;
            })
            file.fileActive = true;
            this.taskFileStr = file;
        },
        delTaskFile(file, index) {
            let taskFile = {};
            this.icreTask.taskFileList.forEach(elem => {
                if (elem.fileId === file.fileId) {
                    this.icreTask.taskFileList.splice(index, 1)
                }
            })
            taskFile["fileId"] = file.fileId;
            taskFile['fileMethod'] = "D";
            this.fileList.push(taskFile)
        },
        removeTask(item) {
            this.$confirm('确认删除吗？').then(_ => {
                this.$http.post("/api/369education/yzh/education/inter/deleteTask", qs.stringify({
                    userid: sessionStorage.getItem("keyId"),
                    accesstoken: sessionStorage.getItem("keyToken"),
                    catalogid: this.treeObj.data.catalogId,
                    taskid: item.taskid
                })).then(res => {
                    if (res.data.deleteTaskFlag === "success") {
                        this.$alert('删除成功', '提示信息', {
                            confirmButtonText: '确定',
                        });
                        this.$store.dispatch("GET_TASKLIST", this.treeObj.data.catalogId)
                    }
                })
            }).catch(_ => { });
        },
        addTest(taskList, item) {
            if (this.sourceToggle === false) {
                taskList.forEach((elem) => {
                    this.$set(elem, 'isActive', false)
                });
                item.isActive = true;
                this.item = item;
            }
        },
        saveTest() {
            if (this.$route.query.update === "true") {
                let testQD = JSON.parse(this.$route.query.updateTest);
                testQD['taskFileList'] = this.item['taskFileList'];
                testQD['testcontent'] = this.item['taskcontent'];
                testQD['testintro'] = this.item['taskintro'];
                testQD['testname'] = this.item['taskname'];
                testQD['teststandard'] = this.item['taskstandard'];
                testQD['taskid'] = this.item['taskid'];
                this.$router.push({ path: "addtest", query: { update: 'true', updateTest: JSON.stringify(testQD) } })
            } else {
                this.$router.push({ path: "addtest", query: { taskinfo: JSON.stringify(this.item), classList: this.$route.query.classList, courseid: this.$route.query.courseid } })
            }
        },
        handleNodeClick(data, node, obj) {
            this.treeObj.data = data;
            this.treeObj.node = node;
            this.treeObj.obj = obj;
            if (this.treeObj.node.level < 4 && this.treeObj.data.taskFlag === "N") {
                this.newDire = true;
                this.creShow = true;
            } else if (this.treeObj.node.level == 4) {
                this.newDire = false;
                this.creShow = true;
            }
            if (this.treeObj.data.taskFlag !== "N") {
                this.newDire = false;
                this.creShow = false;
            }
            this.$store.dispatch("GET_TASKLIST", data.catalogId)

        },
        renderContent: function (createElement, { node, data, store }) {
            var self = this;
            return createElement('el-tooltip', {
                attrs: {
                    effect: "dark",
                    content: node.label,
                    placement: "bottom-end"
                }
            }, [
                    createElement('span', node.label)
                ])
        }
    }
};
</script>
<style lang='less' scoped>
#source {
    .source-head {
        height: 74px;
        width: 100%;
        border-bottom: 1px solid #e8e8e8;
        position: fixed;
        overflow: hidden;
        background: #fff;
        z-index: 999;
        &-incre {
            width: 20%;
            padding: 17px 0 17px 14px;
            background-color: #f6f6f6;
            border-bottom: 1px solid #e8e8e8;
            float: left;
        }
        &-title {
            float: left;
            font-size: 18px;
            color: #44aee0;
            padding-left: 25px;
            line-height: 74px;
        }
        &-editor {
            float: right;
            padding-right: 15%;
            margin-top: 17px;
        }
    }
    .source-tree {
        position: fixed;
        top: 0;
        bottom: 0;
        padding-top: 125px;
        overflow-y: scroll;
        .el-tree {
            border: none;
            background-color: #f6f6f6; //    .el-tree-node.el-tree-node__content {
            //         text-overflow: ellipsis;
            //         overflow: hidden;
            //         white-space: nowrap;
            //     }
        }

        width: 20%;
        padding-left: 14px;
        background-color: #f6f6f6;
        #rename {
            position: absolute;
            z-index: 9999;
        }
        .filter {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0; // z-index: 1000;
            background-color: rgba(209, 219, 229, .5);
            #direNewName {
                position: relative;
                z-index: 9999;
            }
        }
    }
    #treemenu {
        width: 144px;
        line-height: 34px;
        background-color: #ffffff;
        position: fixed;
        border: 1px solid #8ecde7;
        box-shadow: 2px 2px 3px #aaaaaa;
        z-index: 1000;
        padding: 10px 0;
    }

    #treemenu li {
        height: 34px;
        padding-left: 15px;
        cursor: pointer;
    }
    #treemenu li:hover {
        background-color: #edf7ff;
    }
    .chioceTest {
        border: 1px solid orange;
    }
    .source-box {
        padding-top: 75px;
        margin-left: 23%;
        .source-con {
            width: 80%;
            float: left;
            padding: 15px;
            position: relative;
            &-modify {
                top: 20px;
                right: 86px;
                position: absolute;
                width: 32px;
                height: 32px;
                background-size: cover;
                background-image: url(../../assets/images/modify.png);
                cursor: pointer;
            }
            &-remove {
                top: 20px;
                right: 44px;
                position: absolute;
                width: 26px;
                height: 26px;
                background-size: cover;
                background-image: url(../../assets/images/remove.png);
                cursor: pointer;
            }
            &-row {
                font-size: 16px;
                color: #111111;
                min-height: 70px;
                td:first-child {
                    min-width: 80px;
                    text-align: right;
                }
                &-t {
                    padding-left: 6px;
                    border-left: 5px solid #0491cd;
                }
            }
            &-file {
                .item {
                    margin: 20px;
                    float: left;
                    text-align: center;
                    h3 {
                        line-height: 50px;
                        color: #4d4d4d;
                    }
                }
                .source-item {
                    display: block;
                    position: relative;
                }
                .source-item:hover .mask {
                    transition: opacity .2s;
                    opacity: .3;
                    filter: alpha(opacity=30);
                }
                .source-item .source-img {
                    overflow: hidden;
                    width: 220px;
                    height: 140px;
                }
                .source-item img {
                    transition: transform .4s;
                }
                .source-item:hover img {
                    transform: scale(1.2);
                }

                .mask {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 220px;
                    height: 140px;
                    opacity: 0;
                    filter: alpha(opacity=0);
                }
            }
        }
    }
}

.modifyfile {
    background: #eef1f6;
}
</style>
