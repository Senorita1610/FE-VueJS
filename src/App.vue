<template>
  <div class="app-wrapper">
    <router-view></router-view>
    <loading-page />
  </div>
</template>

<script lang="ts" setup>
import LoadingPage from "@components/base/LoadingPage.vue";
</script>

<style lang="scss" scoped>
.app-wrapper {
  font-family: var(--font-regular);
}
</style>