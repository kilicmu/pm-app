<template>
    <h1 style="font-weight: bold; font-size: 24px; margin-bottom: 24px">编辑体检报告</h1>
    <el-steps :active="active" align-center>
        <el-step title="添加基础报告" description="体检人的基础报告" />
        <el-step title="填写单项报告" description="体检人的套餐单项报告" />
        <el-step title="填写完成" description="以完成此用户填写" />
    </el-steps>
    <div style="display:flex; flex-direction:column; align-items:center">
        <div style="width: 420px; margin-top: 82px" v-if="active === 1">
            <el-form :form="initialBasicFormData" ref="basicFormRef">
                <el-form-item prop="name" label="姓名">
                    <el-input v-model="basicFormData.name"></el-input>
                </el-form-item>
                <el-form-item prop="height" label="身高">
                    <el-input v-model="basicFormData.height" placeholder="单位为m" clearable></el-input>
                </el-form-item>
                <el-form-item prop="weight" label="体重">
                    <el-input v-model="basicFormData.weight" placeholder="单位为kg" clearable></el-input>
                </el-form-item>

                <el-form-item prop="bmi" label="bmi">
                    <el-input v-model="basicFormData.bmi"></el-input>
                </el-form-item>

                <el-form-item prop="idealWeight" label="理想体重">
                    <el-input v-model="basicFormData.idealWeight"  placeholder="单位为kg" clearable></el-input>
                </el-form-item>

                <el-form-item prop="systolicPressure" label="收缩压">
                    <el-input v-model="basicFormData.systolicPressure"></el-input>
                </el-form-item>

                <el-form-item prop="diastolicPressure" label="舒张压">
                    <el-input v-model="basicFormData.diastolicPressure"></el-input>
                </el-form-item>
            </el-form>
            <el-button @click="submitBasic" type="primary">下一步</el-button>
        </div>
        <div v-if="active === 2">
            <el-table :data="projects" border style="width: 600px; margin-top: 64px">
                <el-table-column prop="displayName" label="项目名"></el-table-column>
                <el-table-column prop="result" label="项目结果">
                    <template #default="{ row }">
                        <el-input v-model="row.result"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="result" label="上传图片" width="200">
                    <template #default="{ row }">
                        <el-upload
                          class="avatar-uploader"
                          :action="`${HOST}/api/file/upload`"
                          :show-file-list="false"
                          :on-success="(resp) => row.url=resp.data"
                        >
                            <img v-if="row.url" :src="row.url" class="avatar" />
                            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                        </el-upload>
                    </template>
                </el-table-column>
                <el-table-column prop="suggest" label="建议">
                    <template #default="{ row }">
                        <el-input v-model="row.suggest"></el-input>
                    </template>
                </el-table-column>
            </el-table>
            <el-button @click="submitOthers" type="primary" style="float: right; margin-top: 12px">提交</el-button>
        </div>
        <div v-if="active === 3">
            <el-result icon="success" title="完成填写" sub-title="点击继续填写，可填写新的报告">
                <template #extra>
                    <el-button type="primary" @click="active = 1">继续填写</el-button>
                </template>
            </el-result>
        </div>
    </div>
</template>
<script setup>
import { cloneDeep } from 'lodash';
import { ref } from 'vue';
import { request } from "@/utils/request"
import { msg } from "@/utils/msg"
import { useRouter } from 'vue-router';
import {Plus} from "@element-plus/icons-vue";
import {HOST} from "@/utils/request.js";


const router = useRouter()


const initialBasicFormData = {
    "name": '',
    "height": '',
    "weight": '',
    "bmi": '',
    "idealWeight": '',
    "systolicPressure": '',
    "diastolicPressure": '',
}
const active = ref(1)
const basicFormRef = ref()
const basicFormData = ref(cloneDeep(initialBasicFormData))

const projects = ref([])

const handleUpload = (resp, index) => {
    console.log(resp)
}
const submitBasic = () => {

    request({
        url: '/examineReport/addNormalExamineReport',
        data: basicFormData.value,
    })
        .then(() => {
            request({
                url: '/registration/getAppointmentInfo',
                params: {
                    name: basicFormData.value.name
                }
            }).then((data) => {
                projects.value = data?.meal?.projectList?.map(i => ({
                    name: basicFormData.value.name,
                    projectId: i.id,
                    displayName: i.name,
                    result: '',
                    suggest: ''
                }))
                active.value += 1
            })
        })
}

const submitOthers = () => {
    Promise.all(projects.value.map(item => Promise.all([request({
        url: '/examineReport/addSuggestion',
        data: item
    }), request({
        url: '/examineReport/addSpecialExamineReport',
        data: item
    })]))).then(result => {
        msg.success('填写完成')
        projects.value = []
        basicFormData.value = cloneDeep(initialBasicFormData)
        active.value += 1
    })
}


</script>
<style lang='scss' scoped>
.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
    object-fit: contain;
}
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}

</style>