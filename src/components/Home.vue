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
          </el-menu>
        </el-header>
      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
        <el-aside>
          <div v-if="isLogin" style="text-align: center;">
            <el-row>
              <el-col :span="8" style="min-height:1px;"></el-col>
              <el-col :span="8"><avatar :username="user.username" ></avatar></el-col>
              <el-col :span="8"></el-col>
            </el-row>
            <el-row>
              <div>欢迎回来{{user.username}}</div>
            </el-row>
            <el-button icon="el-icon-user">个人中心</el-button>
            <el-button icon="el-icon-switch-button" @click="logout()">注销</el-button>
          </div>
          <div v-else style="text-align: center;">
                <el-button type="primary" @click="toLogin">登录</el-button>
                <el-button type="primary" @click="toRegister">注册</el-button>
          </div>
        </el-aside>
      </el-container>
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
    },
    logout () {
      window.sessionStorage.removeItem('user')
      window.localStorage.removeItem('Token')
      this.axiosSetHeader('')
      this.$message.success('注销成功')
      // 有空改一下
      setTimeout(() => location.reload(), 1000)
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
