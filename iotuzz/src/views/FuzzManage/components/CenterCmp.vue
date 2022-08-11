<template>
  <div class="center-cmp">
    <div class="cc-header">
      <dv-decoration-1 style="width:200px;height:50px;" />
      <div>监控窗口</div>
      <dv-decoration-1 style="width:200px;height:50px;" />
    </div>

    <div class="cc-details">
      <div style="margin-right: 40px;">崩溃用例</div>
      <div class="card">{{ Math.floor(this.crashTotal / 10) }}</div>
      <div class="card">{{ this.crashTotal % 10 }}</div>
    </div>
    <div class="cc-details">
      <div style="margin-right: 40px;">超时用例</div>
      <div class="card">{{ Math.floor(this.lateTotal / 10) }}</div>
      <div class="card">{{ this.lateTotal % 10 }}</div>
    </div>

    <div class="cc-main-container">
      <div class="ccmc-left">
        <div class="station-info">
          特殊崩溃用例<span>{{this.config.data[0].value}}</span>
        </div>
        <div class="station-info">
          特殊超时用例<span>{{this.config.data[1].value}}</span>
        </div>
      </div>

      <dv-active-ring-chart class="ccmc-middle" :config="config" />

      <div class="ccmc-right">
        <div class="station-info">
          <span>{{this.config.data[2].value}}</span>普通崩溃用例
        </div>
        <div class="station-info">
          <span>{{this.config.data[3].value}}</span>普通超时用例
        </div>
      </div>

      <LabelTag :config="labelConfig" />
    </div>
  </div>
</template>

<script>
import LabelTag from './LabelTag'

export default {
  name: 'CenterCmp',
  props: ['CenterCmpData'],
  components: {
    LabelTag
  },
  data() {
    return {
      config: {
        data: this.CenterCmpData,
        color: ['#00baff', '#3de7c9', '#fff', '#ffc530', '#469f4b'],
        lineWidth: 40,
        radius: '55%',
        activeRadius: '60%'
      },
      labelConfig: {
        data: ['特殊崩溃', '特殊超时', '普通崩溃', '普通超时']
      },
    }
  },
  mounted() {
    // console.log(this.config.data[0].value)
  },
  computed: {
    crashTotal: function () {
      return this.CenterCmpData[0].value + this.CenterCmpData[2].value
    },
    lateTotal: function () {
      return this.CenterCmpData[1].value + this.CenterCmpData[3].value
    }
  }
}
</script>

<style lang="less">
.center-cmp {
  width: 100%;
  height: 100%;
  margin: 0px;
  padding: 0px;
  display: flex;
  flex-direction: column;
  font-family: Fira Code, '苹方', Courier, monospace;

  .cc-header {
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 30px;
  }

  .cc-details {
    height: 150px;
    display: flex;
    justify-content: center;
    font-size: 32px;
    align-items: center;

    .card {
      background-color: rgba(4, 49, 128, .6);
      color: #08e5ff;
      height: 70px;
      width: 70px;
      font-size: 45px;
      font-weight: bold;
      line-height: 70px;
      text-align: center;
      margin: 15px;
    }
  }

  .cc-main-container {
    position: relative;
    flex: 1;
    display: flex;

    .ccmc-middle {
      width: 50%;
      height: 90%;

      .active-ring-name {
        font-size: 20px !important;
      }
    }

    .ccmc-left,
    .ccmc-right {
      width: 25%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      font-size: 24px;

      span {
        font-size: 40px;
        font-weight: bold;
      }

      .station-info {
        height: 80px;
        display: flex;
        align-items: center;
      }
    }

    .ccmc-left {
      align-items: flex-end;

      span {
        margin-left: 20px;
      }
    }

    .ccmc-right {
      align-items: flex-start;

      span {
        margin-right: 20px;
      }
    }
  }

  .label-tag {
    position: absolute;
    width: 500px;
    height: 30px;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
