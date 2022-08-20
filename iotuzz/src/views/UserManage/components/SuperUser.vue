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
import { flatten } from '@/utils/flatten'
import axios from 'axios'

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
          model: "password",
          label: "密码",
          type: "password"
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
          model: "address",
          label: "地址",
          type: "input",
        },
        {
          model: "bio",
          label: "简介",
          type: "input",
        },
      ],
      operateForm: {
        username: '',
        password: '',
        email: '',
        type: '',
        address: '',
        bio: '',
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
          prop: 'address',
          label: '地址',
          width: 320
        },
        {
          prop: "bio",
          label: "用户简介",
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
      let { username, password, email } = this.operateForm
      let { type, address, bio } = this.operateForm
      let postNeed = { username, password, email }
      let patchNeed = { type, address, bio }
      // console.log(postNeed)
      // console.log(patchNeed)

      if (this.operateType === 'edit') {
        console.log(this.operateForm)
        axios.patch('/api/profile/' + this.operateForm.username + '/', patchNeed).then(() => {
          this.isShow = false
          this.tableData = []
          this.getList()
        })
      } else {
        axios.post('/api/user/', postNeed).then(res => {
          console.log(res)
        }).then(() => {
          axios.patch('/api/profile/' + this.operateForm.username + '/', patchNeed).then(() => {
            this.isShow = false
            this.tableData = []
            this.getList()
          })
        })
      }
    },
    addUser() {
      this.isShow = true
      this.operateType = 'add'
      this.operateForm = {
        username: '',
        email: '',
        password: '',
        type: '',
        address: '',
        bio:'',
      }
    },
    editUser(row) {
      this.isShow = true
      this.operateType = 'edit'
      this.operateForm = row
    },
    getList() {
      getUser().then((res) => {
        // console.log(res)
        res.data.results.forEach(item => {
          item.typeLabel = item.type === 0 ? "个人" : "企业"
          let flat = flatten(item)
          this.tableData.push(flat)
        })
        this.config.total = res.data.count
        // console.log(this.tableData)
      })
    },

    delUser(row) {
      this.$confirm('此操作将永久删除此组件，是否继续？', '提示', {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        axios({
          method: 'delete',
          url: '/api/user/' + row.username + '/',
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