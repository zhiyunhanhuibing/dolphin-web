<template >
  <div style="padding:30px;">
    <el-alert :closable="false" title="客户垂询数据" type="success">
      <router-view />
    </el-alert>
  </div>
</template>