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
import sayHelloWorld from "@/composables/sayHelloWorld";
import { ref, toRefs, getCurrentInstance, onMounted } from "vue";
import { useIndexStore } from "@/stores/index";
import api from "@/api/index";
import pd from "@/utils/pageData";
import pt from "@/utils/pager";

const props = defineProps({
  msg: {
    type: String,
    default: "Hello Vue!",
  },
});

const { pageKey, storeData } = pd();
const { filters, pager, onPagerSizeChange, onPagerChange, onSearch, initGetData } = pt();

filters.keyword = "";

const getData = (page?: number) => {
  console.log(JSON.stringify(filters));
  console.log("loading data:", page);
  if (!page) {
    page = pager.currentPage;
  }
  const params = {
    page,
    pageSize: pager.pageSize,
    ...filters,
  };
  api.post.list(params).then(() => {
    console.log("pong");
  });
};
initGetData(getData);

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
  console.log(useIndexStore().pageData);
  storeData.value = {
    msg: "Hello World",
  };
  setTimeout(() => {
    console.log(useIndexStore().pageData);
  }, 3000);

  console.log(pageKey);
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
