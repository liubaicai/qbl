interface PagerInstance {
  total: number;
  pageSize: number;
  currentPage: number;
  onPagerSizeChange: (pageSize: number) => void;
  onPagerChange: (page: number) => void;
}

export type { PagerInstance };
