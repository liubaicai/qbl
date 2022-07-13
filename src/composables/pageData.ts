import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useIndexStore } from "@/stores/index";

export default function () {
  const pageLoading = ref(true);
  const saveLoading = ref(false);
  const route = useRoute();
  const pageKey = route.name as string;
  const iStore = useIndexStore();
  const storeData = computed({
    get: function (): unknown {
      return iStore.pageData[pageKey];
    },
    set: function (val: unknown) {
      const oldObj = iStore.pageData[pageKey];
      if (oldObj) {
        const oldStr = JSON.stringify(oldObj);
        const newStr = JSON.stringify(val);
        if (oldStr !== newStr) {
          iStore.pageData[pageKey] = val;
        }
      } else {
        iStore.pageData[pageKey] = val;
      }
    },
  });
  return {
    pageLoading,
    saveLoading,
    pageKey,
    storeData,
  };
}
