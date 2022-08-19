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
            <span style="color: #6a4d8a;">项目简介</span>
          </div>
          <div class="cc-body">
            <div class="broad">
              <p> 基于虚拟化的物联网设备固件自动化测试与分析平台的三个创新点：</p>
              <p>
                一是利用外设多模型融合建模，将现有顶级论文中的多个外设仿真模型进行融合，优势互补，从而提高了准确度，扩大了适用范围。
              </p>
              <p>
                二是优化的模糊测试方案。和之前工作仅仅挪用传统模糊测试不同，本项目根据物联网设备的特点，对模糊测试的三大关键部分进行了优化。在测试用例生成中，利用符号执行有针对性地选取种子；在执行路径反馈中，排除了中断路径的干扰；在无声崩溃的检测中，提出了辅助崩溃堆栈异常检测算法。
              </p>
              <p>
                三是可拓展性强。对于不同的外设仿真模型，可以以插件的形式进行添加、替换和融合使用，无需二次修改原始的仿真工具，实现了外设仿真与模糊测试的解耦
              </p>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="card-intro" shadow="hover" style="height: 480px;">
          <div slot="header" class="cc-header">
            <span style="color: #f18b6d;">快速使用</span>
          </div>
          <div class="cc-body">
            <div class="start">
              <li>准备固件</li>
              <li>上传固件</li>
              <li>外设分析，确定测试方法</li>
              <li>等待测试结果</li>
              <li>分析结果</li>
              <div class="reference" style="color: #f18b6d;">
                <span @click="toSolidWareUpload()">点击此处快速开始</span>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="card-intro" shadow="hover" style="height: 480px;">
          <div slot="header" class="cc-header">
            <span style="color: #f1d204;">安全内参</span>
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
          cardHeader: "整体框架",
          imgUrl: require("@/assets/hpage-frame.png"),
        },
        {
          cardHeader: "多模型融合",
          imgUrl: require("@/assets/hpage-multimodel.jpg"),
        },
        {
          cardHeader: "模糊测试改进",
          imgUrl: require("@/assets/hpage-ok.png"),
        },
      ]
    }
  },
  methods: {
    toSolidWareUpload() {
      this.$router.push('/FuzzManage/SolidWareUpload')
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
    margin-top: 10px;
    width: 90%;
    height: 90%;
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

      a,
      span {
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

