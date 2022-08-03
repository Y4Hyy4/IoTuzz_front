<template>
  <div class="SolidWareUpload">
    <el-dialog :title="operateType === 'add' ? '新增' : '更新'" :visible.sync="isShow">
      <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">
        <el-form-item label="固件名称" prop="firmwareName">
          <el-input v-model="formData.firmwareName" placeholder="请输入固件名称" clearable prefix-icon='el-icon-cpu'
            :style="{ width: '100%' }"></el-input>
        </el-form-item>
        <el-form-item label="负责人名称" prop="name">
          <el-input v-model="formData.name" placeholder="请输入负责人名称" clearable prefix-icon='el-icon-user'
            :style="{ width: '100%' }"></el-input>
        </el-form-item>
        <el-form-item label="测试方法" prop="testType">
          <el-select v-model="formData.testType" placeholder="请选择测试方法" clearable :style="{ width: '100%' }">
            <el-option v-for="(item, index) in testTypeOptions" :key="index" :label="item.label" :value="item.value"
              :disabled="item.disabled"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="固件上传" prop="firmware" required>
          <el-upload ref="firmware" :file-list="firmwarefileList" :action="firmwareAction"
            :before-upload="firmwareBeforeUpload" name="firmware">
            <el-button size="small" type="primary" icon="el-icon-upload">上传固件</el-button>
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
        <el-table-column prop="firmwareName" label="固件名" fixed="left" width="220" align ="center">
        </el-table-column>
        <el-table-column prop="name" label="负责人名" width="180" align ="center">
        </el-table-column>
        <el-table-column prop="typeLabel" label="测试方法" width="180" align ="center">
        </el-table-column>
        <el-table-column label="操作" min-width="250px" fixed="right" align ="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="testFirmWare()" type="success">测试</el-button>
            <el-button size="mini" @click="editSolidWare(scope.row)">编辑</el-button>
            <el-button size="mini" @click="delSolidWare(scope.row)" type="danger">删除</el-button>
            <el-button size="mini" @click="getTestReport()" type="primary">报告</el-button>
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
import { getSolidWareList, callKit} from "@/api/api"

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
        firmwareName: '',
        name: '',
        testType: '',
      },
      rules: {
        firmwareName: [{
          required: true,
          message: '请输入固件名称',
          trigger: 'blur'
        }],
        name: [{
          required: true,
          message: '请输入负责人名称',
          trigger: 'blur'
        }],
        testType: [{
          required: true,
          message: '请选择测试方法',
          trigger: 'change'
        }],
      },
      firmwareAction: 'https://jsonplaceholder.typicode.com/posts/',
      firmwarefileList: [],
      testTypeOptions: [{
        "label": "fuzzware",
        "value": 0
      }, {
        "label": "sEmu",
        "value": 1
      }, {
        "label": "μEmu",
        "value": 2
      }, {
        "label": "p²im",
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
          prop: 'firmwareName',
          label: '固件名',
        },
        {
          prop: 'name',
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
    firmwareBeforeUpload(file) {
      let isRightSize = file.size / 1024 / 1024 < 1
      if (!isRightSize) {
        this.$message.error('文件大小超过 1MB')
      }
      return isRightSize
    },
    confirm() {
      if (this.operateType === 'edit') {
        this.$http.post('/solidWare/edit', this.formData).then(res => {
          console.log(res)
          this.isShow = false
          this.getList()
        })
      } else {
        this.$http.post('/solidWare/add', this.formData).then(res => {
          console.log(res)
          this.isShow = false
          this.getList()
        })
      }
    },
    addSolidWare() {
      this.isShow = true
      this.operateType = 'add'
      this.formData = {
        firmwareName: '',
        name: '',
        testType: '',
      }
    },
    getList(name = '') {
      this.config.loading = true
      name ? (this.config.page = 1) : ''
      console.log(getSolidWareList());
      getSolidWareList({
        page: this.config.page,
        name
      }).then((res) => {
        res = res.data
        console.log(res)
        this.tableData = res.list.map(item => {
          switch (item.testType) {
            case 0:
              item.typeLabel = 'fuzzware'
              break
            case 1:
              item.typeLabel = 'sEmu'
              break
            case 2:
              item.typeLabel = 'μEmu'
              break
            case 3:
              item.typeLabel = 'p²im'
              break
            default:
              break;
          }
          return item
        })
        this.config.total = res.count
        this.config.loading = true
      })
    },
    // testFirmWare(row) {
    //     const id = row.id
    //     this.$http.post('/solidWare/test', {
    //       id:id
    //     }).then(res => {
    //       console.log(res)
    //       this.$router.push('/FuzzManage/Monitor')
    //     })
    // },
    testFirmWare() {
      callKit()
      this.$router.push('/FuzzManage/Monitor')
    },
    editSolidWare(row) {
      this.isShow = true
      this.operateType = 'edit'
      console.log(row)
      this.formData = row
    },
    delSolidWare(row) {
      this.$confirm('此操作将永久删除此组件，是否继续？', '提示', {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        const id = row.id
        this.$http.post('/solidWare/del', {
          id: id
        }).then(res => {
          console.log(res)
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.getList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除',
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