<template>
  <el-container>
    <el-header>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark"></div>
      </el-col>
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <img src="@/assets/images/logo.png" alt>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">
            <h2>传智后台管理系统</h2>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <a @click.prevent="logOut()">退出</a>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="250px">
        <el-menu :unique-opened="true" :router="true">
          <!-- 1 -->
          <el-submenu :index="''+item.order" v-for="(item,i) in navList" :key="i">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item :index="item1.path" v-for="(item1,i) in item.children" :key="i">
                <i class="el-icon-document"></i>
                <span>{{item1.authName}}</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      navList:{}
    }
  },
  // newVue之前自动触发beforeCreate
  // 在页面还没有加载之前,先检查是否有token.没有就跳转到login页面
  // beforeCreate() {
  //   // 获取token ------*****要在login中设置token*****
  //   const token = sessionStorage.getItem('token');
  //   if (!token) {
  //     // 没有token ->登录去
  //     this.$router.push({ name: 'login' });
  //   }
  // },
 created(){
    this.getNavList()
  },
  methods: {
    logOut() {
      
      sessionStorage.clear();
      this.$message.success("退出成功");
      this.$router.push({ name: "login" });
    },
    async getNavList(){
      const res =await this.$http.get(`menus`)
      // console.log(res)
      this.navList = res.data.data
    }
  }
};
</script>

<style>
.el-container {
  background-color: #ccc;
  height: 100%;
}

.el-header {
  background-color: #b3c0d1;
}

.el-header h2 {
  padding: 10px 70px;
}

.el-header a {
  display: block;
  text-decoration: none;
  padding: 15px 30px;
}

.el-aside {
  background-color: #fff;
}

.el-main {
  background-color: #e9eef3;
}
</style>
