<template>
  <div class="hello">
    <el-button @click="login">{{msg}}</el-button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: '登陆'
    }
  },
  methods: {
    login () {
      this.postKeyValueRequest('/login', {
        'username': 'qxdn',
        'password': '123456'
      }).then(function (response) {
        console.log(response)
      }).catch(function (error) {
        console.log(error)
      })
      // 天坑
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
