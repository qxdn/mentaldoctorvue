<template>
  <div>
    <el-container>
      <el-header>
        <el-steps :active="active" finish-status="success">
          <el-step title="在线预约"></el-step>
          <el-step title="医生回复"></el-step>
          <el-step title="支付"></el-step>
          <el-step title="在线咨询"></el-step>
          <el-step title="评价"></el-step>
        </el-steps>
      </el-header>
      <el-main>
        <div style="text-align:center;">
          <div v-if="active==0">
            <div class="block">
              <span>确认预约时间</span>
              <el-date-picker
                v-model="dateValue"
                type="datetimerange"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                :picker-options=pickerOptions
              >
              </el-date-picker>
            </div>
          </div>
          <div v-if="active==1">
            <div>
            等待医生确认
            </div>
          </div>
          <div v-if="active==2">
            <div>
            支付
            </div>
          </div>
          <div v-if="active==3">
            <div>
            在线咨询
            </div>
          </div>
          <div v-if="active==4">
            <el-rate
              v-model="rateValue"
              :texts="rateTexts"
              show-text>
            </el-rate>
          </div>
        </div>
      </el-main>
      <el-footer>
        <div style="text-align: center;">
          <el-button v-if="active < 4" style="margin-top: 12px;" @click="next">下一步</el-button>
          <el-button v-if="active == 4" style="margin-top: 12px;" @click="next">提交</el-button>
        </div>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 0,
      rateValue: null,
      rateTexts: ['极差', '失望', '一般', '满意', '非常满意'],
      dateValue: null,
      pickerOptions: {
        disabledDate (time) {
          // 8.64e7为1天
          return time.getTime() < Date.now() - 8.64e7
        }
      }
    }
  },
  methods: {
    next () {
      if (this.active === 0) {
        if (this.dateValue === null) {
          this.$message.error('请填写预约时间')
        } else {
          this.active++
        }
      } else if (this.active === 4) {
        if (this.rateValue === null || this.rateValue === 0) {
          this.$message.error('请对本次咨询进行评价')
        } else {
          this.$message.success('评价成功')
          this.$router.push({path: '/'})
        }
      } else {
        this.active++
      }
    }
  }
}
</script>

<style>

</style>
