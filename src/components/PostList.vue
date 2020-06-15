<template>
  <div>
    <el-button type="primary" @click="getPage">测试</el-button>
  </div>
</template>

<script>
export default {
  name: 'PostList',
  data () {
    return {}
  },
  methods: {
    getPage () {
      this.getRequest('/post/', null).then((response) => {
        console.log(response)
      })
    }
  }
}
</script>

<style>
</style>
