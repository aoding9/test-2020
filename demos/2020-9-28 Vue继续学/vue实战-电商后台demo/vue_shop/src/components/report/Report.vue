<template>
  <div>
    <!-- 面板xie -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡pian视图 -->
    <el-card>
      <!-- *2.为echarts准备一个具备大小（宽高）的dom容器 -->
      <div id="main"></div>
    </el-card>
  </div>
</template>
<script>
// *1.导入echarts
import echarts from 'echarts'
// 导入lodash用于对象合并
import _ from 'lodash'

export default {
  data() {
    return {
      // 折线图需要合并的配置项
      options: {
        title: {
          text: '用户来源'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ]
      }
    }
  },
  created() {},
  async mounted() {
    // *3.基于准备好的dom，初始化echarts实例
    // 注意，必须等dom渲染之后才能初始化echarts实例，不然报错
    var myChart = echarts.init(document.getElementById('main'))

    // *4.准备数据和配置项
    // api获取的数据
    var reportData = await this.getReportData()
    console.log(reportData)
    // 将数据与配置合并
    const result = _.merge(reportData, this.options)
    console.log(result)
    // *5.应用数据和配置项，展示数据
    myChart.setOption(result)
  },
  methods: {
    async getReportData() {
      const { data: res } = await this.$http.get('reports/type/1')
      if (res.meta.status !== 200) {
        return this.$message.error('获取数据失败')
      }
      // console.log(res.data)
      return res.data
    }
  }
}
</script>
<style lang="less" scoped>
#main {
  width: 100%;
  height: 400px;
}
</style>
