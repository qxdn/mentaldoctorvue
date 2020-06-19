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
          uuid: '',
          username: ''
        }
      }],
      currentPage: 1,
      pageSize: 10,
      totalElements: 1
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
