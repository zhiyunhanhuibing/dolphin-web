<template>
  <div class="">
        <div>
          <!-- 表单 -->
          <el-form :inline="true" :model="formInline" class="demo-form-inline" style="margin-top:10px;margin-left:10px;" >
            <el-form-item >
              <el-input placeholder="请输入公司名称" v-model="formInline.name"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="query()">查询</el-button>
            </el-form-item>
          </el-form>
          <!-- 表格 -->
          <div >
            <el-table :data="tableData" style="width: 95%;margin: 0 auto;" :row-class-name="tableRowClassName">
              <el-table-column type="index" width="50"></el-table-column>
              <el-table-column prop="name" label="姓名" width="100"></el-table-column>
              <el-table-column prop="tel" label="联系电话" width="140"></el-table-column>
              <el-table-column prop="post" label="职位" width="120"></el-table-column>
              <el-table-column prop="company" label="公司" width="150"></el-table-column>
              <el-table-column prop="area" label="地区" width="120"></el-table-column>
              <el-table-column prop="email" label="邮箱" width="200"></el-table-column>
              <el-table-column prop="createTime" label="日期" width="150" :formatter="dateFormat"></el-table-column>
              <el-table-column prop="problem" label="咨询与反馈问题" width="160"></el-table-column>
            </el-table>
          </div>
          <!-- 分页 -->
          <div class="block">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage4"
                    :page-size="pageSize"
                    layout="total, prev, pager, next"
                    :total="totalSize">
            </el-pagination>
          </div>
        </div>
  </div>
</template>
<script>
  import moment from "moment";
  import {selectAll,query} from '@/api/mastery/customer'
  export default {
    data() {
      return {
        currentPage4:1,
        totalSize:1,
        pageSize:8,
        page:1,
        formInline:{
          name:'',
        },
        tableData: []

      };
    },
    created(){
      this.getData()
    },
    components:{
    },
    methods: {
      // 转换获取时间
      dateFormat: function(row, column) {
        var data = row[column.property];
        if (data == undefined) {
          return "";
        }
        return moment(data).format("YYYY-MM-DD");
      },
      //每页条数
      handleSizeChange(val) {
        this.pageSize= val;
        this.getData();
      },
      //点击获取当前页
      handleCurrentChange(val) {
        this.page= val;
        this.getData();
      },
      //获取数据
      getData(){
        let param = {
          rows:this.pageSize,
          page:this.pages
        }
        selectAll(param).then((res) => {
          this.tableData = res.resultList;
          this.totalSize = res.resultList.length;

        })
      },
      //查询接口
      query(){
        let params = {
          mohu:this.formInline.name
        }
        selectAll(params).then((res) => {
          this.tableData = res.resultList;
        })
      },

      tableRowClassName({ row, rowIndex }) {
        if (rowIndex === 1) {
          return "warning-row";
        } else if (rowIndex === 3) {
          return "success-row";
        } else if(rowIndex === 5){
          return "warning-row";
        }
        return "";
      }
    }
  };
</script>