<template>
  <div id="data-view">
    <dv-border-box-1 class="main-container">
      <div class="right-main-container">
        <div class="rmc-top-container">
          <dv-border-box-3 class="rmctc-left-container">

            <Center-Cmp />

          </dv-border-box-3>

          <div class="rmctc-right-container">
            <dv-border-box-3 class="rmctc-chart-1">

              <Right-Chart-1 />

            </dv-border-box-3>

            <dv-border-box-4 class="rmctc-chart-2" :reverse="true">

              <Right-Chart-2 />

            </dv-border-box-4>
          </div>
        </div>
      </div>
    </dv-border-box-1>
  </div>
</template>

<script>
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
