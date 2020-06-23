<template>
  <div>
    <div>
      <h3>{{post.title}}</h3>
      <el-divider></el-divider>
      <div v-if = "currentPage==1">
        <el-card>
          <div slot="header">
          <avatar :username="post.user.username"></avatar>
          {{post.user.username}}
          {{post.createTime}}
          </div>
          {{post.content}}
        </el-card>
      </div>
      <div v-for="(item,i) in replies" :key="i">
        <el-card>
          <div slot="header">
            <avatar :username="item.user.username"></avatar>
            {{item.user.username}}
            {{item.createTime}}
          </div>
          {{item.content}}
        </el-card>
      </div>
    </div>
    <div class="pagination">
    <el-pagination
      background
      layout="prev, pager, next, jumper"
      @current-change="handleCurrentChange"
      :page-size="pageSize"
      :current-page="currentPage"
      :total="totalElements"
      >
    </el-pagination>
    </div>
    <div>
      <el-form
        ref="replyForm"
        :rules="rules"
        :model="replyForm"
      >
        <el-form-item prop="postId" hidden="true">
          <el-input v-model="replyForm.postId"></el-input>
        </el-form-item>
        <el-form-item prop="content">
          <el-input v-model="replyForm.content"></el-input>
        </el-form-item>
        <el-form-item prop="uuid" hidden="true">
          <el-input v-model="replyForm.uuid"></el-input>
        </el-form-item>
        <el-button @click="toReply">发表回复</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import Avatar from 'vue-avatar'
export default Vue.extend({
  data () {
    return {
      postId: '',
      post: {
        title: '',
        content: '',
        createTime: '',
        user: {
          uuid: '',
          username: ''
        }
      },
      replies: [{
        content: '',
        createTime: '',
        user: {
          uuid: null,
          username: ''
        }
      }],
      currentPage: 1,
      pageSize: 10,
      totalElements: 1,
      replyForm: {
        postId: null,
        content: null,
        uuid: null
      },
      rules: {
        postId: [{ required: true }],
        content: [{ required: true }],
        uuid: [{ required: true }]
      }
    }
  },
  methods: {
    getPage (page, id) {
      // 拼接url
      let url = '/post/' + id + '?page=' + page
      this.getRequest(url, null).then((response) => {
        this.handleRespone(response)
      })
    },
    handleCurrentChange (val) {
      this.getPage(val - 1, this.postId)
    },
    handleRespone (response) {
      this.post = response.data.post
      this.replies = response.data.replies
      this.pageSize = response.data.size
      this.totalElements = response.data.totalElements
    },
    toReply () {
      // 发表回复
      this.replyForm.postId = this.postId
      this.replyForm.uuid = this.post.user.uuid
      if (this.replyForm.uuid === null) {
        this.$message.error('请先登录')
      } else {
        this.$refs.replyForm.validate(valid => {
          if (valid) {
            this.postRequest('/reply/', this.replyForm).then(response => {
              // TODO: 详细判断
              this.$message.success('发布成功')
              // 有空改一下
              setTimeout(() => location.reload(), 1000)
            })
          } else {
            this.$message.error('回复失败')
          }
        })
      }
    }
  },
  created: function () {
    // 初始化
    this.postId = this.$route.params.id
    this.getPage(0, this.postId)
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
