<template>
    <img :src="url" class="bk" :height="imageSize.height" />
    <div class="form">
        <el-card v-if="status === 'login'" class="card">
            <strong>登录</strong>
            <el-form ref="loginRef" :model="loginData" label-width="120px" :rules="rules1">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="loginData.name"></el-input>
                </el-form-item>
                <el-form-item label="用户名" prop="passport">
                    <el-input v-model="loginData.passport"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="loginData.password" type="password"></el-input>
                </el-form-item>
            </el-form>
            <div class="right">
                <el-button type="text" @click="status = 'signup'">快速注册</el-button>
                <el-button type="primary" @click="login">登入</el-button>
            </div>
        </el-card>
        <el-card v-else class="card">
            <strong>注册</strong>
            <el-form ref="signupRef" :model="signupData" label-width="120px" :rules="rules2">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="signupData.name"></el-input>
                </el-form-item>
                <el-form-item label="用户名" prop="passport">
                    <el-input v-model="signupData.passport"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="signupData.password" type="password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="passwordRepeat">
                    <el-input v-model="signupData.passwordRepeat" type="password"></el-input>
                </el-form-item>
            </el-form>
            <div class="right">
                <el-button type="text" @click="status = 'login'">已有账号登录</el-button>
                <el-button type="primary" @click="signupHandler">注册并登入</el-button>
            </div>
        </el-card>
    </div>
</template>
<script setup>
import { onMounted, ref, onUnmounted } from "vue";
import { useRouter } from "vue-router"
import url from "@/assets/dna.webp"
import { userToken } from "@/utils/storageKeys"
import { cloneDeep } from "lodash";
import { request } from "@/utils/request"
import { msg } from "@/utils/msg"

const imageSize = ref({
    height: 0,
})
const router = useRouter()

onMounted(() => {
    if (localStorage.getItem(userToken)) {
        msg.error('已经登录，跳转回入口')
        router.push('/')
    }
})

const loginRef = ref(null)
const signupRef = ref(null)

const initialLoginData = {
    name: '',
    passport: '',
    password: ''
}
const loginData = ref(cloneDeep(initialLoginData))
const initialSignupData = {
    name: '',
    passport: '',
    password: '',
    passwordRepeat: '',
}
const signupData = ref(cloneDeep(initialSignupData))

const rules1 = {
    name: [{ required: true }],
    passport: [
        { required: true }
    ],
    password: [
        { required: true }
    ],
}
const rules2 = {
    name: [{ required: true }],
    passport: [
        { required: true }
    ],
    password: [
        { required: true }
    ],
    passwordRepeat: [
        { required: true },
    ],
    _validator: [
        {
            trigger: 'blur',
            asyncValidator: (rule, value) => {
                return new Promise((resolve, reject) => {
                    if (signupData.value.passwordRepeat !== signupData.value.password) {
                        reject("两次密码需要保持一致")
                    }
                    resolve()
                });
            },
        }
    ]
}

const login = () => {
    loginRef.value.validate(result => {
        if (!result) {
            return
        }
        request({
            url: '/user/login',
            data: loginData.value,
        }).then(res => {
            localStorage.setItem(userToken, loginData.value.name)
            msg.success("登录成功")
            setTimeout(() => {
                location.href = '/'
            }, 1000)
        })
    })
}

const signupHandler = () => {
    signupRef.value.validate(result => {
        if (!result) {
            return
        }
        request({
            url: '/user/register',
            data: signupData.value,
        }).then(res => {
            localStorage.setItem(userToken, signupData.value.name)
            msg.success("注册成功")
            setTimeout(() => {
                location.href = '/'
            }, 1000)
        })
    })

}

const sizeCompute = (e) => {
    imageSize.value.height = window.innerHeight
}
onMounted(() => {
    window.addEventListener('resize', sizeCompute)
    sizeCompute()
})
onUnmounted(() => {
    window.removeEventListener('resize', sizeCompute)
})

const status = ref('login')

</script>
<style lang='scss' scoped>
.bk {
    top: 0;
    left: 0;
    position: fixed;
    z-index: -1000;
}

.form {
    width: 100%;
    height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;

    .card {
        width: 620px;
    }
}

.right {
    display: flex;
    justify-content: right;
}
</style>