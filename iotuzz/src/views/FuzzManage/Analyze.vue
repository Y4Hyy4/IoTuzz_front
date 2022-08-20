<template>
  <div class="Analyze">
    <div class="crash-table">
      <div style="height: 10%; padding-top: 5px;">
        <el-divider content-position="left">
          <span style="font-size: 28px; color: dodgerblue;">统计数据</span>
        </el-divider>
      </div>
      <el-table :data="stateData" style="width:100%; font-size:18px" height="15%">
        <el-table-column prop="timeTotal" label="总运行时间" fixed="left" width="240" align="center">
        </el-table-column>
        <el-table-column prop="xCrash" label="崩溃数" fixed="left" min-width="50" align="center">
        </el-table-column>
        <el-table-column prop="xLate" label="超时数" fixed="left" min-width="50" align="center">
        </el-table-column>
        <el-table-column prop="xLate" label="路径数" fixed="left" min-width="50" align="center">
        </el-table-column>
        <el-table-column label="覆盖率文件" min-width="200px" fixed="right" align="center">
          <template>
            <el-button size="mini" @click="downloadState()" type="primary">下载</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div style="height: 20%; padding-top: 50px;">
        <el-divider content-position="left">
          <span style="font-size: 28px; color: dodgerblue">漏洞测试分析</span>
        </el-divider>
      </div>

      <el-table :data="tableData" style="width:100%; font-size: 18px" height="70%">
        <el-table-column prop="id" label="编号" fixed="left" width="120" align="center">
        </el-table-column>
        <el-table-column prop="type" label="类型" fixed="left" width="120" align="center">
        </el-table-column>
        <el-table-column prop="name" label="名称" min-width="60" align="center">
        </el-table-column>

        <el-table-column prop="vulnerableFile" label="漏洞触发文件" width="180" align="center">
        </el-table-column>
        <el-table-column label="下载漏洞触发文件分析" min-width="200px" fixed="right" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="downloadCrash(scope.row)" type="primary">下载</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination class="pager" layout="prev, pager, next" :total="config.total" :current-page.sync="config.page"
        @current-change="getList()" :page-size="20" :pager-counter="5" background>
      </el-pagination>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'analyze',
  components: {

  },
  data() {
    return {
      stateData: [
        {
          timeTotal: 0,
          xCrash: 0,
          xLate: 0,
        }
      ],
      tableData: [
        {
          id: 1,
          type: "crash",
          name: "crash001",
          vulnerableFile: '/xx/xx/xx/xx',
        },
        {
          id: 2,
          type: "hang",
          name: "hang001",
          vulnerableFile: '/xx/xx/xx/xx',
        }
      ],
      config: {
        page: 1,
        total: 30,
      },
    }
  },
  methods: {
    getStateResult() {
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
          this.$set(this.stateData[0], 'timeTotal', newData.timeTotal)
          this.$set(this.stateData[0],'xCrash', newData.xCrash)
          this.$set(this.stateData[0],'xLate', newData.xLate)

          // this.stateData[0].timeTotal = newData.timeTotal
          // this.stateData[0].xCrash = newData.xCrash
          // this.stateData[0].xLate = newData.xLate
          // console.log(this.CenterCmpData)
        })
    },
    getTestResult(row) {
      axios({
        method: 'post',
        url: '/api/firmware/call/',
        headers: { 'Authorization': 'Bearer ' + this.$store.state.user.token },
        data: row
      })
        .then(() => {
          // console.log(row)
          let testState = {
            file_path: row.file_path,
            test_type: row.test_type
          }
          this.$store.commit("clearTestState")
          this.$store.commit("setTestState", testState);
          console.log(this.$store.state.test)
          this.$router.push('/FuzzManage/Monitor')
        })
    },
    getList() {
      axios({
        method: 'post',
        url: '/api/crashinfo/',
        data: {
          "file_path": "haha",
          "test_type": 1
        },
        headers: { 'Authorization': 'Bearer ' + this.$store.state.user.token }
      })
        .then((res) => {
          console.log(res)
          this.tableData = res.data.crash
        })
    },
    downloadState() {
      const anchor = document.createElement("a");
      anchor.href = `${process.env.BASE_URL}static/coverage/coverage.txt`;
      anchor.setAttribute("download", 'coverage.txt');
      anchor.innerHTML = "downloading...";
      anchor.style.display = "none";
      document.body.appendChild(anchor);
      setTimeout(() => {
        anchor.click();
        document.body.removeChild(anchor);
        setTimeout(() => { self.URL.revokeObjectURL(anchor.href); }, 250);
      }, 66);
    },
    downloadCrash(row) {
      console.log(row)
    },
  },
  created() {
    this.getStateResult()
    this.getList()
  }
}
</script>

<style lang="less" scoped>
.manage-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.crash-table {
  height: calc(100% - 62px);
  background-color: white;
  position: relative;

  .pager {
    position: absolute;
    bottom: 0;
    right: 20px;
  }
}
</style>