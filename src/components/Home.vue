<template>
  <div>
    <el-container>
      <el-header >
        <el-menu
        mode="horizontal"
        background-color="#545c64"
        router
        >
          <el-menu-item index="/">主页</el-menu-item>
          <el-menu-item index="/post">在线论坛</el-menu-item>
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
        </el-menu>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
    <!--回顶部-->
    <el-backtop></el-backtop>
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
          window.sessionStorage.setItem('user', JSON.stringify(response.data.obj))
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
  background-color: #545c64;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 0px;
  box-sizing: border-box;
  margin-top: 0%;
}

.homeHeader .title {
  font-size: 30px;
  font-family: 华文行楷;
  color: #ffffff;
}
</style>
