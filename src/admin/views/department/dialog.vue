<template>
	<div class="system-role-dialog-container">
		<el-dialog :title="dialog.title" v-model="showDialog" width="540px" @close="closeDialog">
			<el-form ref="roleDialogFormRef" :model="formData" size="default" label-width="120px">
				<el-form-item label="科室姓名" prop="name">
					<el-input v-model="formData.name" placeholder="请输入科室姓名" clearable></el-input>
				</el-form-item>
				<el-form-item label="科室简介" prop="info">
					<el-input v-model="formData.info" placeholder="科室名称" clearable></el-input>
				</el-form-item>
				<el-form-item v-if="dialog.type === 'edit'" label="状态" prop="info">
					<el-radio-group v-model="formData.status" placeholder="状态" clearable>
						<el-radio :label="1" size="large">启用</el-radio>
						<el-radio :label="0" size="large">停用</el-radio>
					</el-radio-group>
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
import { ref } from 'vue';
import { request } from "@/utils/request"
import { msg } from "@/utils/msg"

// 定义子组件向父组件传值/事件
const emit = defineEmits(['refresh']);

// 定义变量内容
const roleDialogFormRef = ref();

const initialFormData = {
	name: '',
	info: '',
	status: 1,
}

const formData = ref(cloneDeep(initialFormData))
const dialog = ref({
	title: '',
	submitText: '',
	type: ''
})
const showDialog = ref(false)

// 打开弹窗
const openDialog = (type, row) => {
	if (type === 'edit') {
		formData.value = cloneDeep(row);
		dialog.value.title = '修改科室';
		dialog.value.submitTxt = '修 改';
		dialog.value.type = type
	} else {
		dialog.value.title = '新增科室';
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
		url: '/department/addDepartment',
		data: formData.value
	} : {
		url: '/department/updateDepartment',
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
