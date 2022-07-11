<template>
  <div class="hello">
    <div style="font-size: 26px">{{ message }}</div>
    <div>
      <svg-icon name="word"></svg-icon>
    </div>
    <div>
      <el-button @click="onLightThemes">light</el-button>
      <el-button @click="onDarkThemes">dark</el-button>
    </div>
    <div>{{ $fmtd($_.now()) }}</div>
  </div>
</template>

<script setup lang="ts">
import sayHelloWorld from "@/composables/sayHelloWorld";
import { ref, toRefs, getCurrentInstance, onMounted } from "vue";
import { useIndexStore } from "@/stores/index";
import api from "@/api/index";
import pd from "@/utils/pageData";

const props = defineProps({
  msg: {
    type: String,
    default: "Hello Vue!",
  },
});

const { storeData } = pd();

const instance = getCurrentInstance();
const global = instance?.appContext.config.globalProperties;

const { msg } = toRefs(props);
const newMsg = ref(global?.$_.clone(msg.value));

const iStore = useIndexStore();
iStore.setPageData("demo_msg", newMsg.value);
const iMsg = ref(iStore.pageData["demo_msg"]);

const { message } = sayHelloWorld(iMsg);

const onLightThemes = () => {
  window.changeThemes("light");
};

const onDarkThemes = () => {
  window.changeThemes("dark");
};

onMounted(() => {
  api.main.ping().then(() => {
    console.log("pong");
  });
  console.log(useIndexStore().pageData);
  storeData.value = {
    msg: "Hello World",
  };
  setTimeout(() => {
    console.log(useIndexStore().pageData);
  }, 3000);
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
</style>
