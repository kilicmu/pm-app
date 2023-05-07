<template>
    <el-menu :default-active="activeIndex" router background-color="#545c64" text-color="#fff" active-text-color="#ffd04b"
        class="el-menu" mode="horizontal" :ellipsis="false" @select="handleSelect">
        <div style="margin: 8px 0 0 28px; cursor: pointer">
            <img :src="logoUrl" :height="42" @click="router.push('/')" />
        </div>
        <div class="flex-grow" />
        <el-menu-item index="appointment">预约体检</el-menu-item>
        <el-menu-item index="appointmented">我的体检信息</el-menu-item>
        <el-menu-item index="common-sense">体检常识</el-menu-item>
        <el-menu-item index="login" v-if="!uname">
            请先登录
        </el-menu-item>

        <el-sub-menu v-else>
            <template #title>
                {{ `hi ${uname}` }}
            </template>
            <el-menu-item @click="logout" index="/">登出</el-menu-item>
        </el-sub-menu>
    </el-menu>
</template>
  
<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from "vue-router"
import { userToken } from "@/utils/storageKeys"
import logoUrl from '@/assets/dna-logo.svg';
import { useStorage } from '@vueuse/core';

const route = useRoute()
const router = useRouter()
const uname = useStorage(userToken, null)
const activeIndex = computed(() => {
    return route.path?.split('/')?.pop() || route.path
})

const logout = () => {
    localStorage.setItem(userToken, '')
    location.href = '/'
}
</script>
  
<style type="scss" scoped>
.flex-grow {
    flex-grow: 1;
}

.el-menu {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
}
</style>