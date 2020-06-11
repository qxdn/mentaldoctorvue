<template>
  <div class="hello">
    <button @click="login">{{msg}}</button>
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
      // 天坑
      this.axiosInstance.post('login', {
        'username': 'qxdn',
        'password': '123456'
      }, {
        transformRequest: [ (data) => {
          return this.qs.stringify(data)
        }]
      }).then(function (response) {
        console.log(response)
      }).catch(function (error) {
        console.log(error)
      })
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
