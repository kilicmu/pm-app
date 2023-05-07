<template>
    <div class="my-message">
        <el-card shadow="hover">
            <h2>历史登记信息</h2>
        </el-card>
        <el-card shadow="hover">
            <div>
                <el-input size="default" placeholder="请输入搜索套餐名称" style="max-width: 180px" v-model="searchParams.mealName">
                </el-input>
                <el-select size="default" placeholder="请输入搜索支付状态" style="max-width: 180px; margin-left: 12px"
                    v-model="searchParams.payStatus">
                    <el-option key="已支付" label="已支付" value="已支付"></el-option>
                    <el-option key="未支付" label="未支付" value="未支付"></el-option>
                </el-select>
                <el-button size="default" type="primary" style="margin-left: 12px" @click="doSearch">
                    <el-icon>
                        <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728="">
                            <path fill="currentColor"
                                d="m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704z">
                            </path>
                        </svg>
                    </el-icon>
                    查询
                </el-button>
                <el-button size="default" style="margin-left: 12px" @click="resetParams">
                    <el-icon>
                        <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728="">
                            <path fill="currentColor"
                                d="M289.088 296.704h92.992a32 32 0 0 1 0 64H232.96a32 32 0 0 1-32-32V179.712a32 32 0 0 1 64 0v50.56a384 384 0 0 1 643.84 282.88 384 384 0 0 1-383.936 384 384 384 0 0 1-384-384h64a320 320 0 1 0 640 0 320 320 0 0 0-555.712-216.448z">
                            </path>
                        </svg>
                    </el-icon>
                    重置
                </el-button>
            </div>
            <el-divider />
            <el-table :data="displayList" style="width: 100%" border v-loading="loading">
                <el-table-column type="index" label="序号" width="50" />
                <el-table-column prop="name" label="姓名" show-overflow-tooltip></el-table-column>
                <el-table-column prop="gender" label="性别" show-overflow-tooltip></el-table-column>
                <el-table-column prop="status" label="支付状态" show-overflow-tooltip>
                    <template #default="scope">
                        <el-tag type="success" v-if="scope.row.payStatus === '已支付'">已支付</el-tag>
                        <el-tag type="info" v-else>{{ scope.row.payStatus }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="meal.name" label="套餐名称" show-overflow-tooltip></el-table-column>
                <el-table-column prop="birthday" label="生日" show-overflow-tooltip>
                    <template #default="scope">
                        {{ dayjs(scope.row.birthday).format('YYYY-MM-DD') }}
                    </template>
                </el-table-column>
                <el-table-column prop="appointmentTime" label="预约时间" show-overflow-tooltip>
                    <template #default="scope">
                        {{ dayjs(scope.row.appointmentTime).format('YYYY-MM-DD') }}
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="100">
                    <template #default="scope">
                        <el-button size="small" text type="primary" @click="openModal(scope.row)">查看预约</el-button>
                        <el-button v-if="scope.row.payStatus !== '已支付'" size="small" text type="primary"
                            @click="abandon(scope.row)">取消预约</el-button>
                        <el-button v-if="scope.row.payStatus !== '已支付'" size="small" text type="primary"
                            @click="toPay(scope.row)">去支付</el-button>

                        <el-button v-if="scope.row.payStatus === '已支付'" size="small" text type="primary"
                            @click="getReport(scope.row)">下载报告</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-dialog v-model="modalVisible" title="预定详情" close-on-click-modal show-close>
            <MessageCard :value="currentAppointment"></MessageCard>
        </el-dialog>
        <el-dialog id="report-id" v-model="reportVisible" title="体检报告" close-on-click-modal show-close width="820">
            <ReportCard :value="currentReport"></ReportCard>
            <template #footer>
                <el-button @click="toPrint" id="should-hidden-print-button">打印</el-button>
            </template>
        </el-dialog>
    </div>
</template>
<script setup>
import { cloneDeep } from 'lodash';
import { ref, watchEffect } from 'vue';
import MessageCard from "./message-card/index.vue"
import ReportCard from "./report-card/index.vue"
import { request } from "@/utils/request"
import { msg } from "@/utils/msg"
import dayjs from "dayjs"
import { ElMessageBox } from 'element-plus'
import { userToken } from "@/utils/storageKeys"
import { useStorage } from '@vueuse/core';

const initialParams = {
    mealName: '',
    payStatus: ''
}
const searchParams = ref(cloneDeep(initialParams))
const list = ref([])
const loading = ref(false)
const displayList = ref([])
const currentAppointment = ref({})
const currentReport = ref({})
const modalVisible = ref(false)
const reportVisible = ref(false)

const resetParams = () => {
    searchParams.value = cloneDeep(initialParams)
    displayList.value = cloneDeep(list.value)
}

const uname = useStorage(userToken)

const searchList = async () => {
    try {
        loading.value = true
        const data = await request({
            url: '/registration/getAppointmentInfo',
            params: {
                name: uname.value
            },
            dontAlert: true
        })
        displayList.value = [data] ?? []
        list.value = [data] ?? []
    } catch (e) {
        displayList.value = []
        list.value = []
    } finally {
        setTimeout(() => {
            loading.value = false
        }, 500)
    }
}
watchEffect(() => {
    searchList()
})

const doSearch = () => {
    loading.value = true
    displayList.value = cloneDeep(list.value.filter(item =>
        new RegExp(searchParams.value.mealName).test(item.mealName)
        && new RegExp(searchParams.value.payStatus).test(item.payStatus)
    ))
    setTimeout(() => {
        loading.value = false
    }, 1000)
}

const openModal = (row) => {
    currentAppointment.value = row
    modalVisible.value = true
}

const toPay = (row) => {
    ElMessageBox.alert(`确认支付么？需要支付 ${row.meal.price} 元。`, {
        confirmButtonText: '确认',
        callback: (action) => {
            if (action !== 'confirm') {
                return
            }

            request({
                url: '/registration/payExaminationFee',
                params: {
                    name: row.name
                }
            }).then(res => {
                msg.success('支付成功')
                searchList()
            }).catch(e => {
                msg.error('支付失败')
            })
        }
    })
}
const getReport = (row) => {
    const { name } = row
    request({
        url: '/examineReport/getExamineReportByName',
        params: { name }
    }).then(data => {
        currentReport.value = data
        reportVisible.value = true
    })
}
const abandon = (row) => {
    ElMessageBox.alert(`确认放弃么？`, {
        confirmButtonText: '确认',
        callback: (action) => {
            if (action === 'confirm') {
                const { name } = row
                request({
                    url: '/registration/cancelAppointment',
                    params: { name }
                }).then(res => {
                    searchList()
                    msg.success('取消成功')
                }).catch(e => {
                    msg.error('取消失败')
                })
            }
        }
    })
}

const toPrint = () => {
    const dom = document.querySelector('#report-id')
    const printDiv = document.createElement('div')
    const btn = document.querySelector('#should-hidden-print-button')
    btn.style.visibility = 'hidden'
    printDiv.innerHTML = dom.innerHTML
    btn.style.visibility = ''
    printDiv.style.position = 'fixed'//div宽高设置100%；position设为fixed或者absolute占满屏幕，把当前页面内容全部覆盖住
    printDiv.style.left = '0'
    printDiv.style.top = '0'
    printDiv.style.width = '100%'
    printDiv.style.height = '100%'
    printDiv.style.zIndex = '100000'
    printDiv.style.background = '#fff'
    printDiv.style.overflow = 'auto'
    document.body.appendChild(printDiv)//在body中添加创建的新结点

    window.print()
    document.body.removeChild(printDiv)//打印成功后删除创建的这个节点
}

</script>
<style lang='scss' scoped>
.my-message {
    width: 100%;

    >*+* {
        margin-top: 12px;
    }
}
</style>