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
  </div>

  <el-form :model="filters" :rules="validateRules">
    <el-form-item prop="keyword">
      <el-input v-model="filters.keyword" placeholder="请输入内容" />
    </el-form-item>
    <el-button type="primary" @click="onSearch">搜索</el-button>
  </el-form>

  <el-table :data="storeData" stripe style="width: 100%">
    <el-table-column prop="username" label="姓名" width="180"></el-table-column>
    <el-table-column prop="location" label="位置" width="180"></el-table-column>
    <el-table-column prop="timestamp" label="时间">
      <template #default="scope">
        {{ $fmtd(scope.row.timestamp) }}
      </template>
    </el-table-column>
  </el-table>

  <Pagination v-model="pager" />
</template>

<script setup lang="ts">
import pd from "@/composables/pageData";
import pt from "@/composables/pager";
import { _ } from "@/composables/plugins";

import { ref, toRefs, onMounted } from "vue";
import { useIndexStore } from "@/stores/index";
import { logApi } from "@/api/index";

import { type ValidateRules, validateEmpty } from "@/utils/validate";

const props = defineProps({
  msg: {
    type: String,
    default: "Hello Vue!",
  },
});

const { storeData } = pd();
const { filters, pager, onSearch, initGetData } = pt();

filters.keyword = "";

const validateRules: ValidateRules = {
  keyword: [{ validator: validateEmpty }],
};

const getData = (page?: number) => {
  if (!page) {
    page = pager.currentPage;
  }
  const params = {
    page,
    pageSize: pager.pageSize,
    ...filters,
  };
  logApi.test(params).then((resp) => {
    storeData.value = resp.data || [];
    pager.total = resp.total || 0;
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
  setTimeout(() => {
    console.log(iStore.pageData);
  }, 3000);
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
