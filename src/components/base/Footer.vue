<template>
  <div>
    <!-- <Container> -->
    <section
      class="tw-bg-[#EAEFF7] tw-text-center tw-border-y-[1px] tw-border-solid tw-border-y-[#99AABB] tw-flex tw-justify-center tw-items-center">
      <router-link to="/"
        class="tw-no-underline tw-text-[#0071BC] tw-font-bold tw-py-4 tw-px-5 tw-inline-block tw-text-[1rem] hover:tw-underline">
        Giới thiệu
      </router-link>
      <router-link to="/"
        class="tw-no-underline tw-text-[#0071BC] tw-font-bold tw-py-4 tw-px-5 tw-inline-block tw-text-[1rem] hover:tw-underline">
        Tin tức - khuyến mãi
      </router-link>
      <router-link to="/"
        class="tw-no-underline tw-text-[#0071BC] tw-font-bold tw-py-4 tw-px-5 tw-inline-block tw-text-[1rem] hover:tw-underline">
        Câu hỏi thường gặp
      </router-link>
      <router-link to="/"
        class="tw-no-underline tw-text-[#0071BC] tw-font-bold tw-py-4 tw-px-5 tw-inline-block tw-text-[1rem] hover:tw-underline">
        Điều khoản
      </router-link>
    </section>
    <section class="tw-w-full tw-bg-white tw-text-[#5C5C5C] tw-pt-[30px] tw-mb-[30px] tw-hidden sm:tw-block">
      <Container>
        <div class="tw-flex tw-flex-wrap tw-mx-[-15px]">
          <div class="tw-relative tw-w-full tw-px-[15px] tw-grow-0 tw-shrink-0 tw-max-w-[25%]">
            <h6 class="tw-text-[1rem] tw-font-bold tw-mb-[15px]">Thông tin liên hệ</h6>
          </div>
          <div class="tw-relative tw-w-full tw-px-[15px] tw-grow-0 tw-shrink-0 tw-max-w-[25%]">
            <h6 class="tw-text-[1rem] tw-font-bold tw-mb-[15px]">Hỗ trợ khách hàng</h6>
          </div>
          <div class="tw-relative tw-w-full tw-px-[15px] tw-grow-0 tw-shrink-0 tw-max-w-[25%]">
            <h6 class="tw-text-[1rem] tw-font-bold tw-mb-[15px]">Menu</h6>
          </div>
          <div class="tw-relative tw-w-full tw-px-[15px] tw-grow-0 tw-shrink-0 tw-max-w-[25%]">
            <h6 class="tw-text-[1rem] tw-font-bold tw-mb-[15px]">Chính sách và điều khoản</h6>
          </div>
        </div>
      </Container>
    </section>
    <!-- </Container> -->
  </div>
</template>

<script lang="ts" setup>
import Container from "./Container.vue";

</script>

<script lang="ts">
export default {
  name: "Footer"
}
</script>

<style lang="scss" scoped></style>