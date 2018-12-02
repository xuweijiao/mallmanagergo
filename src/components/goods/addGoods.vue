<template>
<el-card>
  <!-- 面包屑 -->
  <my-bread level1="商品管理" level2="商品列表"></my-bread>
  <!-- alert警告 -->
  <el-alert style="margin:10px 0;" title="添加商品信息" type="success" center show-icon>
  </el-alert>
  <!-- 步骤条 -->
  <el-steps :active="active" finish-status="success">
    <el-step title="基本信息"></el-step>
    <el-step title="商品参数"></el-step>
    <el-step title="商品属性"></el-step>
    <el-step title="商品图片"></el-step>
    <el-step title="商品内容"></el-step>
  </el-steps>
  <!-- tab切换 -->
  <el-tabs tab-position="left" style="height:200px;margin:20px 0;">
    <el-tab-pane label="用户管理">用户管理</el-tab-pane>
    <el-tab-pane label="配置管理">配置管理</el-tab-pane>
    <el-tab-pane label="角色管理">角色管理</el-tab-pane>
    <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
  </el-tabs>
</el-card>
</template>

<script>
export default {
  data() {
    return {
      active: 1
    }
  }
}
</script>

<style>
.el-steps {
  margin: 0 60px;
}

.el-step__title {
  font-size: 10px;
}
</style>
