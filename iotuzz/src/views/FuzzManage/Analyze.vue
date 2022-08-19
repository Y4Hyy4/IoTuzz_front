<template>
  <div class="Analyze">
    <div class="crash-table">
      <el-table :data="tableData" style="width:100%; font-size: 18px" height="95%">
        <el-table-column prop="id" label="崩溃编号" fixed="left" width="220" align="center">
        </el-table-column>
        <el-table-column prop="name" label="崩溃路径文件" width="180" align="center">
        </el-table-column>
        <el-table-column label="操作" min-width="250px" fixed="right" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="getTestResult(scope.row)" type="primary">下载</el-button>
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
      tableData: [],
      tableLabel: [
        {
          prop: 'id',
          label: '崩溃编号',
        },
        {
          prop: 'name',
          label: '崩溃名称',
        },
        // {
        //   prop: 'typeLabel',
        //   label: '测试方法',
        //   width: 200,
        // },
      ],
      config: {
        page: 1,
        total: 30,
      },
    }
  },
  methods: {
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
  },
  created() {
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