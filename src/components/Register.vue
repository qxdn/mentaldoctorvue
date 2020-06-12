<template>
  <div>
    <el-form
      ref="registerForm"
      :model="registerForm"
      :rules="rules"
    >
    <el-form-item prop="username">
      <el-input size="normal" type="text" placeholder="请输入用户名" v-model="registerForm.username"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input size="normal" type="password" v-model="registerForm.password"/>
    </el-form-item>
    <el-form-item prop="rePassword">
      <el-input size="normal" type="password" v-model="registerForm.rePassword"></el-input>
    </el-form-item>
    <el-button size="normal" type="primary" style="width: 100%;" @click="submitRegister">注册</el-button>
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
          this.postRequest('/register', this.registerForm).then((response) => {
            console.log(response)
          }).catch((error) => {
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
</style>
