<template>
  <div>
    <el-container>
      <el-header>
        <div>
          <!--可以放图片-->
          心理医生
        </div>
        <div v-if="isLogin">
          已经登录
        </div>
        <div v-else>
          <el-button type="primary" @click="toLogin">登录</el-button>
          <el-button type="primary" @click="toRegister">注册</el-button>
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isLogin: false
    }
  },
  methods: {
    toLogin () {
      this.$router.push({path: '/login'})
    },
    toRegister () {
      this.$router.push({path: '/register'})
    }
  }
}
</script>

<style>

</style>
