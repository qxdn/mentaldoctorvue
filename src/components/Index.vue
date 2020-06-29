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
    <el-tabs v-model="activeTabName">
      <el-tab-pane label="心理健康" name="1">心理医生网站是一个面向校园的心理健康网站</el-tab-pane>
      <el-tab-pane label="在线论坛" name="2">在线论坛是一个</el-tab-pane>
      <el-tab-pane label="在线咨询" name="3">在线咨询是学生与心理咨询师之间进行开药单</el-tab-pane>
      <el-tab-pane label="在线药单" name="4">咨询结束后，医生可以在线开药单，学生可以就近购买</el-tab-pane>
    </el-tabs>
    <el-divder></el-divder>
    <h3>常见问题</h3>
    <el-divder></el-divder>
    <el-collapse v-model="activeCollapseName" accordion>
      <el-collapse-item  name="1">
        <template slot="title"><i class="header-icon el-icon-info"></i>认证问题</template>
        <div>医生认证问题</div>
      </el-collapse-item>
      <el-collapse-item  name="2">
        <template slot="title"><i class="header-icon el-icon-info"></i>账号问题</template>
        <div>账号问题</div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeTabName: '1',
      activeCollapseName: '1',
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
