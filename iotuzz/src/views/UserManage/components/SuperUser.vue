<template>
  <div class="superUser">
    <el-dialog :title="operateType === 'add' ? '新增' : '更新'" :visible.sync="isShow">
      <common-form :form-label="operateFormLabel" :form.sync="operateForm" :inline="true" ref="form"></common-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" @click="addUser">新增</el-button>
      <common-form :form-label="searchLabel" :form.sync="searchForm" :inline="true" ref="form"
        @keyup.enter="getList(searchForm.keyword)">
        <el-button type="primary" @click="getList(searchForm.keyword)">搜索</el-button>
      </common-form>
    </div>

    <common-table :table-data="tableData" :table-label="tableLabel" :config="config" @changePage="getList()"
      @edit="editUser" @del="delUser"></common-table>

  </div>
</template>

<script>
import CommonForm from '@/components/CommonForm'
import CommonTable from "@/components/CommonTable"
import { getUser } from "@/api/api"

export default {
  name: 'superUser',
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
          model: "username",
          label: "用户名",
          type: "input",
        },
        {
          model: "email",
          label: "邮箱",
          type: "input",
        },
        {
          model: "type",
          label: "用户类型",
          type: "select",
          opts: [
            {
              label: "个人",
              value: 0,
            },
            {
              label: "企业",
              value: 1,
            },
          ],
        },
        {
          model: "addr",
          label: "地址",
          type: "input",
        },
      ],
      operateForm: {
        username: '',
        type: '',
        email: '',
        addr: '',
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
          prop: 'username',
          label: '用户名',
        },
        {
          prop: 'email',
          label: '邮箱',
          width: 200,
        },
        {
          prop: 'typeLabel',
          label: '用户类型',
        },
        {
          prop: 'addr',
          label: '地址',
          width: 320
        },
        {
          prop: "solidWareNum",
          label: "固件上传数量",
        }
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
        this.$http.post('/user/edit', this.operateForm).then(res => {
          console.log(res)
          this.isShow = false
          this.getList()
        })
      } else {
        this.$http.post('/user/add', this.operateForm).then(res => {
          console.log(res)
          this.isShow = false
          this.getList()
        })
      }
    },
    addUser() {
      this.isShow = true
      this.operateType = 'add'
      this.operateForm = {
        username: '',
        email: '',
        type: '',
        addr: '',
      }
    },
    getList() {
      getUser().then((res) => {
        console.log(res)
        // console.log(res.data.results)
        this.tableData = res.data.results
        console.log(this.tableData)
      })
    },
    // getList(name = '') {
    //   this.config.loading = true
    //   name ? (this.config.page = 1) : ''
    //   console.log(getUser());
    //   getUser({
    //     page: this.config.page,
    //     name
    //   }).then((res) => {
    //     res = res.data
    //     console.log(res)
    //     this.tableData = res.list.map(item => {
    //       item.typeLabel = item.type === 0 ? '个人' : '企业'
    //       return item
    //     })
    //     this.config.total = res.count
    //     this.config.loading = true
    //   })
    // },
    editUser(row) {
      this.isShow = true
      this.operateType = 'edit'
      console.log(row)
      this.operateForm = row
    },
    delUser(row) {
      this.$confirm('此操作将永久删除此组件，是否继续？', '提示', {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        const id = row.id
        this.$http.post('/user/del', {
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