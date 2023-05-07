import { ref, onMounted, onUnmounted } from "vue"
export function useWSize() {
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
    return imageSize
}