<template>
  <div class="home">
    <img alt="Vue logo" src="@/assets/logo.png" />
    <HelloWorld msg="Welcome to QBL" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import HelloWorld from "@/components/HelloWorld.vue";
import pd from "@/composables/pageData";
const { pageKey } = pd();
onMounted(() => {
  console.log(pageKey);
});
</script>
