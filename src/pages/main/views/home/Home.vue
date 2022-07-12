<template>
  <div class="home">
    <img alt="Vue logo" src="@/assets/logo.png" />
    <HelloWorld msg="Welcome to QBL" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import pd from "@/composables/pageData";
import HelloWorld from "@/components/HelloWorld.vue";
const { pageKey } = pd();
onMounted(() => {
  console.log(pageKey);
});
</script>
