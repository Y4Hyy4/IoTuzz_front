<template>

  <body id="login">
    <el-form :model="form" status-icon :rules="rules" ref="form" label-width="100px" class="login-container">
      <h3 class="login_title">IoTuzz</h3>
      <el-form-item label="用户名" label-width="80px" prop="username" class="username">
        <el-input type="input" v-model="form.username" auto-complete="off" placeholder="请输入账号"></el-input>
      </el-form-item>

      <el-form-item label="密码" label-width="80px" prop="password" class="password">
        <el-input type="password" v-model="form.password" auto-complete="off" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item class="login_submit">
        <el-button type="primary" @click="login" round class="login_submit">Login</el-button>
      </el-form-item>
    </el-form>
  </body>
</template>
<script>
// import Mock from 'mockjs'
import { getMenu } from "@/api/api";

export default {
  name: "login",
  data() {
    return {
      form: {},
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            message: "用户名长度不能小于3位",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    login() {
      // const token =Mock.Random.guid()
      // this.$store.commit('setToken',token)
      // this.$router.push({name:'home'})

      getMenu(this.form).then(({ data: res }) => {
        if (res.code === 20000) {
          this.$store.commit("clearMenu");
          this.$store.commit("setMenu", res.data.menu);
          this.$store.commit("setToken", res.data.token);
          this.$store.commit("addMenu", this.$router);
          console.log(this.$store.state.tab.menu)
          this.$router.push({ name: "home" });
        } else {
          this.$message.warning(res.data.message);
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
#login {
  background-image: url("../../assets/bg-03.png");
  margin: 0px;
  padding: 0;
  height: 100%;
  width: 100%;
  position: fixed;
}

.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 300px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.username {
  font-family: '苹方';
}

.password {
  font-family: '苹方';
}

.login_title {
  display: block;
  font-family: Fira Code, Courier, monospace;
  font-weight: bolder;
  font-size: 39px;
  margin: 0px auto 40px auto;
  text-align: center;
  color: #333333;
}

.login_submit {
  margin: 10px auto 0 auto;
  font-family: 'Fira Code', Courier, monospace;
  font-weight: 550;
}
</style>
