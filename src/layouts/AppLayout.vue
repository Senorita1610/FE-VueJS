<template>
    <div>
        <Header></Header>
        <div class="body-content">
            <router-view></router-view>
        </div>
        <Footer></Footer>
    </div>
</template>

<script lang="ts" setup>
import Container from "@/components/base/Container.vue";
import Header from "@/components/base/Header.vue"
import Footer from "@/components/base/Footer.vue";
</script>

<style lang="scss" scoped>
.body-content {
    min-height: 70vh;
    font-size: 1.4rem;
    background-color: #f4f7fb;
    padding-bottom: 40px;
}

@media screen and (max-width: 991px) {
    .body-content {
        padding-top: 60px;
    }
}
</style>