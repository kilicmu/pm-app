import { ElMessage } from 'element-plus'

export const msg = {
    error(message) {
        ElMessage({
            type: 'error',
            message
        })
    },
    success(message) {
        ElMessage({
            type: 'success',
            message
        })
    }
}