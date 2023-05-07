<template>
    <img :src="url" class="bk" :height="imageSize.height" />
    <div class="system-info">
        <div class="message">
            <h2>体检信息登记系统</h2>
            <h3>在线登记，统一管理预约数据</h3>
            <el-button size="large" type="primary" plain @click="router.push('/appointment')"> 快速体验 </el-button>
            <el-button size="large" plain @click="router.push({ name: 'common-sense' })"> 学习常识 </el-button>
        </div>
    </div>
</template>
<script setup>
import { onMounted, ref, onUnmounted } from "vue";
import { useRouter } from "vue-router"
import url from "@/assets/dna.webp"

const router = useRouter()
const imageSize = ref({
    height: 0,
    width: 0
})
const sizeCompute = (e) => {
    imageSize.value.height = window.innerHeight
    imageSize.value.width = window.innerWidth
}
onMounted(() => {
    window.addEventListener('resize', sizeCompute)
    sizeCompute()
})
onUnmounted(() => {
    window.removeEventListener('resize', sizeCompute)
})

</script>
<style lang='scss' scoped>
.bk {
    top: 0;
    left: 0;
    position: fixed;
    z-index: -1000;
}

.system-info {
    display: flex;
    margin-top: 64px;
    width: 100%;

    .message {

        margin-top: 210px;
        margin-left: 200px;

        >h2 {
            color: white;
            font-size: 72px;
        }

        >h3 {
            color: rgb(225, 225, 225);
            font-size: 32px;
            font-weight: 300;
            margin-top: 32px;
        }

        >button {
            margin-top: 42px;
        }
    }
}
</style>