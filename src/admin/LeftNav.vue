<template>
    <el-menu default-active="2" class="nav" :collapse="false" @open="handleOpen" @close="handleClose" router>
        <el-menu-item index="/admin/department">
            <template #title>
                <el-icon>
                    <location />
                </el-icon>
                <span>科室管理</span>
            </template>
        </el-menu-item>
        <el-menu-item index="/admin/project">
            <el-icon><icon-menu /></el-icon>
            <template #title>项目管理</template>
        </el-menu-item>
        <el-menu-item index="/admin/meal">
            <el-icon>
                <document />
            </el-icon>
            <template #title>套餐管理</template>
        </el-menu-item>
        <el-menu-item index="/admin/doctor">
            <el-icon>
                <Avatar />
            </el-icon>
            <template #title>医生管理</template>
        </el-menu-item>
        <el-menu-item index="/admin/knowledge">
            <el-icon>
                <Notification />
            </el-icon>
            <template #title>体检常识管理</template>
        </el-menu-item>
        <el-menu-item index="/admin/report">
            <el-icon>
                <setting />
            </el-icon>
            <template #title>体检报告编辑</template>
        </el-menu-item>
    </el-menu>
</template>
  
<script setup>
import { ref } from 'vue'
import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
    Notification,
    Avatar
} from '@element-plus/icons-vue'
import { useWSize } from "@/hooks/wsize"
import { useStorage } from '@vueuse/core';
import { userToken } from "@/utils/storageKeys";
const wsize = useWSize()
const isCollapse = ref(true)
const handleOpen = (key, keyPath) => {
    console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
    console.log(key, keyPath)
}

const uname = useStorage(userToken)

</script>

<style lang="scss" scoped>
.nav {
    width: 260px;
    position: fixed;
    left: 0;
    top: 60px;
    bottom: 0;
}
</style>
  