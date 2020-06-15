<template>
  <div>
    <el-form
      :rules="rules"
      ref="loginForm"
      v-loading="loading"
      element-loading-text="正在登录..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      :model="loginForm"
      class="loginContainer"
    >
      <h3 class="loginTitle">登录</h3>
      <el-form-item prop="username">
        <el-input size="normal" type="text" v-model="loginForm.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          size="normal"
          type="password"
          v-model="loginForm.password"
          placeholder="请输入密码"
          @keydown.enter.native="submitLogin"
        ></el-input>
      </el-form-item>
      <el-button size="small" type="primary"  @click="submitLogin">登录</el-button>
      <el-button size="small"  @click="toRegister">注册</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      loading: false,
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.postKeyValueRequest('/login', this.loginForm).then((response) => {
            this.loading = false
            if (response.data.status === 500) {
              this.$message.error(response.data.obj)
            }
            if (response.data.status === 200) {
              window.localStorage.setItem('Token', response.data.obj)
              this.axiosSetHeader(window.localStorage.getItem('Token'))
              this.$router.push({path: '/'})
            }
          }).catch((error) => {
            this.loading = false
            this.$message.error('登录失败')
            console.log(error)
          })
        } else {
          this.$message.error('请输入正确的数据')
          return false
        }
      })
    },
    toRegister () {
      this.$router.push({path: '/register'})
    }
  }
}
</script>

<style>
.loginContainer {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 15px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.loginTitle {
  margin: 15px auto 20px auto;
  text-align: center;
  color: #505458;
}
</style>
