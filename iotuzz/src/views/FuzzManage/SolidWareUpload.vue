<template>
  <div class="SolidWareUpload">
    <el-dialog :title="operateType === 'add' ? '新增' : '更新'" :visible.sync="isShow">
      <common-form :form-label="operateFormLabel" :form.sync="operateForm" :inline="true" ref="form"></common-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>

      <el-upload drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" @click="addSolidWare">新增</el-button>
      <common-form :form-label="searchLabel" :form.sync="searchForm" :inline="true" ref="form"
        @keyup.enter="getList(searchForm.keyword)">
        <el-button type="primary" @click="getList(searchForm.keyword)">搜索</el-button>
      </common-form>
    </div>

    <common-table :table-data="tableData" :table-label="tableLabel" :config="config" @changePage="getList()"
      @edit="editSolidWare" @del="delSolidWare"></common-table>

  </div>
</template>

<script>
import CommonForm from '@/components/CommonForm'
import CommonTable from "@/components/CommonTable"
import { getSolidWareList } from "@/api/api"

export default {
  name: 'solidWareUpload',
  components: {
    CommonForm,
    CommonTable,
  },
  data() {
    return {
      operateType: 'add',
      isShow: false,
      operateFormLabel: [
        {
          model: "firmwareName",
          label: "固件名",
          type: "input",
        },
        {
          model: "name",
          label: "负责人名",
          type: "input",
        },
        {
          model: "testType",
          label: "测试方法",
          type: "select",
          opts:[
            {
              label: 'fuzzware',
              value: 0,
            },
            {
              label: 'sEmu',
              value: 1,
            },
            {
              label: 'μEmu',
              value: 2,
            },
            {
              label: 'p²im',
              value: 3,
            },
          ]
        },
      ],
      operateForm: {
        firmwareName:'',
        name: '',
        testType: '',
      },
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
    confirm() {
      if (this.operateType === 'edit') {
        this.$http.post('/solidWare/edit', this.operateForm).then(res => {
          console.log(res)
          this.isShow = false
          this.getList()
        })
      } else {
        this.$http.post('/solidWare/add', this.operateForm).then(res => {
          console.log(res)
          this.isShow = false
          this.getList()
        })
      }
    },
    addSolidWare() {
      this.isShow = true
      this.operateType = 'add'
      this.operateForm = {
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
    editSolidWare(row) {
      this.isShow = true
      this.operateType = 'edit'
      console.log(row)
      this.operateForm = row
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
</style>