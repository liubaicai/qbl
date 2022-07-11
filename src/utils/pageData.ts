import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useIndexStore } from "@/stores/index";

export default function () {
  const pageLoading = ref(true);
  const saveLoading = ref(false);
  const route = useRoute();
  const pageKey = route.name as string;
  const storeData = computed({
    get: function (): any {
      return useIndexStore().pageData[pageKey];
    },
    set: function (val: any) {
      const oldObj = useIndexStore().pageData[pageKey];
      if (oldObj) {
        const oldStr = JSON.stringify(oldObj);
        const newStr = JSON.stringify(val);
        if (oldStr !== newStr) {
          useIndexStore().pageData[pageKey] = val;
        }
      } else {
        useIndexStore().pageData[pageKey] = val;
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
