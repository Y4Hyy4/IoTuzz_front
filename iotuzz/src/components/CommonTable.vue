<template>
    <div class="common-table">
        <el-table :data="tableData" height="90%" stripe style="font-size: 18px;">
            <el-table-column show-overflow-tooltip v-for="item in tableLabel" :key="item.prop" :label="item.label" align="center"
                :width="item.width ? item.width : 200">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row[item.prop] }}</span>
                </template>
            </el-table-column>

            <el-table-column label="操作" min-width="220px">
                <template slot-scope="scope">

                    <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button size="mini" @click="handleDelete(scope.row)" type="danger">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination class="pager" layout="prev, pager, next" :total="childConfig.total"
            :current-page.sync="childConfig.page" @current-change="changePage" :page-size="20"></el-pagination>
    </div>
</template>

<script>
export default {
    name: 'CommonTable',
    data() {
        return {
            childConfig: this.config
        }
    },
    props: {
        tableData: Array,
        tableLabel: Array,
        config: Object,
    },
    watch: {
        config: {
            handler() {
                this.childConfig = this.config
            }
        },
        deep: true
    },
    methods: {
        handleEdit(row) {
            this.$emit('edit', row)
        },
        handleDelete(row) {
            this.$emit('del', row)
        },
        changePage(page) {
            this.$emit('changePage', page)
        },
        childConfigChange() {
            this.$emit('update:config', this.childConfig)
        }
    },
}
</script>

<style lang="less">
.common-table {
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