<template>
  <div>
    <div v-for="(item,i) in postList" :key="i">
      <el-card @click.native="gotoHref(i)">
        <div slot="header">
          <!--有空改text-->
          <el-row>
            <el-col :span="2">
              <avatar :username="item.user.username" :size="40"></avatar>
            </el-col>
            <el-col :span="2">
              <span class="username">{{item.user.username}}</span>
            </el-col>
            <el-col :span="8">
              <span class="title">{{item.title}}</span>
            </el-col>
          </el-row>
        </div>
        <div>
          <span class="content">{{item.content}}</span>
        </div>
        <el-divider></el-divider>
        <span>{{item.createTime}}</span>
        <span class="el-icon-chat-dot-square">{{item.replyCounts}}</span>
        <span class="el-icon-view">{{item.browses}}</span>
      </el-card>
    </div>
    <div class="pagination">
    <el-pagination
      background
      layout="total, prev, pager, next, jumper"
      @current-change="handleCurrentChange"
      :page-size="pageSize"
      :current-page="currentPage"
      :total="total"
      >
    </el-pagination>
    </div>
    <div>
      <el-form
      :rules="rules"
      ref="postForm"
      :model="postForm">
      <el-form-item prop="title">
        <el-input size="normal" type="text" v-model="postForm.title" placeholder="标题"></el-input>
      </el-form-item>
      <el-form-item prop="content">
        <el-input :autosize="{ minRows: 5}"  maxlength="255"  show-word-limit type="textarea" v-model="postForm.content" placeholder="内容"></el-input>
      </el-form-item>
      <el-form-item prop="uuid" hidden="true">
        <el-input v-model="postForm.uuid"></el-input>
      </el-form-item>
      <el-button @click="publish">发布</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Avatar from 'vue-avatar'
export default Vue.extend({
  name: 'PostList',
  data () {
    return {
      pageSize: 10,
      total: 1,
      currentPage: 1,
      postList: [{
        id: '',
        title: '',
        content: '',
        createTime: '',
        replyCounts: 0,
        browses: 0,
        user: {
          uuid: '',
          username: ''
        }
      }],
      rules: {
        title: [
          { required: true, message: '请输入主题', trigger: 'change' }
        ],
        content: [
          { required: true, message: '请输入内容', trigger: 'change' }
        ],
        uuid: [
          { required: true }
        ]
      },
      postForm: {
        title: '',
        content: '',
        uuid: null
      },
      loginUser: JSON.parse(window.sessionStorage.getItem('user'))
    }
  },
  methods: {
    handleCurrentChange (val) {
      // 拼接url
      let url = '/post/?page=' + (val - 1)
      this.getRequest(url, null).then((response) => {
        this.handleRespone(response)
      })
    },
    initPage () {
      this.getRequest('/post/', null).then((response) => {
        this.handleRespone(response)
      })
    },
    handleRespone (response) {
      this.total = response.data.totalElements
      this.postList = response.data.content
      this.pageSize = response.data.size
    },
    gotoHref (index) {
      let url = '/post/' + this.postList[index].id
      const routerUrl = this.$router.resolve({path: url})
      window.open(routerUrl.href, '_blank')
    },
    publish () {
      this.postForm.uuid = this.loginUser.uuid
      if (this.postForm.uuid === null || this.postForm.uuid === undefined) {
        this.$message.error('请先登录')
      } else {
        this.$refs.postForm.validate(valid => {
          if (valid) {
            this.postRequest('/post/', this.postForm).then(response => {
              this.$message.success('发布成功')
              // 有空改一下
              setTimeout(() => location.reload(), 1000)
            }).catch((error) => {
              this.$message.error('发布失败')
              console.log(error)
            })
          }
        })
      }
    }
  },
  created: function () {
    this.initPage()
  },
  components: {
    Avatar
  }
})
</script>

<style>
.pagination {
  text-align: center;
}

.username {
  font-size: 30px;
  font-family: '华文行楷',"Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;;
  color:blue;
}

.title {
  font: bold;
  font-size: 30px;
  font-style: italic;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}

.content {
  font-family: '宋体';
  font-style: italic;
}

.input_content {
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}

</style>
