<template>
	<div class="system-role-dialog-container">
		<el-dialog :title="dialog.title" v-model="showDialog" width="590px" @close="closeDialog">
			<el-form ref="roleDialogFormRef" :model="formData" size="default" label-width="120px">
				<el-form-item label="套餐名称" prop="name">
					<el-input v-model="formData.name" placeholder="请输入套餐标题" clearable></el-input>
				</el-form-item>
				<el-form-item label="套餐简介" prop="info">
					<el-input type="textarea" v-model="formData.info" placeholder="请输入套餐简介" clearable></el-input>
				</el-form-item>
				<el-form-item label="套餐类别" prop="name">
					<el-radio-group v-model="formData.category" class="ml-4">
						<el-radio label="个人套餐" size="large">个人套餐</el-radio>
						<el-radio label="团购套餐" size="large">团购套餐</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="套餐价格" prop="price">
					<el-input v-model="formData.price" placeholder="请输入套餐价格" clearable></el-input>
				</el-form-item>
				<el-form-item label="套餐项目添加" prop="projectList">
					<div v-for="(id, idx) in formData.projectIdList" :key="idx">
						<el-select v-model="formData.projectIdList[idx]" placeholder="请输入套餐标题" clearable
							style="display: inline-block; width: 200px;">
							<el-option v-for="i in allProjectList" :key="i.id" :label="i.name" :value="i.id"
								:disabled="formData.projectIdList.includes(i.id)">{{ i.name }}</el-option>
						</el-select>
						<el-button circle :icon="Minus" @click="dropProjectItem(idx)"
							style="display: inline-block;"></el-button>
						<el-button v-if="idx === formData.projectIdList.length - 1" circle :icon="Plus"
							style="display: inline-block;" @click="addProjectItem()"></el-button>
					</div>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="onCancel" size="default">取 消</el-button>
					<el-button type="primary" @click="onSubmit" size="default">{{ dialog.submitTxt }}</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<script setup>
import { cloneDeep } from 'lodash';
import { ref, onMounted } from 'vue';
import { request } from "@/utils/request"
import { msg } from "@/utils/msg"
import {
	Plus,
	Minus
} from '@element-plus/icons-vue'

// 定义子组件向父组件传值/事件
const emit = defineEmits(['refresh']);

// 定义变量内容
const roleDialogFormRef = ref();

const initialFormData = {
	name: '',
	info: '',
	category: '',
	price: 0,
	projectIdList: [undefined],
}

const formData = ref(cloneDeep(initialFormData))
const dialog = ref({
	title: '',
	submitText: '',
	type: ''
})

const allProjectList = ref([])

onMounted(async () => {
	allProjectList.value = await request({
		url: '/project/getProjectList'
	})
})

const showDialog = ref(false)

// 打开弹窗
const openDialog = (type, row) => {
	if (type === 'edit') {
		formData.value = cloneDeep(row);
		formData.value.projectIdList = row.projectList.map(item => item.id)
		dialog.value.title = '修改套餐';
		dialog.value.submitTxt = '修 改';
		dialog.value.type = type
	} else {
		dialog.value.title = '新增套餐';
		dialog.value.submitTxt = '新 增';
		dialog.value.type = type
	}
	showDialog.value = true;
};
// 关闭弹窗
const closeDialog = () => {
	formData.value = cloneDeep(initialFormData)
	showDialog.value = false;
};
// 取消
const onCancel = () => {
	closeDialog();
};

const dropProjectItem = (idx) => {
	formData.value.projectIdList.splice(idx, 1)
}

const addProjectItem = () => {
	formData.value.projectIdList.push(undefined)
}

// 提交
const onSubmit = () => {
	const postData = formData.value
	postData.price = Number(postData.price)
	const params = dialog.value.type === 'add' ? {
		url: '/meal/addMeal',
		data: formData.value
	} : {
		url: '/project/updateProject',
		data: formData.value
	}
	console.log(params)

	request(params).then(res => {
		msg.success(dialog.value.title + '成功！')
		closeDialog();
		emit('refresh');
	}).catch(e => {
	})
};

// 暴露变量
defineExpose({
	openDialog,
});
</script>

<style scoped lang="scss">
.system-role-dialog-container {
	.menu-data-tree {
		width: 100%;
		border: 1px solid var(--el-border-color);
		border-radius: var(--el-input-border-radius, var(--el-border-radius-base));
		padding: 5px;
	}
}
</style>
