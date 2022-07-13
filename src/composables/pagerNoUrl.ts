import { reactive, watch } from "vue";
import _ from "lodash";
import type { LocationQueryRaw } from "vue-router";

export default function () {
  const localRoute: {
    query: LocationQueryRaw;
  } = reactive({
    query: {},
  });

  const filters: LocationQueryRaw = reactive({});
  const pager = reactive({
    total: 0,
    pageSize: 10,
    currentPage: 1,
  });

  const onPagerSizeChange = (pageSize: number) => {
    pager.pageSize = pageSize;
    pushToQuery({
      pageSize,
    });
  };
  const onPagerChange = (page: number) => {
    pager.currentPage = page;
    pushToQuery({
      page,
    });
  };

  const pushToQuery = (obj: LocationQueryRaw) => {
    localRoute.query = {
      ...localRoute.query,
      ...obj,
    };
  };

  watch(
    () => localRoute.query,
    (query: LocationQueryRaw) => {
      console.log(query);
      const pageSize = parseInt(query.pageSize?.toString() || "", 10);
      const page = parseInt(query.page?.toString() || "", 10);
      if (pageSize) {
        pager.pageSize = pageSize;
      }
      if (page) {
        pager.currentPage = page;
      }
      if (getData) getData(pager.currentPage);
    },
    {
      deep: true,
    }
  );

  const onSearch = _.debounce(function () {
    const query = {
      ...filters,
      ...{
        page: 1,
      },
    };
    pushToQuery(query);
  }, 500);

  let getData: (page: number) => void;
  const initGetData = (callback: (page: number) => void) => {
    getData = callback;
  };

  return {
    filters,
    pager,
    onPagerSizeChange,
    onPagerChange,
    initGetData,
    onSearch,
  };
}
