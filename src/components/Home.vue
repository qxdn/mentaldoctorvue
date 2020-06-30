<template>
  <div>
    <el-container>
        <el-header >
          <el-menu
          mode="horizontal"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
          :default-active="$route.path"
          >
            <el-menu-item index="/index">主页</el-menu-item>
            <el-menu-item index="/post">在线论坛</el-menu-item>
            <el-submenu index="1">
              <template slot="title">心理咨询</template>
              <el-menu-item index="/userConsult">我要咨询</el-menu-item>
              <el-menu-item index="/">我要接单</el-menu-item>
              <el-menu-item index="/">我要开药</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-header>
        <el-main>
          <el-container>
            <el-main>
              <router-view></router-view>
            </el-main>
            <el-aside  style="margin-top: 2%;">
              <el-row>
                <el-input @keydown.enter.native="search" placeholder="搜索" v-model="searchValue"><el-button icon="el-icon-search" slot="append" @click="search">搜索</el-button></el-input>
              </el-row>
              <el-row class="block radius aside">
                <div v-if="isLogin" style="text-align: center;">
                  <el-row>
                    <el-col :span="8" style="min-height:1px;"></el-col>
                    <el-col :span="8"><avatar :username="user.username" ></avatar></el-col>
                    <el-col :span="8"></el-col>
                  </el-row>
                  <el-row>
                    <h3 class="hello">欢迎回来<span class="name">{{user.username}}</span></h3>
                  </el-row>
                  <el-row>
                      <el-badge :value="6" style="margin-right: 40px;">
                        <el-button size="small">通知</el-button>
                      </el-badge>
                      <el-badge :value="3" >
                        <el-button size="small">回复</el-button>
                      </el-badge>
                  </el-row>
                  <el-row><el-button type="primary" icon="el-icon-user" class="asideButton">个人中心</el-button></el-row>
                  <el-row><el-button type="primary" icon="el-icon-switch-button" class="asideButton" @click="logout()">注销</el-button></el-row>
                </div>
                <div v-else style="text-align: center;">
                      <el-button type="primary" @click="toLogin">登录</el-button>
                      <el-button type="primary" @click="toRegister">注册</el-button>
                </div>
              </el-row>
            </el-aside>
          </el-container>
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
      },
      searchValue: ''
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
    },
    search () {
      // TODO:搜索
      console.log(this.searchValue)
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

.aside {
  padding: 30px 35px 15px 35px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  border-radius: 4px;
}

.asideButton {
  width: 150px;
  margin-top: 10px;
}

.hello {
  font-family: '宋体','Courier New', Courier, monospace;
}

.hello .name {
  font-family: '华文行楷','Courier New', Courier, monospace;
}
</style>
