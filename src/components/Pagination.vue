<template>
  <el-pagination
    background
    v-model:currentPage="pager.currentPage"
    :page-sizes="pageSizes"
    :page-size="pager.pageSize"
    :layout="layout"
    :total="pager.total"
    @size-change="pager.onPagerSizeChange"
    @current-change="pager.onPagerChange"
  >
  </el-pagination>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import type { PagerInstance } from "@/composables/types";
import { computed } from "vue";

const props = defineProps({
  modelValue: {
    type: Object as PropType<PagerInstance>,
    required: true,
  },
  pageSizes: {
    type: Array<number>,
    default: [5, 10, 15, 20, 30, 50, 100, 500, 1000],
  },
  layout: {
    type: String,
    default: "total, sizes, prev, pager, next, jumper",
  },
});
const emits = defineEmits(["update:modelValue"]);

const pager = computed({
  get: function (): PagerInstance {
    return props.modelValue;
  },
  set: function (val: PagerInstance) {
    emits("update:modelValue", val);
  },
});
</script>
