<template>
  <div>
    <el-card>
      <!-- 面包屑 -->
        <my-bread level1="用户管理" level2="用户列表"></my-bread>
      <!-- 搜索框 -->
      <div style="margin-top: 15px;">
        <el-input
          @clear="searchUser()"
          clearable
          placeholder="请输入内容"
          v-model="query"
          class="input-with-select"
          style="width:300px"
        >
          <el-button @click="searchUser()" slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button @click="addDialogFormVisible = true" type="success" plain>添加用户</el-button>
      </div>
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%">
        <!-- type=index属于element表格自定义索引 -->
        <el-table-column header-align="center" align="center" type="index" label="#" width="100"></el-table-column>
        <el-table-column
          header-align="center"
          align="center"
          prop="username"
          label="姓名"
          width="100"
        ></el-table-column>
        <el-table-column header-align="center" align="center" prop="email" label="邮箱" width="180"></el-table-column>
        <el-table-column header-align="center" align="center" prop="mobile" label="电话" width="150"></el-table-column>
        <!-- 如果单元格内显示的内容不是一个字符串,需要给被显示的内容外面包裹一个template -->
        <!-- 1.这样就成了子组件要用父组件中的数据,在子组件中设置属性slot-scope,该属性的值是要用数据的数据源----tableData -->
        <!-- 2.scope属性中有个row属性,代表数组中的每个对象tableData.row.create_time -->
        <el-table-column header-align="center" align="center" label="创建时间" width="150">
          <template slot-scope="scope">{{scope.row.create_time | fmtdate}}</template>
        </el-table-column>
        <!-- 状态 -->
        <el-table-column header-align="center" align="center" label="状态" width="100">
          <template slot-scope="scope">
            <el-switch
              @change="changeMgState(scope.row)"
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </template>
          <!-- 操作 -->
        </el-table-column>
        <el-table-column header-align="center" prop align="center" label="操作">
          <template slot-scope="scope">
            <el-row>
              <el-button
                @click="showEditDia(scope.row)"
                size="mini"
                plain
                type="primary"
                icon="el-icon-edit"
                circle
              ></el-button>
              <el-button
                @click="deleteUser(scope.row.id)"
                size="mini"
                plain
                type="danger"
                icon="el-icon-delete"
                circle
              ></el-button>
              <el-button
                @click="showUserRole(scope.row)"
                size="mini"
                plain
                type="success"
                icon="el-icon-check"
                circle
              ></el-button>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagenum"
          :page-sizes="[4, 6]"
          :pagesize="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </el-card>

    <!-- 添加用户会话 -->
    <el-dialog title="添加用户" :visible.sync="addDialogFormVisible">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="80px">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="80px">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="80px">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="80px">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑会话框 -->
    <el-dialog title="编辑用户" :visible.sync="editDialogFormVisible">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="80px">
          <el-input v-model="form.username" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="80px">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="80px">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUser()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 角色会话框 -->
    <el-dialog title="分配角色" :visible.sync="roleDialogFormVisible">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="80px">{{form.username}}</el-form-item>
        <el-form-item label="角 色" label-width="80px">
          <el-select v-model="currentRoleID">
            <el-option label="请选择" :value="-1" disabled></el-option>
            <el-option
              v-for="(item,i) in roleList"
              :key="i"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="roleDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editRole()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 角色参数,获取到的
      roleList: [],
      currentRoleID:-1,
      currentID:-1,
      form: {},
      query: "",
      addDialogFormVisible: false,
      editDialogFormVisible: false,
      roleDialogFormVisible: false,
      // 当前页码
      pagenum: 1,
      // 每页显示条数
      pagesize: 4,
      total: -1,
      tableData: []
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    // 获取列表
    // query	查询参数	可以为空
    // pagenum	当前页码	不能为空
    // pagesize	每页显示条数	不能为空
    async getUserList() {
      const token = localStorage.getItem("token")
      this.$http.defaults.headers.common["Authorization"] = token
      const res = await this.$http.get(
        `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${
          this.pagesize
        }`
      )
      console.log(res) //打印说是无效token-------看文档说需要授权API,查看axios文档,设置全局默认值
      const {
        meta: { status, msg },
        data: { users, total }
      } = res.data
      if (status === 200) {
        // 赋值
        this.total = total;
        this.tableData = users;
        // this.$message.success(msg);
        // 取出来的创建时间数据格式不对,要用到过滤器,在newVue实例之前写一个全局过滤器
      } else {
        this.$message.warning(msg);
      }
    },

    // 分页方法
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
      this.pagesize = val;
      this.pagenum = 1;
      this.getUserList();
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.pagenum = val;
      this.getUserList();
    },
    // 搜索用户功能
    /**
     * 1.给搜索框绑定v-model = query
     * 2.点击按钮,调用getUserList()
     * 3.搜索框清空事件
     */
    // 搜索
    searchUser() {
      this.getUserList();
    },
    // 添加
    // username	用户名称	不能为空
    // password	用户密码	不能为空
    // email	邮箱	可以为空
    // mobile	手机号	可以为空
    async addUser() {
      const res = await this.$http.post(`users`, this.form);
      // console.log(res);
      const {
        meta: { status, msg }
      } = res.data;
      if (status === 201) {
        this.addDialogFormVisible = false;
        this.$message.success(msg);
        this.getUserList();
      }
    },
    // 删除功能
    deleteUser(userID) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$http.delete(`users/${userID}`);
          // console.log(res);
          this.getUserList();
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 修改状态
    // uId	用户 ID	不能为空携带在url中
    // type	用户状态
    async changeMgState(user) {
      const res = await this.$http.put(
        `users/${user.id}/state/${user.mg_state}`
      );
    },
    // 编辑用户
    // 点击编辑按钮,显示编辑会话框
    async showEditDia(user) {
      this.editDialogFormVisible = true;
      // const res = this.$http.get(`users/${user.id}`)
      // console.log(res)
      this.form = user;
    },
    // id	用户 id	不能为空 参数是url参数:id
    // email	邮箱	可以为空
    // mobile	手机号	可以为空
    async editUser() {
      const res = await this.$http.put(`users/${this.form.id}`, this.form);
      // console.log(res)
      // 请求成功,关闭会话框,更新列表
      this.editDialogFormVisible = false;
      this.form = {};
    },

    // 用户角色
    async showUserRole(user) {
      this.roleDialogFormVisible = true;
      this.form.username = user.username;
      this.currentID = user.id
      // 获取所有用户角色
      const res = await this.$http.get(`roles`);
      // console.log(user);
      this.roleList = res.data.data;
      // 获取当前用户的角色
      const curr = await this.$http.get(`users/${user.id}`)
      // console.log(curr.data.data)
      this.currentRoleID = curr.data.data.rid
       //label是显示的角色名,value是当前用的的角色id----v-model绑定的是当前用户的角色ID,那么label就会显示相对应的角色

    },
    // 修改角色
    async editRole() {
      this.roleDialogFormVisible = false
      //  id	用户 ID	不能为空参数是url参数:id
      // rid	角色 id	不能为空参数body参数
      // 提交数据时,要求是提交对象,而currentRoleID是个字符串,所以要将它包装成一个对象
      // 获取参数有两个途径:
      // 1.点击时候视图中传值---点击按钮在表单外边,获取不到值
      // 2.在data中找------没有当前用户的信息,
      // 所以重新添加一个数据,并在打开对话框的时候给data中的新数据赋值
      // data中数据特点是来源于自己,直接赋值.灵活性差,所以在面包屑组件中,不能将数据写在自定义组件的data中
      const res = await this.$http.put(`users/${this.currentID}/role`,{rid:this.currentRoleID})
      // console.log(res)
      this.$message.success(res.data.meta.msg)
    }
  }
};
</script>

<style>
.el-card {
  height: 530px;
}

.el-breadcrumb {
  margin-bottom: 10px;
}

.el-dialog {
  border-radius: 20px;
}
</style>
