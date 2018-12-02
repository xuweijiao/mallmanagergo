<template>
<div class="login_wrap">
  <el-form label-position="top" label-width="80px" :model="formData" class="login_form">
    <h2>用户登录</h2>
    <el-form-item label="用户名">
      <el-input v-model="formData.username"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="formData.password" type="password"></el-input>
    </el-form-item>
    <el-button @click.prevent="user_login()" type="primary" class="login_btn">登录</el-button>
  </el-form>
</div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    // 登录
    async user_login() {
      // axios是异步操作,要让代码看起来像同步操作  看element-UI文档的异步
      const res = await this.$http.post("login", this.formData);
      // console.log(res)
      const {
        data,
        meta: { msg, status }
      } = res.data;

      if (status === 200) {
        // 登录成功,保存token
         localStorage.setItem('token',data.token)
        this.$message.success(msg);
        this.$router.push({
          name: "home"
        });
      } else {
        //登录失败,提示失败,
        this.$message.error(msg);
      }
      // 传统写法
      // this.$http.post("login", this.formData).then(res => {
      //   const {
      //     data,
      //     meta: {
      //       msg,
      //       status
      //     }
      //   } = res.data;
      //   // 判断状态码
      //   // 登录成功,提示成功,修改url,保存token
      //   if (status === 200) {
      //     this.$message.success(msg);
      //     this.$router.push({
      //       name: "home"
      //     });
      //   } else {
      //     //登录失败,提示失败,
      //     this.$message.error(msg);
      //   }
      // });
    }
  }
};
</script>

<style>
.login_wrap {
  background-color: #324152;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login_form {
  width: 500px;
  background-color: #fff;
  border-radius: 15px;
  padding: 20px;
}

.login_btn {
  width: 100%;
}
</style>
