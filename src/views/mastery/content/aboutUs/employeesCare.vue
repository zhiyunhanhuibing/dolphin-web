<template>
  <div class="">
    <div class="">
      <div style="width:100%">
            <el-button type="primary" style="float:right;margin:15px 15px 0 0 ;" @click="add()">添加</el-button>
            <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">
              <el-table-column align='center' type="index" label="序号" width="200"></el-table-column>
              <el-table-column align='center' prop="articleTitle" label="文章名称" width="270"></el-table-column>
              <el-table-column align='center' prop="abbreviation" label="简称" width="270"></el-table-column>
              <el-table-column align='center' prop="createTime" label="发布时间" :formatter="dateFormat" width="150"></el-table-column>
              <el-table-column align='center' prop="tag" label="设置在首页" width="200">
                <template slot-scope="scope">
                  <span v-if="scope.row.status == 1">已在首页显示</span>
                  <el-button
                    size="mini"
                    @click="shezhi(scope.$index, scope.row)"
                    v-if="scope.row.status != 1"
                  >设置</el-button>
                  <el-button
                    size="mini"
                    v-if="scope.row.status == 1"
                    @click="chongzhi(scope.$index, scope.row)"
                  >重制</el-button>
                </template>
              </el-table-column>
              <el-table-column align='center' label="详情">
                <template slot-scope="scope">
                  <!-- <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button> -->
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)"
                  >删除</el-button>
                </template>
              </el-table-column>
            </el-table>
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
    </div>
    <el-dialog title="详情页编写" append-to-body :visible.sync="dialogVisible" :close-on-click-modal="false" width="70%">
      <div>
        <fwb :categoryId="this.categoryId" :showdialg="this.dialogVisible" @par="par" @entryshow="entryshow" @entrydis="entrydis"></fwb>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="yes()" :disabled="ENTRYDIS">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="详情修改" append-to-body :visible.sync="dialog1" :close-on-click-modal="false" width="70%">
      <ueditor :mondify="this.mondifyForm"></ueditor>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog1 = false">取 消</el-button>
        <el-button type="primary" @click="dialog1 = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog append-to-body :visible.sync="dialog2">
      <span>是否在首页展示</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="fou()">否</el-button>
        <el-button type="primary" @click="shi()">是</el-button>
      </span>
    </el-dialog>
    <el-dialog append-to-body :visible.sync="dialog3">
      <span>是否重制</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="fou1()">否</el-button>
        <el-button type="primary" @click="shi1()">是</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import fwb from "@/views/mastery/content/richText";
import moment from "moment";
import ueditor from "@/views/mastery/content/ueditor";
import {Query,Modify,Add,Remove} from '@/api/mastery/solution'
export default {
  data() {
    return {
      ENTRYDIS: true,
      pary:{},
      currentPage4:1,
      totalSize:1,
      pageSize:8,
      page:1,
      mondifyForm: {},
      categoryId: "",
      activeName: "one",
      dialogVisible: false,
      dialog1: false,
      dialog2: false,
      dialog3: false,
      she: {},
      she1: {},
      tabT: {},
      tableData: [{}],
      parmas1:[],
      businessId:'',
      imgCategory: ["220","240","230"]
    };
  },
  components: {
    fwb,
    ueditor
  },
  created() {
    this.getData(210);
  },
  methods: {
    entrydis(data) {
      this.ENTRYDIS = data
    },
    entryshow(data) {
      this.dialogVisible = data
      if (!data) {
        this.getData(210);
      }
    },
    par(data){
      this.pary=data
      var json =[]
    for(let i in this.pary.realName){
      var j={};
      j['businessId'] = this.pary.businessId;
      j['categoryId'] = this.imgCategory[i];
      j['realName'] = this.pary.realName[i];
      j['uploadName'] = this.pary.uploadName[i];
      j['url'] = this.pary.url[i];
      json.push(j);
    }
     var a = json;  
     this.parmas1 =a      
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.getData()
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getData()
      console.log(`当前页: ${val}`);
    },
    // 转换获取时间
    dateFormat: function(row, column) {
      var data = row[column.property];
      if (data == undefined) {
        return "";
      }
      return moment(data).format("YYYY-MM-DD");
    },
    shezhi(index, row) {
      console.log(index, row);
      this.she = row.articleId;
      this.dialog2 = true;
    },
    fou() {
      this.dialog2 = false;
    },
    shi(index, row) {
      var that = this;
      let params = {
        status: 1,
        articleId: this.she
      }
      Modify(params).then(res => {
          this.getData()
      });
      this.dialog2 = false;
    },
    fou1() {
      this.dialog3 = false;
    },
    shi1() {
      let params = {
        status: 0,
        articleId: this.she1
      }
      Modify(params).then(res => {this.getData()});
      this.dialog3 = false;
    },
    chongzhi(index, row) {
      console.log(index, row);
      this.she1 = row.articleId;
      this.dialog3 = true;
    },
    yes() {
      Add(this.parmas1).then((res) => {
      })
      this.dialogVisible = false;
      this.getData()
    },
    add() {
      this.ENTRYDIS = true;
      this.dialogVisible = true;
    },
    getData() {
      Query(210,this.pageSize,this.page)
      .then(res => {
        console.log(res);
        this.tableData = res.resultList;
          this.totalSize = res.totalSize;
          this.categoryId = 210;
      });
    },
    handleClick(tab, event) {
      console.log(tab, event);
      this.tabT = tab;
      let name =tab.name;
      tab["one"] =50,
      tab["two"] =70,
      tab["three"] =60,
      tab["four"] =80,
      tab["five"] =90,
      tab["sex"] =100,
      tab["seven"] =110,
      tab["eight"] =120,
      tab["ten"] =130,
      tab["ten1"] =140,
      tab["ten2"] =150,
      tab["ten3"] =160,
      tab["ten4"] =170,
      tab["ten5"] =180,
      tab["ten6"] =190,
      tab["ten7"] =210,
      this.getData(tab[name])
    },
    indexMethod(index) {
      return index * 1;
    },
    handleEdit(index, row) {
      this.mondifyForm = row;
      console.log(this.mondifyForm);
      this.dialog1 = true;
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
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
          Remove(row.articleId).then(res => {
              this.getData(row.categoryId)
            })
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
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      } else if (rowIndex === 5) {
        return "warning-row";
      }
      return "";
    }
  }
};
</script>
<style scoped>
.block {
  float: right;
}
.xianshi {
  display: none;
}
.con {
  width: 100%;
}
.tab {
  width: 1150px;
  overflow-x: hidden;
  overflow-y: scroll;
  padding: 10px;
}
.tab::-webkit-scrollbar {
  display: none;
}
.el-tabs__item {
  font-size: 16px;
  color: gray;
  padding: 0 40px;
}
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
.left li {
  list-style: none;
  text-align: center;
  height: 60px;
  line-height: 60px;
  color: aliceblue;
  margin-top: 20px;
}
.header {
  width: 100%;
  height: 60px;
  line-height: 60px;
  /* background: linear-gradient(right,#1ba784, #45b787);  */
  background: #5698c3;
  color: aliceblue;
  display: flex;
}
.header img {
  width: 12%;
  padding: 3px;
}
.header p {
  width: 78%;
  text-align: center;
}
.nairong {
  height: 100%;
  padding: 20px;
}
.box {
  height: 100%;
  display: flex;
}
.content {
  width: 100%;
  height: 100%;
}
.left {
    height: 100%;
  /* min-width: 200px;
  height: calc(100vh - 60px);
  background: #5698c3; */
  /* height: 100%; */
  /* background: linear-gradient(top,#45b787, #1a6840);  */

  /* background: #1ba784; */
}
.left ul {
  height: 100%;
  /* list-style: none;
  text-align: center;
  height: 60px;
  line-height: 60px;
  color: aliceblue;
  margin-top: 20px; */
}
.left :hover {
  /* background: #2f90b9; */
}
</style>
