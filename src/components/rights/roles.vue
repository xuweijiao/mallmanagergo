<template>
<el-card>
  <!-- 面包屑 -->
  <my-bread level1="权限管理" level2="角色列表"></my-bread>
  <!-- 封装面包屑 :自定义面包屑全局组件-->
  <!-- 添加按钮 -->
  <el-button type="primary" plain>添加角色</el-button>
  <!-- 用户表格 -->
  <el-table :data="roleList" style="width: 100%" height="500px">
    <!-- type=index属于element表格自定义索引 #显示索引-->
    <el-table-column type="expand">
      <!-- 展开后的内容 -->
      <template slot-scope="scope">
        <el-row v-for="(item,i) in scope.row.children" :key="i">
          <el-col :span="4">
            <el-tag @close="deleteRight(scope.row,item.id)" closable type="success">{{item.authName}}</el-tag>
            <i class="el-icon-arrow-right"></i>
          </el-col>
          <el-col :span="20">
            <el-row v-for="(item1,i) in item.children" :key="i">
              <el-col :span="4">
                <el-tag @close="deleteRight(scope.row,item1.id)" closable type="warning">{{item1.authName}}</el-tag>
                <i class="el-icon-arrow-right"></i>
              </el-col>
              <el-col :span="20">
                <el-tag @close="deleteRight(scope.row,item2.id)" closable type="primary" v-for="(item2,i) in item1.children" :key="i">{{item2.authName}}</el-tag>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <!-- 没有权限时候显示未分配权限 -->
        <el-row v-if="scope.row.children.length===0">未分配权限</el-row>
      </template>
    </el-table-column>
    <el-table-column header-align="center" align="center" type="index" label="#" width="50"></el-table-column>
    <el-table-column header-align="center" align="center" prop="roleName" label="角色名称"></el-table-column>
    <el-table-column header-align="center" align="center" prop="roleDesc" label="角色描述"></el-table-column>
    <el-table-column header-align="center" align="center" label="操作">
      <template slot-scope="scope">
        <el-row>
          <el-button size="mini" plain type="primary" icon="el-icon-edit" circle></el-button>
          <el-button size="mini" plain type="danger" icon="el-icon-delete" circle></el-button>
          <el-button @click="showAddRight(scope.row)" size="mini" plain type="success" icon="el-icon-check" circle></el-button>
        </el-row>
      </template>
    </el-table-column>
  </el-table>
  <!-- 编辑权限对话框 -->
  <el-dialog title="修改权限" :visible.sync="addRightFormVisible">
    <el-tree ref="tree" :data="rightList" show-checkbox node-key="id" default-expand-all :default-checked-keys="currRightId" :props="defaultProps">
    </el-tree>
    <div slot="footer" class="dialog-footer">
      <el-button @click="addRightFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="editRight()">确 定</el-button>
    </div>
  </el-dialog>
</el-card>
</template>

<script>
export default {
  data() {
    return {
      // 修改权限参数
      roleList: [],
      rightList: [],
      currRightId: [],
      currRoleId: -1,
      defaultProps: {
        label: 'authName',
        children: 'children'
      },
      addRightFormVisible: false
    };
  },
  created() {
    this.getRoleList();
  },
  methods: {
    // 获取权限列表
    async getRoleList() {
      const res = await this.$http.get(`roles`);
      console.log(res.data.data);
      this.roleList = res.data.data;

    },
    // 点击tag的关闭按钮  删除当前权限
    async deleteRight(role, rightId) {
      const res = await this.$http.delete(`roles/${role.id}/rights/${rightId}`);
      // console.log(res)
      // 更新当前角色的权限   要将res.data.data设置给当前角色的children
      // this.getRoleList()----更新整个视图--用户体验差
      role.children = res.data.data
    },
    // 添加权限
    // 显示对话框
    async showAddRight(role) {
      // 发送请求,获取树形结构所有权限
      const res = await this.$http.get(`rights/tree`);
      // console.log(res.data.data); //权限列表
      this.rightList = res.data.data //看文档中数据的形式和文档中返回的数据形式
      this.currRoleId = role.id
      //  default-checked-keys是设置被选中的属性,属性绑定的值类型是个数组,数据来自于当前角色所授予的权限的id,要在data中声明一个数组
      // 获取数据方式:通过获取点击事件,将当前角色座位参数传入,在通过遍历当前角色的children,将权限id传入一个新的数组里,最后将这个新数组赋值给data中声明的数组
      let arr_temp = []
      role.children.forEach(item => {
        arr_temp.push(item.id)
        item.children.forEach(item2 => {
          arr_temp.push(item2.id)
          item2.children.forEach(item3 => {
            arr_temp.push(item3.id)

          });
        });
      })
      this.currRightId = arr_temp
      this.addRightFormVisible = true;
    },
    // 修改权限
    async editRight() {
      // roles/:roleId/rights
      // :roleId	角色 ID	不能为空携带在url中
      // rids	权限 ID 列表	以 , 分割的权限 ID 列表
      // 获取树状图中所有全选和半选的节点
        // 获取全选
        let arr1 = this.$refs.tree.getCheckedKeys()
        // 获取半选
        let arr2 = this.$refs.tree.getHalfCheckedKeys()
        // 组合
        let rids = [...arr1,...arr2].join(',')
      const res = await this.$http.post(`roles/${this.currRoleId}/rights`,{rids})
      // console.log(res)
      this.$message.success(res.data.meta.msg)
      this.getRoleList()
      this.addRightFormVisible = false
    }
  }
};
</script>

<style>
.el-button {
  margin-top: 10px;
}
</style>
