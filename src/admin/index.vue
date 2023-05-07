<template>
    <Header />
    <LeftNav />
    <div class="right">
        <router-view></router-view>
    </div>
</template>
<script lang='ts' setup>
import Header from './Header.vue';
import LeftNav from './LeftNav.vue';


</script>
<style lang='scss' scoped>
.right {
    position: fixed;
    top: 60px;
    bottom: 0;
    right: 0;
    left: 260px;

    padding: 26px 24px 0;

    overflow-y: scroll;
}
</style>