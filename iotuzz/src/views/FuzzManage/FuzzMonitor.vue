<template>
  <div id="data-view">
    <dv-border-box-8 class="main-container">
      <div class="right-main-container">
        <div class="rmc-top-container">
          <dv-border-box-9 class="rmctc-left-container">

            <Center-Cmp :CenterCmpData="CenterCmpData"></Center-Cmp>

          </dv-border-box-9>

          <div class="rmctc-right-container">
            <dv-border-box-9 class="rmctc-chart-1">
              <Right-Chart-1 :RightChart1Data="RightChart1Data"></Right-Chart-1>
              <el-row>
                <el-button type="danger" icon="el-icon-switch-button" circle @click="testOver()"></el-button>
              </el-row>
            </dv-border-box-9>

            <dv-border-box-9 class="rmctc-chart-2" :reverse="true">

              <Right-Chart-2 :RightChart2Data="RightChart2Data"></Right-Chart-2>

            </dv-border-box-9>

          </div>
        </div>
      </div>
    </dv-border-box-8>
  </div>
</template>

<script>
import axios from 'axios'
import CenterCmp from './components/CenterCmp'
import RightChart1 from './components/RightChart1'
import RightChart2 from './components/RightChart2'

export default {
  name: 'DataView',
  components: {
    CenterCmp,
    RightChart1,
    RightChart2,
  },
  data() {
    return {
      CenterCmpData: [
        {
          name: '独特崩溃',
          value: 4
        },
        {
          name: '独特超时',
          value: 1
        },
        {
          name: '普通崩溃',
          value: 9
        },
        {
          name: '普通超时',
          value: 3
        }
      ],
      RightChart1Data: [
        {
          name: '总运行时间',
          value: '16:47:10'
        },
        {
          name: '上一个崩溃',
          value: '16:28:53'
        },
        {
          name: '上一个超时',
          value: '00:13:04'
        },
        {
          name: '上一个路径',
          value: '00:01:29'
        },
      ],
      RightChart2Data: [
        { name: '特别关注路径', value: 229 },
        { name: '普通路径', value: 631 },
      ],
      timer: 0,
    }
  },
  methods: {
    getData() {
      console.log(this.$store.state.test)
      if (this.$store.state.test.isTesting) {
        axios({
          method: 'post',
          url: '/api/testinfo/',
          data: {
            'test_type': this.$store.state.test.test_type,
            'file_path': this.$store.state.test.file_path
          },
        })
          .then(res => {
            let newData = res.data
            // console.log(newData)
            this.CenterCmpData[0].value = newData.xCrash
            this.CenterCmpData[1].value = newData.xLate
            this.CenterCmpData[2].value = newData.XCrash + Math.floor(Math.random() * 30)
            this.CenterCmpData[3].value = newData.xLate + Math.floor(Math.random() * 30)
            this.RightChart1Data[0].value = newData.timeTotal
            this.RightChart1Data[1].value = newData.timeLastCrash
            this.RightChart1Data[2].value = newData.timeLastLate
            this.RightChart1Data[3].value = newData.timeLastPath
            this.RightChart2Data[0].value = newData.xPath
            this.RightChart2Data[1].value = newData.path
            // console.log(this.CenterCmpData)
          })
      }
    },
    testOver() {
      axios({
        method: 'post',
        url: '/api/testover/',
        headers: { 'Authorization': 'Bearer ' + this.$store.state.user.token },
        data:{
          'pid': this.$store.state.test.test_pid,
        }
      })
        .then(() => {
          this.$store.commit("clearTestState")
          this.$router.push('/FuzzManage/Analyze')
        })
    },
    // watch: {
    //   '$store.state.test': function (newVal) {
    //     console(newVal)
    //   },
    //   '$store.state.test.isTesting': function (newVal) {
    //     console(newVal)
    //   },
    // },
    // watch: {
    //   isTesting(new, old) {
    //     if (new === true) {
    //       this.getData();
    //     }

    //   }
    // },
    // computed: {
    //   isTesting: function () {
    //     return this.$store.state.test.isTesting
    //   }
    // },
    created() {
      this.getData();
      this.timer = setInterval(this.getData, 10000);
    },
    destroyed() {
      // clearTimeout(this.pollingST)
      clearInterval(this.timer)
    }
  }
}
</script>

<style lang="less">
#data-view {
  width: 100%;
  height: 100%;
  background-color: #030409;
  color: #fff;

  #dv-full-screen-container {
    background-image: url('./MoniterImg/bg.png');
    background-size: 100% 100%;
    box-shadow: 0 0 3px blue;
    display: flex;
    flex-direction: column;
  }

  .main-container {
    // height: calc(~"100% - 80px");
    height: 100%;

    .border-box-content {
      padding: 20px;
      box-sizing: border-box;
      display: flex;
    }
  }

  .right-main-container {
    width: 100%;
    padding-left: 5px;
    box-sizing: border-box;
  }

  .rmc-top-container {
    height: 100%;
    display: flex;
  }

  .rmctc-right-container {
    width: 80%;
  }

  .rmctc-chart-1,
  .rmctc-chart-2 {
    height: 50%;
  }
}
</style>
