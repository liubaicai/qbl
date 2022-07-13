<template>
  <div>
    <el-button @click="toLogin">login</el-button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useIndexStore } from "@/stores/index";
const router = useRouter();
const iStore = useIndexStore();

const toLogin = () => {
  console.log(iStore.auth);
  router.push("/");
};
</script>
