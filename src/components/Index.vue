<template>
  <div>
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="(item, index) in imgUrl" :key="index">
        <el-image
          :src="item"
          fit="contain"
          style="height: 200px"
          >
          <div slot="error" class="image-slot">
             <i class="el-icon-picture-outline"></i>
          </div>
        </el-image>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // FIXME: 图源需要换
      imgUrl: [
        require('../assets/logo1.jpg'),
        require('../assets/logo2.jpg'),
        require('../assets/logo3.jpg')
      ]
    }
  },
  created: function () {
    this.$notify.success({
      title: 'Info',
      message: '这是只是一个demo'
    })
  }
}
</script>

<style>

</style>
