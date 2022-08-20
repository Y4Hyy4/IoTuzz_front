<template>
  <div class="right-chart-2">
    <div class="rc1-header">可行路径探测</div>

    <div class="rc1-chart-container">
      <div class="left">
        <div>总路径数</div>
        <div class="number">{{ this.pathTotal }}</div>
      </div>

      <dv-charts class="right" :option="option" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'RightChart2',
  props: ['RightChart2Data'],
  data() {
    return {
      option: {
        series: [
          {
            type: 'pie',
            data: this.RightChart2Data,
            radius: ['45%', '65%'],
            insideLabel: {
              show: false
            },
            outsideLabel: {
              labelLineEndLength: 10,
              formatter: '{percent}%\n{name}',
              style: {
                fontSize: 14,
                fill: '#fff'
              }
            }
          }
        ],
        color: ['#00baff', '#3de7c9']
      }
    }
  },
  computed: {
    pathTotal: function () {
      return this.RightChart2Data[0].value + this.RightChart2Data[1].value
    }
  },
  watch: {
    RightChart2Data: {
      deep: true,
      handler(newVal) {
        console.log(newVal)
        this.config = { ...this.config }
      }
    }
  }
}
</script>

<style lang="less">
.right-chart-2 {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  font-family: Fira Code, '苹方', Courier, monospace;

  .rc1-header {
    font-size: 30px;
    font-weight: bold;
    height: 30px;
    line-height: 30px;
    padding: 20px 20px;
  }

  .rc1-chart-container {
    flex: 1;
    display: flex;
  }

  .left {
    width: 30%;
    font-size: 24px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .number {
      font-size: 34px;
      color: #096dd9;
      font-weight: bold;
      margin-top: 30px;
    }
  }

  .right {
    flex: 1;
    padding-bottom: 20px;
    padding-right: 20px;
    box-sizing: border-box;
  }
}
</style>
