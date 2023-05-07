<template>
    <div style="padding: 0 24px;width: 100%">
        <h2 style="padding: 12px 0; font-weight: bold;">健康小常识科普：
            <el-popover placement="top-start" content="了解健康小常识，呵护群众健康" :width="400" trigger="hover">
                <template #reference><el-icon>
                        <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ea893728="">
                            <path fill="currentColor"
                                d="M715.648 625.152 670.4 579.904l90.496-90.56c75.008-74.944 85.12-186.368 22.656-248.896-62.528-62.464-173.952-52.352-248.96 22.656L444.16 353.6l-45.248-45.248 90.496-90.496c100.032-99.968 251.968-110.08 339.456-22.656 87.488 87.488 77.312 239.424-22.656 339.456l-90.496 90.496zm-90.496 90.496-90.496 90.496C434.624 906.112 282.688 916.224 195.2 828.8c-87.488-87.488-77.312-239.424 22.656-339.456l90.496-90.496 45.248 45.248-90.496 90.56c-75.008 74.944-85.12 186.368-22.656 248.896 62.528 62.464 173.952 52.352 248.96-22.656l90.496-90.496 45.248 45.248zm0-362.048 45.248 45.248L398.848 670.4 353.6 625.152 625.152 353.6z">
                            </path>
                        </svg>
                    </el-icon></template>

            </el-popover>
        </h2>
        <el-carousel :interval="4000" type="card" height="200px">
            <el-carousel-item v-for="item in imgs" :key="item">
                <img :src="item" class="image-item" />
            </el-carousel-item>
        </el-carousel>
        <h2 style="font-size: 24px; font-weight: bold;">可能感兴趣的知识?：</h2>
        <el-collapse v-model="activeNames" @change="handleChange" style="width: 100%; margin-top: 12px" accordion>
            <el-collapse-item v-for="(item, idx) in list" :title="`知识 ${idx + 1}：` + item.title">
                <p v-for="c in item.content.split('\n')">
                    {{ c }}
                </p>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>
<script setup>
import { request } from "@/utils/request"
import { onMounted, ref } from 'vue'
import url1 from "@/assets/pics/1.jpg"
import url2 from "@/assets/pics/2.jpg"
import url3 from "@/assets/pics/3.jpg"

const list = ref([])
const imgs = ref([url1, url2, url3])

onMounted(() => {
    list.value = request({
        url: '/knowledge/getKnowledgeList'
    }).then(res => {
        list.value = res
    })
})

</script>
<style lang='scss' scoped>
.el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}

.image-item {
    width: 100%;
}
</style>