<template>
    <el-card class="order">
        <h2 class="order__header">快速预约体检</h2>
        <el-form ref="formRef" :model="formData" label-width="120px" :rules="rules">
            <el-form-item label="姓名" prop="name">
                <el-input v-model="formData.name"></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="gender">
                <el-radio-group v-model="formData.gender">
                    <el-radio label="男">男</el-radio>
                    <el-radio label="女">女</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="选择套餐" prop="mealId">
                <el-select v-model="formData.mealId" style="width: 100%">
                    <el-option v-for="meal in mealList" :label="meal.name" :value="meal.id"></el-option>
                </el-select>
            </el-form-item>
            <div class="order__table">
                <el-table :data="currentMeal.projectList" border>
                    <el-table-column prop="name" label="姓名"></el-table-column>
                    <el-table-column prop="info" label="介绍"></el-table-column>
                    <el-table-column prop="price" label="价格"></el-table-column>
                    <el-table-column prop="departmentName" label="科室名"></el-table-column>
                </el-table>
                <p>
                    <el-tag v-if="currentMeal.category">{{ currentMeal.category }}</el-tag>
                    预计价格: ￥{{ currentMeal.projectList.reduce((acc, n) => acc + n.price, 0) }}
                </p>
            </div>
            <el-form-item label="体检时间" prop="appointmentTime">
                <el-date-picker v-model="formData.appointmentTime" type="datetime" style="width: 100%"></el-date-picker>
            </el-form-item>
            <el-form-item label="用户生日" prop="birthday">
                <el-date-picker v-model="formData.birthday" type="date" style="width: 100%"></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm">提交</el-button>
                <el-button @click="resetForm">重置</el-button>
            </el-form-item>
        </el-form>
        <div class="order__tip">快速了解体检常识？<el-button type="text"
                @click="router.push({ name: 'common-sense' })">点此了解</el-button></div>
    </el-card>
</template>
<script setup>
import { onMounted, ref, computed } from 'vue';
import { useRouter } from "vue-router";
import { request } from "@/utils/request"
import { msg } from "@/utils/msg"
import { cloneDeep } from 'lodash-es'

const formRef = ref(null);
const mealList = ref([]);
const router = useRouter()
const rules = {
    name: [
        { required: true }
    ],
    gender: [
        { required: true }
    ],
    mealId: [
        { required: true }
    ],
    appointmentTime: [
        { required: true }
    ],
}
const initialData = {
    name: '',
    gender: '',
    mealId: '',
    appointmentTime: '',
    birthday: '',
}
const formData = ref(cloneDeep(initialData));

const currentMeal = computed(() => mealList.value.find(m => m.id === formData.value.mealId) ?? { projectList: [] })

onMounted(() => {
    request({ url: '/meal/getMealList' }).then(res => {
        mealList.value = res
    })
})

const submitForm = () => {
    // validate the form before submitting
    formRef.value.validate((valid) => {
        if (valid) {
            request({
                url: '/registration/appointment',
                data: formData.value,
            }).then(res => {
                msg.success('预约成功')
                router.push('/')
            }).catch(e => {
                msg.error('预约失败')
            })
        } else {
            return false;
        }
    });
};

const resetForm = () => {
    formData.value = cloneDeep(initialData)
}

</script>
<style lang='scss' scoped>
.order {
    width: 720px;
    margin-top: 78px;

    &__header {
        font-size: 24px;
        font-weight: bold;
        width: 100%;
        text-align: center;
        padding: 24px 0;
    }

    &__tip {
        text-align: center;
    }

    &__table {
        width: 100%;
        padding: 24px 0;
        position: relative;
        display: flex;
        align-items: end;
        flex-direction: column;

        >div {
            width: 560px;
        }

        >p {
            font-size: 14px;
            color: grey;
            font-weight: bold;
            margin-top: 12px;
        }
    }
}
</style>