<template>
  <div>
    <el-container>
      <el-header class="homeHeader">
        <div class="title">
          <!--可以放图片-->
          心理医生
        </div>
        <div v-if="isLogin" style="margin-right">
          <el-dropdown>
            <div><avatar :username="user.username" ></avatar></div>
            <el-dropdown-menu>
              <el-dropdown-item icon="el-icon-user">个人中心</el-dropdown-item>
              <el-dropdown-item icon="el-icon-switch-button">注销</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div v-else style="margin-right">
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
import Avatar from 'vue-avatar'
export default {
  data () {
    return {
      isLogin: false,
      user: {
        uuid: 0,
        username: ''
      }
    }
  },
  methods: {
    toLogin () {
      this.$router.push({path: '/login'})
    },
    toRegister () {
      this.$router.push({path: '/register'})
    },
    isUserLogin () {
      this.getRequest('/isLogin', null).then((response) => {
        if (response.data.status === 500) {
          this.isLogin = false
        } else if (response.data.status === 200) {
          this.isLogin = true
          this.user = response.data.obj
          window.sessionStorage.setItem('user', response.data.obj)
        }
      })
    }
  },
  created: function () {
    this.isUserLogin()
  },
  components: {
    Avatar
  }
}
</script>

<style>
.homeHeader {
  background-color: #409eff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 15px;
  box-sizing: border-box;
}

.homeHeader .title {
  font-size: 30px;
  font-family: 华文行楷;
  color: #ffffff;
}
</style>
