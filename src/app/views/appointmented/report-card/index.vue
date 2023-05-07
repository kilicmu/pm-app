<template>
    <el-descriptions :column="2" :size="size" border>
        <el-descriptions-item label="体检人">{{ props.value.name }}</el-descriptions-item>
        <el-descriptions-item label="身高">{{ props.value.height }}m</el-descriptions-item>
        <el-descriptions-item label="体重">{{ props.value.weight }}kg (正常体重：{{ props.value.idealWeight
        }}kg)</el-descriptions-item>
        <el-descriptions-item label="BMI">
            {{ props.value.bmi }}
        </el-descriptions-item>
        <el-descriptions-item label="收缩压">{{ props.value.systolicPressure }}mmHg
        </el-descriptions-item>

        <el-descriptions-item label="舒张压">{{ props.value.diastolicPressure }}mmHg
        </el-descriptions-item>
    </el-descriptions>
    <h2 style="margin: 12px 0; font-weight: 600; font-size: 16px;">特定项目：</h2>
    <el-table :data="props.value.specialExamineList" border>
        <el-table-column prop="projectName" label="项目"></el-table-column>
        <el-table-column prop="maxLevel" label="范围">
            <template #default="{ row }">
                {{ `最高:${row.minLevel}/最低:${row.maxLevel}` }}
            </template>
        </el-table-column>
        <el-table-column prop="result" label="结果"></el-table-column>
        <el-table-column prop="error" label="状态">
            <template #default="{ row }">
                <el-tag type="success" v-if="row.error === '正常'">正常</el-tag>
                <el-tag type="error" v-else>{{ row.error }}</el-tag>
            </template>
        </el-table-column>
        <el-table-column label="附件图">
            <template #default="{ row }">
                <el-popover
                  placement="top"
                  :width="450"
                >
                    <template #reference>
                        <el-image
                          style="width: 100px; height: 100px"
                          :src="row.url"
                          :zoom-rate="1.2"
                        />
                    </template>
                    <el-image
                      style="width: 400px; height: 400px"
                      :src="row.url"
                    />
                </el-popover>

            </template>
        </el-table-column>
        <el-table-column prop="suggest" label="建议"></el-table-column>
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