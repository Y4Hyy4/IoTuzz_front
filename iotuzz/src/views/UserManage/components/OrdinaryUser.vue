<template>
  <el-row class="home" :gutter="20">
    <el-col :span="8" style="margin-top: 20px">
      <el-card shadow="hover" style="height: 280px;">
        <div class="user">
          <img :src="userIcon">
          <div class="userinfo">
            <p class="name">Admin</p>
            <p class="access">管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间：<span>2022-06-10</span></p>
          <p>上次登录地点：<span>湖北武汉</span></p>
        </div>
      </el-card>
      <el-card style="margin-top: 20px; height: 460px">
        <el-table :data="tableData">
          <el-table-column v-for="(val, key) in tableLabel" :key="key" :label="val" :prop="key"></el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" style="margin-top: 20px">
      <!-- <div class="num">
        <el-card v-for="item in countData" :key="item.name" :body-style="{ display: 'flex', padding: 0 }">
          <i class="icon" :class="`el-icon-${item.icon}`" :style="{ backgroundColor: item.color }"></i>
          <div class="detail">
            <p class="num">￥{{ item.value }}</p>
            <p class="txt">{{ item.name }}</p>
          </div>
        </el-card>
      </div> -->
      <el-card style="height: 280px">
        <ECharts :chartData="echartData.order" style="height: 240px;"></ECharts>
      </el-card>
      <div class="graph">
        <el-card style="height: 460px">
          <ECharts :chartData="echartData.user" style="height: 400px;"></ECharts>
        </el-card>
        <el-card style="height: 460px">
          <ECharts :chartData="echartData.video" :isAxisChart="false" style="height: 400px;"></ECharts>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>
<script>
import { getData } from "../../../api/api.js"
import ECharts from "@/components/ECharts.vue"
export default {
  name: 'OrdinaryUser',
  components: {
    ECharts
  },
  data() {
    return {
      userIcon: require('../../../assets/avatar-01.png'),
      tableData: [],
      tableLabel: {
        name: '用户名',
        todayUpload: '今日提交',
        todayTest: '今日检测',
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
      echartData: {
        order: {
          xData: [],
          series: [],
        },
        user: {
          xData: [],
          series: [],
        },
        video: {
          series: [],
        },
      }
    }
  },
  mounted() {
    getData().then(res => {
      // console.log(res)
      const { code, data } = res.data
      if (code === 200) {
        this.tableData = data.tableData
        const keyArray = Object.keys(data.orderData.data[0])
        const series = []
        keyArray.forEach(key => {
          series.push({
            name: key,
            data: data.orderData.data.map(item => item[key]),
            type: 'line'
          })
        })
        this.echartData.order.xData = data.orderData.date
        this.echartData.order.series = series

        this.echartData.user.xData = data.userData.map(item => item.date)
        this.echartData.user.series = [
          {
            name: '新增用户',
            data: data.userData.map(item => item.new),
            type: 'bar'
          },
          {
            name: '活跃用户',
            data: data.userData.map(item => item.active),
            type: 'bar'
            // bar 表示柱状图
          }
        ]

        this.echartData.video.series = [
          {
            data: data.videoData,
            type: 'pie'
          }
        ]
      }
    })
  }
}
</script>