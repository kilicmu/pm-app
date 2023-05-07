<template>
	<div class="system-role-dialog-container">
		<el-dialog :title="dialog.title" v-model="showDialog" width="540px" @close="closeDialog">
			<el-form ref="roleDialogFormRef" :model="formData" size="default" label-width="120px">
				<el-form-item label="项目名称" prop="name">
					<el-input v-model="formData.name" placeholder="请输入项目姓名" clearable></el-input>
				</el-form-item>
				<el-form-item label="项目简介" prop="name">
					<el-input type="textarea" v-model="formData.info" placeholder="项目简介" clearable></el-input>
				</el-form-item>
				<el-form-item label="项目价格" prop="price">
					<el-input v-model="formData.price" type="number" placeholder="项目价格" clearable></el-input>
				</el-form-item>
				<el-form-item label="最高项" prop="maxLevel">
					<el-input v-model="formData.maxLevel" type="number" clearable></el-input>
				</el-form-item>
				<el-form-item label="最低项" prop="minLevel">
					<el-input v-model="formData.minLevel" type="number" clearable></el-input>
				</el-form-item>
				<el-form-item label="所属科室" prop="info">
					<el-select v-model="formData.departmentId" placeholder="所属科室" clearable>
						<el-option v-for="d in departments" :key="d.value" :label="d.name" :value="d.id"
							:disabled="d.status !== 1"></el-option>
					</el-select>
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

// 定义子组件向父组件传值/事件
const emit = defineEmits(['refresh']);

// 定义变量内容
const roleDialogFormRef = ref();

const initialFormData = {
	departmentId: '',
	name: '',
	info: '',
	price: '',
	maxLevel: '',
	minLevel: '',
}

const formData = ref(cloneDeep(initialFormData))
const dialog = ref({
	title: '',
	submitText: '',
	type: ''
})
const departments = ref([])
const showDialog = ref(false)

const getDepartments = () => {
	request({
		url: '/department/getDepartmentList'
	}).then(res => departments.value = res)
}
onMounted(() => {
  getDepartments()
})

// 打开弹窗
const openDialog = (type, row) => {
	if (type === 'edit') {
		formData.value = cloneDeep(row);
		dialog.value.title = '修改项目';
		dialog.value.submitTxt = '修 改';
		dialog.value.type = type
	} else {
		dialog.value.title = '新增项目';
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
// 提交
const onSubmit = () => {
	const params = dialog.value.type === 'add' ? {
		url: '/project/addProject',
		data: formData.value
	} : {
		url: '/project/updateProject',
		data: formData.value
	}

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
