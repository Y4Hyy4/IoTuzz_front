<template>
  <div class="SolidWareUpload" v-loading="loading">

    <el-dialog :title="operateType === 'add' ? '新增' : '更新'" :visible.sync="isDialogShow">

      <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">

        <el-form-item label="固件名称" prop="name">
          <el-input v-model="formData.name" placeholder="请输入固件名称" clearable prefix-icon='el-icon-cpu'
            :style="{ width: '100%' }"></el-input>
        </el-form-item>

        <el-form-item label="负责人名称" prop="duty">
          <el-input v-model="formData.duty" placeholder="请输入负责人名称" clearable prefix-icon='el-icon-user'
            :style="{ width: '100%' }"></el-input>
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
        <el-button @click="isDialogShow = false">取消</el-button>
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

    <el-drawer class='drawer' :visible.sync="isDrawerShow" direction="rtl" :before-close="handleDrawerClose" size="23%"
      ref="drawer">
      <div slot="title" style="font-size: 22px; color: dodgerblue;">
        分析外设种类以及推荐模型如下
      </div>

      <div class="drawer-content">
        <div class="drawer-content-body">
          <el-form :model="peripheralsForm">
            <el-form-item v-for="item in peripheralsLabel" :key="item.label" :label="item.label" label-width="100px">
              <el-select v-model="peripheralsForm[item.label]" placeholder="改变推荐模型">
                <el-option v-for="(item, index) in testTypeOptions" :key="index" :label="item.label" :value="item.label"
                  :disabled="item.disabled"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>

        <div class="drawer-content-footer">
          <el-button style="width: 45%;" type="primary" @click="$refs.drawer.closeDrawer()" :loading="drawerLoading">
            {{ drawerLoading ? '提交中 ...' : '确定' }}
          </el-button>
          <el-button style="width: 45%;" @click="cancelDrawForm">取 消</el-button>
        </div>
      </div>
    </el-drawer>

    <div class="firmware-table">
      <el-table :data="tableData" style="width:100% ;font-size: 18px" height="95%">
        <el-table-column prop="name" label="固件名" fixed="left" width="220" align="center">
        </el-table-column>
        <el-table-column prop="duty" label="负责人名" width="200" align="center">
        </el-table-column>
        <el-table-column prop="created" label="上传时间" min-width="180" align="center">
        </el-table-column>
        <el-table-column label="操作" min-width="250px" fixed="right" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="peripherals(scope.row)" type="primary">外设分析</el-button>
            <el-button size="mini" @click="testFirmWare(scope.row)" type="success">测试</el-button>
            <el-button size="mini" @click="editSolidWare(scope.row)" type="info">编辑</el-button>
            <el-button size="mini" @click="delSolidWare(scope.row)" type="danger">删除</el-button>
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
import axios from 'axios'
import { calc_type } from "@/utils/calc_type"

export default {
  name: 'solidWareUpload',
  components: {
    CommonForm,
  },
  data() {
    return {
      operateType: 'add',
      isDialogShow: false,
      isDrawerShow: false,
      loading: false,
      drawerLoading: false,
      formData: {
        name: '',
        duty: '',
        file: '',
      },
      drawRow: {
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
      peripheralsForm: {
        'SPU': "p²im",
        'U2C': "μEmu",
        'UART': "p²im",
        'PWM': "p²im",
        'DAC': "μEmu",
        'GPIO': "fuzzware",
        'DMA': "hal-fuzz",
      },
      peripheralsLabel: [
        {
          label: 'SPU',
        },
        {
          label: 'U2C',
        },
        {
          label: 'UART',
        },
        {
          label: 'PWM',
        },
        {
          label: 'DAC',
        },
        {
          label: 'GPIO',
        },
        {
          label: 'DMA',
        }
      ],
      firmwareFiles: [],
      limit: 1,
      testTypeOptions: [{
        "label": "fuzzware",
      }, {
        "label": "μEmu",
      }, {
        "label": "p²im",
      }, {
        "label": "hal-fuzz",
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
    peripherals(row) {
      this.drawRow = row
      this.loading = true
      setTimeout(() => {
        this.loading = false
        this.isDrawerShow = true
      }, 1000);
      console.log(row)
    },
    cancelDrawForm() {
      this.drawLoading = false;
      this.isDrawerShow = false;
      this.drawRow = {}
      // clearTimeout(this.timer);
    },
    handleDrawerClose() {
      if (this.drawerLoading) {
        return;
      }
      this.$confirm('确定要提交表单吗？')
        .then(() => {
          this.drawerLoading = true;
          // console.log(this.peripheralsForm)
          // console.log(calc_type(this.peripheralsForm))
          axios({
            method: 'patch',
            url: '/api/firmware/' + this.drawRow.id + '/',
            data: {
              test_type: calc_type(this.peripheralsForm)
            },
            headers: { 'Authorization': 'Bearer ' + this.$store.state.user.token }
          })
          setTimeout(() => {
            this.drawerLoading = false
            this.isDrawerShow = false
          }, 400)
        })
    },
    testFirmWare(row) {
      this.$confirm('是否确定开始漏洞测试？', '提示', {
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
          .then((res) => {
            console.log(res)
            let testState = {
              file_path: row.file_path,
              test_type: row.test_type,
              test_pid: res.data.pid,
            }
            this.$store.commit("clearTestState")
            this.$store.commit("setTestState", testState);
            this.$router.push('/FuzzManage/Monitor')
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消测试',
        })
      })
    },
    confirm() {
      if (this.operateType === 'edit') {
        console.log(this.formData)
        axios({
          method: 'patch',
          url: '/api/firmware/' + this.formData.id + '/',
          data: this.formData,
          headers: { 'Authorization': 'Bearer ' + this.$store.state.user.token }
        }).then(() => {
          this.isDialogShow = false
          this.tableData = []
          this.formData = {}
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
          this.isDialogShow = false
          this.tableData = []
          this.formData = {}
          this.getList()
        })
      }
    },
    addSolidWare() {
      this.isDialogShow = true
      this.operateType = 'add'
      this.formData = {
        name: '',
        duty: '',
        test_type: '',
      }
    },
    editSolidWare(row) {
      this.isDialogShow = true
      this.operateType = 'edit'
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
            // switch (item.test_type) {
            //   case 0:
            //     item.typeLabel = 'fuzzware'
            //     break
            //   case 1:
            //     item.typeLabel = 'μEmu'
            //     break
            //   case 2:
            //     item.typeLabel = 'p²im'
            //     break
            //   case 3:
            //     item.typeLabel = 'half-fuzz'
            //     break
            //   default:
            //     break;
            // }
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

.drawer-content {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .drawer-content-footer {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 5px;
  }

  // .drawer-content {
  //   align-items: flex-start;
  // }
  // .drawer-footer {
  //   align-items: flex-end;

  //   .drawer-btn {
  //     flex: 0 0 0.5;
  //   }
  // }
}
</style>