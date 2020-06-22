<template>
  <div>
    <el-form
      ref="registerForm"
      :model="registerForm"
      :rules="rules"
      v-loading="loading"
      element-loading-text="正在注册..."
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      class="loginContainer"
    >
    <h3 class="loginTitle">注册</h3>
    <el-form-item prop="username">
      <el-input size="normal" type="text" placeholder="请输入用户名" v-model="registerForm.username"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input size="normal" type="password" placeholder="请输入密码" v-model="registerForm.password"/>
    </el-form-item>
    <el-form-item prop="rePassword">
      <el-input size="normal" type="password" placeholder="请再次输入密码" v-model="registerForm.rePassword"></el-input>
    </el-form-item>
    <el-button size="normal" type="primary" style="width: 100%;" @click="submitRegister">注册</el-button>
    <router-link to="/login">已有账号去登陆</router-link>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data () {
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      loading: false,
      registerForm: {
        username: '',
        password: '',
        rePassword: '',
        roles: [ {
          name: 'ROLE_normal',
          description: '普通用户'
        }]
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在6~9位', trigger: 'blur' }],
        rePassword: [{required: true, message: '请再次输入密码', trigger: 'blur'},
          { min: 6, max: 12, message: '长度在6~9位', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitRegister () {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.postRequest('/register', this.registerForm).then((response) => {
            this.loading = false
            if (response.data === null) {
              this.$message.error('注册失败')
            } else {
              this.$message.success('注册成功')
              this.$router.push({path: '/login'})
            }
            console.log(response)
          }).catch((error) => {
            this.loading = false
            console.log(error)
          })
        } else {
          this.$message.error('请输入正确的数据')
          return false
        }
      })
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
