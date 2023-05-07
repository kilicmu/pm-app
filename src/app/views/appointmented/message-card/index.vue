<template>
    <div>
        支付状态：
        ￥{{ props.value.meal.price }}
        <el-tag type="success" v-if="props.value.payStatus === '已支付'">已支付</el-tag>
        <el-tag type="info" v-else>{{ props.value.payStatus }}</el-tag>
    </div>
    <el-row :gutter="24">
        <el-col :span="12">
            <p>预订人：{{ props.value.name }}</p>
        </el-col>
        <el-col :span="12">
            <p>预订人性别：{{ props.value.gender }}</p>
        </el-col>
    </el-row>
    <el-row :gutter="24">
        <el-col :span="12">
            <p>选择套餐：{{ props.value.meal.name }} <el-tag type="primary">{{ props.value.meal.category }}</el-tag></p>

        </el-col>
        <el-col :span="12">
            <p>套餐简介：{{ props.value.meal.info }}</p>
        </el-col>
    </el-row>
    <el-row :gutter="24">
        <el-col :span="12">
            <p>生日：{{ dayjs(props.value.birthday).format('YYYY-MM-DD') }}</p>
        </el-col>
        <el-col :span="12">
            <p>预定时间：{{ dayjs(props.value.appointmentTime).format('YYYY-MM-DD') }}</p>
        </el-col>
    </el-row>
    <h2 style="margin: 12px 0; font-weight: 600; font-size: 16px;">此套餐包含项目如下：</h2>
    <el-table :data="props.value.meal.projectList" border>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="info" label="介绍"></el-table-column>
        <el-table-column prop="price" label="价格"></el-table-column>
        <el-table-column prop="departmentName" label="科室名"></el-table-column>
    </el-table>
</template>
<script setup>
import dayjs from "dayjs"

const props = defineProps({
    value: {
        type: Object,
        default: () => ({})
    }
})
</script>
<style lang='scss' scoped>
p {
    margin: 12px 0;
}
</style>