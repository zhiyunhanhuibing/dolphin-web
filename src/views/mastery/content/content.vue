<template>
    <div>
        <el-button type="primary" style="float:right;" @click="add()">添加</el-button>
        <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">
          <el-table-column type="index" :index="indexMethod" label="序号" width="100"></el-table-column>
          <el-table-column prop="abbreviation" label="名称" width="250"></el-table-column>
          <el-table-column prop="zip" label="主图名称" width="180"></el-table-column>
          <el-table-column prop="createTime" label="发布时间" width="180"></el-table-column>
          <!-- <el-table-column prop="tag" label="显示顺序" width="200"></el-table-column> -->
          <el-table-column prop="tag" label="设置在首页" width="200">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">设置</el-button>
            </template>
          </el-table-column>
          <el-table-column label="详情" width="200">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
  name :'content'

}
</script>
