<template>
  <div>
    <el-button @click="toLogin">login</el-button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();

const toLogin = () => {
  router.push("/");
};
</script>
