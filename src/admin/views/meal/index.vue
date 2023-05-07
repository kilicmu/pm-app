<template>
    <div class="system-role-container layout-padding">
        <h1 style="font-size: 24px; font-weight: bold; padding: 12px 0;">套餐管理</h1>
        <div class="system-role-padding layout-padding-auto layout-padding-view">
            <div class="system-user-search mb15">
                <el-input v-model="filterParams.name" size="default" placeholder="请输入套餐名称" style="max-width: 180px">
                </el-input>
                <el-button size="default" type="primary" style="margin-left: 12px">
                    <el-icon>
                        <Search />
                    </el-icon>
                    查询
                </el-button>
                <el-button size="default" circle class="ml10" @click="refreshTableData()">
                    <el-icon>
                        <Refresh />
                    </el-icon>
                </el-button>
                <el-button size="default" type="success" class="ml10" @click="onOpenAddRole('add')">
                    <el-icon>
                        <FolderAdd />
                    </el-icon>
                    新增套餐
                </el-button>
            </div>
            <el-table :data="displayTableData" v-loading="loading" style="width: 100%; margin-top: 18px">
                <el-table-column type="index" label="序号" width="60" />
                <el-table-column prop="name" label="套餐名" show-overflow-tooltip></el-table-column>
                <el-table-column prop="category" label="套餐分类" show-overflow-tooltip></el-table-column>
                <el-table-column prop="price" label="套餐价格" show-overflow-tooltip></el-table-column>
                <el-table-column prop="info" label="套餐简介" show-overflow-tooltip></el-table-column>
                <el-table-column prop="projectList" label="包含项目" show-overflow-tooltip>
                    <template #default="{ row }">
                        {{ (row.projectList || []).map(item => item.name).join('、') }}
                    </template>
                </el-table-column>
                <el-table-column prop="action" label="操作" show-overflow-tooltip>
                    <template #default="{ row }">
                        <el-button @click="onOpenEditRole('edit', row)" type="primary">编辑</el-button>
                        <el-button @click="onRowDel(row)" type="danger">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <RoleDialog ref="roleDialogRef" @refresh="refreshTableData()" />
    </div>
</template>

<script setup>
import { defineAsyncComponent, computed, onMounted, ref } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { Search, FolderAdd, Refresh } from '@element-plus/icons-vue'
import { request } from "@/utils/request"

// 引入组件
const RoleDialog = defineAsyncComponent(() => import('./dialog.vue'));

// 定义变量内容
const roleDialogRef = ref();

const tableData = ref([])
const filterParams = ref({
    name: ''
})

const displayTableData = computed(() => {
    return tableData.value.filter(i => new RegExp(filterParams.value.name).test(i.name))
})
const loading = ref(false)

const refreshTableData = () => {
    loading.value = true
    setTimeout(() => {
        request({ url: '/meal/getMealList' }).then(data => {
            tableData.value = data ?? []
        }).finally(() => loading.value = false);
    }, 1000)
}
onMounted(() => {
    refreshTableData()
})


const onOpenAddRole = (type) => {
    roleDialogRef.value.openDialog(type);
};
const onOpenEditRole = (type, row) => {
    console.log(row)
    roleDialogRef.value.openDialog(type, row);
};
const onRowDel = (row) => {
    ElMessageBox.confirm(`此操作将永久删除，是否继续?`, '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
    })
        .then(() => {
            request({
                url: '/meal/deleteMealById',
                params: {
                    id: row.id
                }
            }).then(() => {
                ElMessage.success('删除成功');
                refreshTableData()
            })

        })
        .catch(() => { });
};

</script>

<style scoped lang="scss">
.system-role-container {
    width: 100%;

    .system-role-padding {
        padding: 15px;

        .el-table {
            flex: 1;
        }
    }
}
</style>
