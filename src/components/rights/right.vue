<template>
<el-card>
  <!-- 面包屑 -->
  <my-bread level1="权限管理" level2="权限列表"></my-bread>
  <!-- 权限列表 -->
  <el-table :data="tableData" style="width: 100%" height="450px" border stripe>
    <!-- type=index属于element表格自定义索引 -->

    <el-table-column header-align="center" align="center" type="index" label="#"></el-table-column>

    <el-table-column header-align="center" align="center" prop="authName" label="权限名称"></el-table-column>

    <el-table-column header-align="center" align="center" prop="path" label="路径"></el-table-column>

    <el-table-column header-align="center" align="center" label="层级">
      <template slot-scope="scope">
        <span v-if="scope.row.level==='0'">一级</span>
        <span v-if="scope.row.level==='1'">二级</span>
        <span v-if="scope.row.level==='2'">三级</span>
      </template>
    </el-table-column>
  </el-table>
</el-card>
</template>

<script>
export default {
  data() {
    return {
      tableData: []
    }
  },
  created() {
    this.getRightList()
  },
  methods: {
    // 设置token----用axios拦截器统一设置请求头
    async getRightList() {
      const res = await this.$http.get(`rights/list`)
      console.log(res) //权限列表
      this.tableData = res.data.data

    }
  }
}
</script>

<style>
.el-table {
  margin-top: 10px;
}
</style>
