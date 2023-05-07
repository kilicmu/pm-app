import axios from "axios"
import { ElMessage } from 'element-plus'

export const HOST = 'http://192.210.241.252:4567'
// const HOST = 'http://127.0.0.1:8080'
const instance = axios.create({
    baseURL: HOST + '/api', // 设置基础URL
    timeout: 15000, // 设置超时时间
});
export const request = async (meta) => {
    const { url, data, params, method, dontAlert } = meta;

    try {
        const { data: { code, message, data: resultData } } = await instance({
            url,
            method: data ? 'POST' : 'GET',
            params,
            data,
        })
        if (code === 200) {
            return resultData;
        }
        throw new Error(message)
    } catch (e) {
        !dontAlert && ElMessage({
            type: 'error',
            message: e.message
        })
        throw e;
    }
};
