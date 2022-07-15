<template>
  <img width="100" height="100" @click="onHomeClick" :src="logo" />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useIndexStore } from "@/stores/index";
import localLogo from "@/assets/logo.png";
const iStore = useIndexStore();

const logo = computed(() => iStore.logo || localLogo);

const onHomeClick = () => {
  const ww = window.parent || window;
  ww.location.href = "/#/";
};
</script>

<style></style>
