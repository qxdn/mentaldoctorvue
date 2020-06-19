<template>
  <div>
    <div v-for="(item,i) in postList" :key="i">
      <el-card @click.native="gotoHref(i)">
        <div slot="header">
          <!--有空改text-->
          <avatar :username="item.user.username"></avatar>
          <span>{{item.title}}</span>
        </div>
        <div>
          <span>{{item.content}}</span>
        </div>
      </el-card>
    </div>
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
        user: {
          uuid: '',
          username: ''
        }
      }]
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
</style>
