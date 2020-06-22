<template>
  <div>
    <div v-for="(item,i) in postList" :key="i">
      <el-card @click.native="gotoHref(i)">
        <div slot="header">
          <!--有空改text-->
          <avatar :username="item.user.username"></avatar>
          <span>{{item.user.username}}</span>
          <span>{{item.title}}</span>
        </div>
        <div>
          <span>{{item.content}}</span>
        </div>
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
        <el-input size="normal" type="text" v-model="postForm.content" placeholder="内容"></el-input>
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

</style>
