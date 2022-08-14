<template>
  <div class="homepage">
    <el-carousel :interval="4000" type="card" height="500px">
      <el-carousel-item v-for="item in carouselData" :key="item.cardHeader">
        <el-card class="card-carousel" shadow="hover">
          <div slot="header" class="ccl-header">
            <span>{{ item.cardHeader }}</span>
          </div>
          <div class="ccl-body">
            <img :src="item.imgUrl" alt="" />
          </div>
        </el-card>
      </el-carousel-item>
    </el-carousel>
    <el-row :gutter="12">
      <el-col :span="8">
        <el-card class="card-intro" shadow="hover" style="height: 480px;">
          <div slot="header" class="cc-header">
            <span style="color: #f18b6d;">公告栏</span>
          </div>
          <div class="cc-body">
            <div class="broad">
              <p> 2022年5月4日</p>
              <p> 此次测试为核心内容测试 </p>
              <p>
                在计算中，固件是一类特定的计算机软件，为设备的特定硬件提供低级控制。固件，例如个人计算机的BIOS，可以包含设备的基本功能，并且可以向更高级别的软件（例如操作系统）提供硬件抽象服务。对于不太复杂的设备，固件可以作为设备的完整操作系统，执行所有控制、监控和数据操作功能。包含固件的设备的典型示例包括嵌入式系统（运行嵌入式软件）、家用和个人用品、计算机和计算机外围设备。
                固件保存在非易失性存储器设备中，如ROM、EPROM、EEPROM和闪存。更新固件要求物理更换ROM集成电路，或通过特殊程序重新编程EPROM或闪存。[1]
                某些固件内存设备是永久安装的，制造后无法更改。更新固件的常见原因包括修复错误或向设备添加功能。</p>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="card-intro" shadow="hover" style="height: 480px;">
          <div slot="header" class="cc-header">
            <span style="color: #f1d204;">快速使用</span>
          </div>
          <div class="cc-body">
            <div class="start">
              <li>准备希望测试的固件(.elf)</li>
              <li>点击固件管理模块中固件上传</li>
              <li>新建固件</li>
              <li>配置信息</li>
              <li>开始测试</li>
              <li>等待测试结果</li>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="card-intro" shadow="hover" style="height: 480px;">
          <div slot="header" class="cc-header">
            <span style="color: #6a4d8a;">安全内参</span>
          </div>
          <div class="cc-body">
            <div class="reference">
              <a href="https://zhuanlan.zhihu.com/p/37715216" target="_blank">内存映射IO (MMIO) 简介</a>
            </div>
            <div class="reference">
              <a href="https://zhuanlan.zhihu.com/p/56332152" target="_blank">符号执行技术总结</a>
            </div>
            <div class="reference">
              <a href="https://github.com/fuzzware-fuzzer/fuzzware" target="_blank">fuzzware</a>
            </div>
            <div class="reference">
              <a href="https://github.com/RiS3-Lab/p2im" target="_blank">p²im</a>
            </div>
            <div class="reference">
              <a href="https://github.com/MCUSec/uEmu" target="_blank">uEmu</a>
            </div>
            <div class="reference">
              <a href="https://zhuanlan.zhihu.com/p/43432370" target="_blank">模糊测试fuzzing技术总结</a>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>

</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      carouselData: [
        {
          cardHeader: "多模型选择",
          imgUrl: require("@/assets/hpage-list.png"),
        },
        {
          cardHeader: "可视化界面",
          imgUrl: require("@/assets/hpage-graph.png"),
        },
        {
          cardHeader: "高效可靠",
          imgUrl: require("@/assets/hpage-eff.png"),
        },
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

.el-card ::v-deep .el-card__body {
  background-color: #fff;
}

.el-card ::v-deep .el-card__header {
  background-color: #f5f6f7;
}

.card-carousel {
  height: 100%;
  text-align: center;
  font-family: Fira Code, '苹方', Courier, monospace;

  .ccl-header {
    font-size: 30px;
  }

  img {
    width: 50%;
    height: 50%;
  }
}

.card-intro {
  height: 100%;
  text-align: center;
  font-family: Fira Code, '苹方', Courier, monospace;

  .cc-header {
    font-size: 30px;
  }

  .cc-body {
    font-size: 30px;

    .broad {
      padding: 20px;

      p {
        text-indent: 2em;
        line-height: 1.5em;
        font-size: 16px;
        text-align: left;
      }
    }

    .start {
      padding: 20px;

      li {
        text-indent: 2em;
        line-height: 2em;
        font-size: 24px;
        text-align: left;
      }
    }

    .reference {
      padding: 5px;
      a {
        line-height: 2em;
        font-size: 24px;
        text-align: left;
        cursor: pointer;
        text-decoration: none;
        display: inline-block;
        position: relative;

        &:after {
          content: "";
          display: block;
          position: absolute;
          width: 0;
          bottom: 0;
          height: 2px;
          margin: -5px 0;
          right: 0;
          background-color: #000;
          transition: all 0.4s ease-in 0s;
        }

        &:hover:after {
          width: 100%;
        }
      }
    }
  }
}
</style>

