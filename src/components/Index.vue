<template>
  <div>
    <el-carousel :interval="4000" type="card">
      <el-carousel-item v-for="(item, index) in imgUrl" :key="index">
        <el-image
          :src="item"
          fit="contain"
          >
          <div slot="error" class="image-slot">
             <i class="el-icon-picture-outline"></i>
          </div>
        </el-image>
      </el-carousel-item>
    </el-carousel>
    <el-tabs v-model="activeTabName" style="margin-top: 2%;">
      <el-tab-pane label="关于网站" name="1">心理医生网站是一个面向校园的心理健康网站，提供校园内的心理健康论坛，同时也提供预约心理医生、心理医生线上咨询以及在线开具心理健康药单。</el-tab-pane>
      <el-tab-pane label="在线论坛" name="2">在线论坛是一个面向学生之间心理健康讨论的一个线上论坛，在线讨论分享自己的心理健康状况、转好经历。同时我们还提供心理健康小贴士，医生也可以发布关注心理健康的帖子和呵护心理健康的方法。</el-tab-pane>
      <el-tab-pane label="在线咨询" name="3">在线咨询是学生与心理医生在预约时间之后可以进行线上咨询</el-tab-pane>
      <el-tab-pane label="在线药单" name="4">咨询结束后，医生可以在线开药单，学生可以到附近的药店购买。</el-tab-pane>
    </el-tabs>
    <el-divder></el-divder>
    <h3>常见问题</h3>
    <el-divder></el-divder>
    <el-collapse v-model="activeCollapseName" accordion style="margin-top: 2%;">
      <el-collapse-item  name="1">
        <template slot="title"><i class="header-icon el-icon-info"></i>医生认证问题</template>
        <div>医生认证请准备相应的材料到个人中心进行认证，会有工作人员进行联系</div>
      </el-collapse-item>
      <el-collapse-item  name="2">
        <template slot="title"><i class="header-icon el-icon-info"></i>账号问题</template>
        <div>邮箱、电话认证请到个人中心进行认证</div>
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
        require('../assets/logo3.jpg'),
        require('../assets/logo4.jpg'),
        require('../assets/logo5.jpg')
      ]
    }
  },
  created: function () {
  }
}
</script>

<style>

</style>
