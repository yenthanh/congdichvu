<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

router.push({ path: "/PhanAnhKienNghi" });
</script>

<template>
  <v-app class="wrap-app"> <router-view></router-view> </v-app>
</template>

<style scoped></style>
