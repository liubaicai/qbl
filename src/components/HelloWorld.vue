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
    <div>{{ $fmtd(_.now()) }}</div>
  </div>

  <el-input v-model="filters.keyword" placeholder="请输入内容" />
  <el-button type="primary" @click="onSearch">搜索</el-button>

  <el-pagination
    background
    v-model:currentPage="pager.currentPage"
    :page-sizes="[5, 10, 15, 20, 30, 50, 100, 500, 1000]"
    :page-size="pager.pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="pager.total"
    @size-change="onPagerSizeChange"
    @current-change="onPagerChange"
  >
  </el-pagination>
</template>

<script setup lang="ts">
import pd from "@/composables/pageData";
import pt from "@/composables/pager";
import { _ } from "@/composables/plugins";

import { ref, toRefs, onMounted } from "vue";
import { useIndexStore } from "@/stores/index";
import api from "@/api/index";
import UrlMonitor from "@/utils/url-monitor";

const monitor = new UrlMonitor({
  url: "https://jsonplaceholder.typicode.com/todos/1",
  interval: 10000,
});
monitor.on("change", (e) => {
  console.log(e);
});
monitor.start();

const props = defineProps({
  msg: {
    type: String,
    default: "Hello Vue!",
  },
});

const { storeData } = pd();
const { filters, pager, onPagerSizeChange, onPagerChange, onSearch, initGetData } = pt();

filters.keyword = "";

const getData = (page?: number) => {
  console.log(JSON.stringify(filters));
  if (!page) {
    page = pager.currentPage;
  }
  console.log("loading data:", page);
  const params = {
    page,
    pageSize: pager.pageSize,
    ...filters,
  };
  api.post.list(params).then((res) => {
    console.log(res);
  });
};
initGetData(getData);

// const instance = getCurrentInstance();
// const global = instance?.appContext.config.globalProperties;

const { msg } = toRefs(props);
const newMsg = ref(`${_.clone(msg.value)}!`);

const iStore = useIndexStore();
iStore.setPageData("demo_msg", newMsg.value);
const message = ref(iStore.pageData["demo_msg"]);

const onLightThemes = () => {
  window.changeThemes("light");
};

const onDarkThemes = () => {
  window.changeThemes("dark");
};

onMounted(() => {
  console.log(iStore.pageData);
  storeData.value = {
    msg: "Hello World",
  };
  setTimeout(() => {
    console.log(iStore.pageData);
  }, 3000);

  pager.total = 263;
  getData();
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
