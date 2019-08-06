<template>
  <div class="content">
    <div style="height:100%;">
        <div class="content-article">
            <el-button type="primary" size="small" style="float:right;margin:15px 15px 0 0 ;" @click="push()">添加</el-button>
            <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">
                <el-table-column align='center' type="index" label="序号" width="200"></el-table-column>
                <el-table-column align='center' prop="fileTitle" label="图片名称" width="250"></el-table-column>
                <el-table-column align='center' prop="fileSort" label="图片顺序" width="200"></el-table-column>
                <el-table-column align='center' prop="createTime" label="发布时间" :formatter="dateFormat" width="180"></el-table-column>
                <el-table-column align='center' prop="tag" label="状态" width="200"></el-table-column>
                <el-table-column align='center' label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">替换</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage4"
              :page-size="pageSize"
              layout="total, prev, pager, next"
              :total="totalSize"
            ></el-pagination>
        </div>
    </div>
    <!-- 弹框-->
    <el-dialog :visible.sync="dialog">
      <el-form
        :model="formInline"
        :rules="rules"
        class="demo-form-inline"
        ref="formInline1"
        :inline="true"
      >
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="图片名称：" prop="fileTitle">
              <el-input v-model="formInline.fileTitle" placeholder="图片名称:" style="width:250px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="图片顺序：" prop="fileSort">
              <el-input v-model="formInline.fileSort" placeholder="图片顺序:" style="width:250px"></el-input>
              <!-- <el-table-column  label="发布时间" :formatter="dateFormat" width="180"></el-table-column> -->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="6">
            <el-upload
              :class="{hide:hideUpload}"
              :action="actions"
              list-type="picture-card"
              accept="image/*"
              :limit="imgLimit"
              :file-list="productImgs"
              :multiple="isMultiple"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              :on-exceed="handleExceed"
              :on-error="imgUploadError"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt>
            </el-dialog>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog =false">取消</el-button>
        <el-button type="primary" @click="postUpdata()">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialog1" :inline="true">
      <el-form :model="mondify" class="demo-form-inline" ref="formInline1" :inline="true">
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item label="图片名称：">
              <el-input v-model="mondify.fileTitle" placeholder="图片名称:" style="width:250px"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="图片顺序：">
              <el-input v-model="mondify.fileSort" placeholder="图片顺序:" style="width:250px"></el-input>
              <!-- <el-table-column  label="发布时间" :formatter="dateFormat" width="180"></el-table-column> -->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="6">
            <el-upload
              :class="{hide:hideUpload}"
              :action="actions"
              list-type="picture-card"
              accept="image/*"
              :limit="imgLimit"
              :file-list="productImgs1"
              :multiple="isMultiple"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              :on-exceed="handleExceed"
              :on-error="imgUploadError"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt>
            </el-dialog>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog1 =false">取消</el-button>
        <el-button type="primary" @click="postUpdata1()">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
    import request from '@/utils/request'
    import { queryArticle } from '@/api/mastery'
    // import moment from "moment";
    // import menu1 from '@/components/menu.vue'
    export default {
    data() {
        return {
        collapsed: true,
        hideUpload: false,
        limitCount: 1,
        currentPage4: 1,
        totalSize: 1,
        pageSize: 8,
        page: 1,
        actions: "/plat/upload/uploadFile",
        dialogImageUrl: "",
        dialogVisible: false,
        productImgs: [],
        productImgs1: [],
        isMultiple: true,
        imgLimit: 1,
        fileList2: [],
        formInline: {
            fileTitle: "",
            fileSort: ""
        },
        url: "",
        fileOldName: "",
        fileUploadName: "",
        uploadUrl: "",
        tabT: {},
        mondify: {
            fileTitle: "",
            fileSort: ""
        },
        fileId: "",
        categoryId: "",
        categoryId1: "",
        activeName: "first",
        dialog: false,
        dialog1: false,
        tableData: [],
        tableData1: [],
        tableData2: [],
        tableData3: [],
        rules: {
            fileTitle: [
            { required: true, message: "请输入图片名称", trigger: "blur" }
            ],
            fileSort: [
            { required: true, message: "请输入图片顺序", trigger: "blur" }
            ]
        },
        iiii: "first",
        firstloadId: 10
        };
    },
    created() {
        this.getData();
    },
    methods: {
        toggle(showtype) {
        this.collapsed = !showtype;
        // this.$root.Bus.$emit('toggle', this.collapsed)
        },
        handleOpen(key, keyPath) {
        console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
        console.log(key, keyPath);
        },

        handleSizeChange(val) {
        console.log(this.tabT.name);
        console.log(`每页 ${val} 条`);
        this.pageSize = val;
        this.getData();
        },
        handleCurrentChange(val) {
        console.log(this.tabT.name);
        this.page = val;
        this.getData();
        console.log(`当前页: ${val}`);
        },
        handleRemove(file, fileList) {
        this.hideUpload = fileList.length >= this.limitCount;
        //移除图片
        console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
        //预览图片时调用
        console.log(file);
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
        },

        beforeAvatarUpload(file) {
        //文件上传之前调用做一些拦截限制
        console.log(file);
        const isJPG = true;
        // const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        // if (!isJPG) {
        //   this.$message.error('上传头像图片只能是 JPG 格式!');
        // }
        if (!isLt2M) {
            this.$message.error("上传图片大小不能超过 2MB!");
        }
        return isJPG && isLt2M;
        },
        handleAvatarSuccess(res, file, fileList) {
        this.hideUpload = fileList.length >= this.limitCount;
        //图片上传成功
        console.log(res);
        (this.fileOldName = res.fileOldName),
            (this.fileUploadName = res.fileUploadName),
            (this.uploadUrl = res.uploadUrl),
            console.log(file.raw);
        this.imageUrl = URL.createObjectURL(file.raw);
        },
        handleExceed(files, fileList) {
        //图片上传超过数量限制
        this.$message.error("上传图片不能超过1张!");
        console.log(file, fileList);
        },
        imgUploadError(err, file, fileList) {
        this.hideUpload = fileList.length >= this.limitCount;
        //图片上传失败调用
        console.log(err);
        this.$message.error("上传图片失败!");
        },
        // 转换获取时间
        // dateFormat: function(row, column) {
        // var data = row[column.property];
        // if (data == undefined) {
        //     return "";
        // }
        // return moment(data).format("YYYY-MM-DD");
        // },
        getData() {
          queryArticle(10,this.pageSize,this.page).then(res => {
            console.log(res)
            this.tableData = res.resultList;
            this.categoryId = 10;
            this.totalSize = res.data.totalSize;
          }).catch(err => {
            console.log(err);
            });
        },

        postUpdata() {
        // this.getData(this.iiii);
        // console.log(this.iiii);
        this.dialog = false;
        axios
            .post("/plat/file/add", {
            fileTitle: this.formInline.fileTitle,
            fileSort: this.formInline.fileSort,
            categoryId: 10,
            fileId: this.fileId,
            realName: this.fileOldName,
            uploadName: this.fileUploadName,
            url: this.uploadUrl
            })
            .then(res => {
            console.log(res);
            if (res.status == 200) {
                this.$message({
                message: "恭喜你，添加成功",
                type: "success"
                });
            }
            this.getData();
            })
            .catch(err => {
            console.log(err);
            });
        },
        postUpdata1() {
        (this.dialog1 = false),
            axios
            .post("/plat/file/add", {
                fileTitle: this.mondify.fileTitle,
                fileSort: this.mondify.fileSort,
                categoryId: this.categoryId1,
                fileId: this.fileId,
                realName: this.fileOldName,
                uploadName: this.fileUploadName,
                url: this.uploadUrl
            })
            .then(res => {
                console.log(res);
                if (res.status == 200) {
                this.$message({
                    message: "恭喜你，修改成功",
                    type: "success"
                });
                }
                this.getData(categoryId);
            })
            .catch(err => {
                console.log(err);
            });
        },
        //添加轮播图
        push() {
        this.dialog = true;
        },
        indexMethod(index) {
        return index * 1;
        },
        handleEdit(index, row) {
        console.log(index);
        (this.dialog1 = true), (this.mondify = row);
        this.fileId = row.fileId;
        // this.productImgs1["url"]=row.url;
        this.categoryId1 = row.categoryId;
        let image = {};
        image["url"] = row.url;
        // this.productImgs1='',
        this.productImgs1 = Array(image);
        console.log(index, row);
        },
        handleDelete(index, row) {
        // console.log(this.tabT.name);
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
        })
            .then(() => {
            this.$message({
                type: "success",
                message: "删除成功!"
            });
            axios
                .get("/plat/file/delete?fileId=" + row.fileId, {
                // fileId: row.fileId
                })
                .then(res => {
                // if (name == 'first')

                // this.getData(name)
                // console.log(this.getData(name))
                let categoryId = row.categoryId;
                // console.log(categoryId)
                // var tab = [];
                // tab["first"] = 10;
                // tab["second"] = 20;
                // tab["third"] = 30;
                // tab["fourth"] = 40;
                this.getData(categoryId);

                // console.log(this.iiii)
                // this.getData(this.iiii)
                })
                // this.$route.go(0)
                .catch(err => {
                console.log(err);
                });
            })
            .catch(() => {
            this.$message({
                type: "info",
                message: "已取消删除"
            });
            });
        },
        handleRemove(file, fileList) {
        this.hideUpload = fileList.length >= this.limitCount;
        console.log(file, fileList);
        },
        handlePreview(file) {
        console.log(file);
        },

        handleClick(tab, event) {
        // console.log(tab.name);

        // this.tabT = tab;
        // if (tab.name == "first" || undefined) {
        //   this.categoryId == 10
        // } else if (tab.name == "second") {
        //   this.categoryId == 20
        // } else if (tab.name == "third") {
        //   this.categoryId == 30
        // } else if (tab.name == "fourth") {
        //   this.categoryId == 40
        // }
        // var tabValue = {

        // };

        // console.log('tag aaa ', tab)
        let name = tab.name;
        // if (name == 'first')

        // this.getData(name)
        // console.log(this.getData(name))

        tab["first"] = 10;
        tab["second"] = 20;
        tab["third"] = 30;
        tab["fourth"] = 40;
        // this.categoryId = tab[name];
        // console.log(this.categoryId);
        this.getData(tab[name]);
        // console.log(this.getData(tab[name]))

        // let curiIndex = 'a'

        // console.log(this.iiii)

        // console.log();
        // console.log(tab);
        },
        handleExceed(files, fileList) {
        console.log(files, fileList);
        this.$message.warning(
            `当前限制选择 1 个文件，本次选择了 ${
            files.length
            } 个文件，共选择了 ${files.length + fileList.length} 个文件`
        );
        },
        beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${file.name}？`);
        },
        tableRowClassName({ row, rowIndex }) {
        if (rowIndex === 1) {
            return "warning-row";
        } else if (rowIndex === 3) {
            return "success-row";
        }
        return "";
        }
    }
    };
</script>
<style>
.block{
    float: right;
    margin-top: 10px;
}
</style>

