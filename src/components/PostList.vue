<template>
  <div>
    <p v-for="(item,i) in postList" :key="i">{{item}}</p>
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
export default {
  name: 'PostList',
  data () {
    return {
      pageSize: 10,
      total: 1,
      currentPage: 1,
      postList: ''
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
    }
  },
  created: function () {
    this.initPage()
  }
}
</script>

<style>
</style>
