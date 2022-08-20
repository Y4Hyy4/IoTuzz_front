<template>
  <div class="right-chart-1">
    <div class="rc1-header">时间窗口</div>

    <div class="rc1-chart-container">
      <div class="left">
        <div>总运行时间</div>
        <div class="number">{{this.config.data[0].value}}</div>
      </div>

      <div class="right">
        <div class="rc1-details">
          <div>上一个非重复崩溃</div>
          <div class="number">{{this.config.data[1].value}}</div>

        </div>
        <div class="rc1-details">
          <div>上一个非重复超时</div>
          <div class="number">{{this.config.data[2].value}}</div>

        </div>
        <div class="rc1-details">
          <div>上一个路径</div>
          <div class="number">{{this.config.data[3].value}}</div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RightChart1',
  props: ['RightChart1Data'],
  data() {
    return {
      config: {
        data: this.RightChart1Data
      }
    }
  },
}
</script>

<style lang="less">
.right-chart-1 {
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
    padding: 20px 40px;
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

    .rc1-details {
      height: 33%;
      display: flex;
      justify-content: center;
      font-size: 20px;
      align-items: center;
    }

    .number {
      font-size: 28px;
      color: #096dd9;
      font-weight: bold;
      padding-left: 30px;
    }
  }
}
</style>
