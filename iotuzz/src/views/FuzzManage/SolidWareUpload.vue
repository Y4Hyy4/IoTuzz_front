<template>
  <div class="SolidWareUpload">

    <el-dialog :title="operateType === 'add' ? '新增' : '更新'" :visible.sync="isShow">

      <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">

        <el-form-item label="固件名称" prop="name">
          <el-input v-model="formData.name" placeholder="请输入固件名称" clearable prefix-icon='el-icon-cpu'
            :style="{ width: '100%' }"></el-input>
        </el-form-item>

        <el-form-item label="负责人名称" prop="duty">
          <el-input v-model="formData.duty" placeholder="请输入负责人名称" clearable prefix-icon='el-icon-user'
            :style="{ width: '100%' }"></el-input>
        </el-form-item>

        <el-form-item label="测试方法" prop="test_type">
          <el-select v-model="formData.test_type" placeholder="请选择测试方法" clearable :style="{ width: '100%' }">
            <el-option v-for="(item, index) in testTypeOptions" :key="index" :label="item.label" :value="item.value"
              :disabled="item.disabled"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="固件上传" prop="file" required>
          <el-upload ref="upload" action="/api/fileUploader/" :on-success="getFilePath" :on-remove="removeFile"
            :limit="limit" :on-exceed="exceedFile" :file-list="firmwareFiles" :before-upload="firmwareBeforeUpload">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">固件(.elf)</div>
          </el-upload>

        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" @click="addSolidWare">新增</el-button>
      <common-form :form-label="searchLabel" :form.sync="searchForm" :inline="true" ref="form"
        @keyup.enter="getList(searchForm.keyword)">
        <el-button type="primary" @click="getList(searchForm.keyword)">搜索</el-button>
      </common-form>
    </div>

    <div class="firmware-table">
      <el-table :data="tableData" style="width:100%" height="95%">
        <el-table-column prop="name" label="固件名" fixed="left" width="220" align="center">
        </el-table-column>
        <el-table-column prop="duty" label="负责人名" width="180" align="center">
        </el-table-column>
        <el-table-column prop="typeLabel" label="测试方法" width="180" align="center">
        </el-table-column>
        <el-table-column label="操作" min-width="250px" fixed="right" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="testFirmWare(scope.row)" type="success">测试</el-button>
            <el-button size="mini" @click="editSolidWare(scope.row)">编辑</el-button>
            <el-button size="mini" @click="delSolidWare(scope.row)" type="danger">删除</el-button>
            <el-button size="mini" @click="getTestReport(scope.row)" type="primary">报告</el-button>
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
import CommonForm from '@/components/CommonForm'
// import axios from '@/api/axios'
import axios from 'axios'

export default {
  name: 'solidWareUpload',
  components: {
    CommonForm,
  },
  data() {
    return {
      operateType: 'add',
      isShow: false,
      formData: {
        name: '',
        duty: '',
        test_type: '',
        file: '',
      },
      rules: {
        name: [{
          required: true,
          message: '请输入固件名称',
          trigger: 'blur'
        }],
        duty: [{
          required: true,
          message: '请输入负责人名称',
          trigger: 'blur'
        }],
        test_type: [{
          required: true,
          message: '请选择测试方法',
          trigger: 'change'
        }],
      },
      firmwareFiles: [],
      limit: 1,
      testTypeOptions: [{
        "label": "fuzzware",
        "value": 0
      }, {
        "label": "μEmu",
        "value": 1
      }, {
        "label": "p²im",
        "value": 2
      }, {
        "label": "hal-fuzz",
        "value": 3
      }],
      searchLabel: [
        {
          model: "keyword",
          label: "",
          type: "input",
        },
      ],
      searchForm: {
        keyword: ''
      },
      tableData: [],
      tableLabel: [
        {
          prop: 'name',
          label: '固件名',
        },
        {
          prop: 'duty',
          label: '负责人名',
        },
        {
          prop: 'typeLabel',
          label: '测试方法',
          width: 200,
        },
      ],
      config: {
        page: 1,
        total: 30,
      },
    }
  },
  methods: {
    // 得到上传后的文件路径
    getFilePath(res) {
      this.$message({
        message: '上传成功',
        type: 'success'
      })
      this.formData.file_path = res.file.substr(22)
    },
    // 移除文件的钩子
    removeFile(file) {
      this.$message({
        message: `成功移除${file.name}`,
        type: 'success'
      })
      console.log(file)
    },
    exceedFile(file) {
      this.$message({
        message: '上传失败，只能上传一个文件',
        type: 'warning'
      })
      console.log(file)
    },
    firmwareBeforeUpload(file) {
      let isRightSize = file.size / 1024 / 1024 < 1
      if (!isRightSize) {
        this.$message.error('文件大小超过 1MB')
      }
      return isRightSize
    },
    confirm() {
      if (this.operateType === 'edit') {
        axios({
          method: 'patch',
          url: '/api/firmware/',
          data: this.formData,
          headers: { 'Authorization': 'Bearer ' + this.$store.state.user.token }
        }).then(() => {
          this.isShow = false
          this.tableData = []
          this.getList()
        })
      } else {
        console.log(this.formData)
        axios({
          method: 'post',
          url: '/api/firmware/',
          data: this.formData,
          headers: { 'Authorization': 'Bearer ' + this.$store.state.user.token }
        }).then(() => {
          this.isShow = false
          this.tableData = []
          this.getList()
        })
      }

    },
    testFirmWare(row) {
      this.$confirm('是否确定开始测试？', '提示', {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        // console.log(row)
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
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消测试',
        })
      })

    },
    addSolidWare() {
      this.isShow = true
      this.operateType = 'add'
      this.formData = {
        name: '',
        duty: '',
        test_type: '',
      }
    },
    editSolidWare(row) {
      this.isShow = true
      this.operateType = 'edit'
      // console.log(row)
      this.formData = row
    },
    delSolidWare(row) {
      this.$confirm('此操作将永久删除此组件，是否继续？', '提示', {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        console.log(row)
        axios({
          method: 'delete',
          url: '/api/firmware/' + row.id + '/',
          headers: { 'Authorization': 'Bearer ' + this.$store.state.user.token }
        })
          .then(res => {
            console.log(res)
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.tableData = []
            this.getList()
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
        })
      })
    },
    getList() {
      axios({
        method: 'get',
        url: '/api/firmware/',
        headers: { 'Authorization': 'Bearer ' + this.$store.state.user.token }
      })
        .then((res) => {
          res = res.data.results
          this.tableData = res.map(item => {
            switch (item.test_type) {
              case 0:
                item.typeLabel = 'fuzzware'
                break
              case 1:
                item.typeLabel = 'μEmu'
                break
              case 2:
                item.typeLabel = 'p²im'
                break
              case 3:
                item.typeLabel = 'half-fuzz'
                break
              default:
                break;
            }
            return item
          })
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

.firmware-table {
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