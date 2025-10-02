import { getMenuList } from "@/lib/supabase/function/get-menu-list";
import { getTableOrderList } from "@/lib/supabase/function/get-table-order";
import { getMenuCategoryList } from "@/lib/supabase/function/get-menu-category";
import { getRequestCategories } from "@/lib/supabase/function/get-request-category";

import { getMenuListSSR } from "@/lib/supabase/function/get-menu-list.server";
import { getTableOrderListSSR } from "@/lib/supabase/function/get-table-order.server";
import { getMenuCategoryListSSR } from "@/lib/supabase/function/get-menu-category.server";
import { getRequestCategoriesSSR } from "@/lib/supabase/function/get-request-category.server";

import { queryOptions } from "@tanstack/react-query";

export const menuListQueryOption = queryOptions({
  queryKey: ["menuList"],
  queryFn: getMenuList,
  retry: 2,
  meta: {
    errorMessage: "메뉴 목록을 불러오는데 실패하였습니다.",
  },
});

export const initMenuListQueryOption = queryOptions({
  queryKey: ["menuList"],
  queryFn: getMenuListSSR,
  retry: 2,
  meta: {
    errorMessage: "메뉴 목록을 불러오는데 실패하였습니다.",
  },
});

export const menuCategoryListQueryOption = queryOptions({
  queryKey: ["menuCategory"],
  queryFn: getMenuCategoryList,
  retry: 2,
  meta: {
    errorMessage: "카테고리 목록을 불러오는데 실패하였습니다.",
  },
});

export const initMenuCategoryListQueryOption = queryOptions({
  queryKey: ["menuCategory"],
  queryFn: getMenuCategoryListSSR,
  retry: 2,
  meta: {
    errorMessage: "카테고리 목록을 불러오는데 실패하였습니다.",
  },
});

export const requestListQueryOption = queryOptions({
  queryKey: ["requestCategory"],
  queryFn: getRequestCategories,
  retry: 1,
  meta: {
    errorMessage: "요청사항 목록을 불러오는데 실패하였습니다.",
  },
});

export const initRequestListQueryOption = queryOptions({
  queryKey: ["requestCategory"],
  queryFn: getRequestCategoriesSSR,
  retry: 1,
  meta: {
    errorMessage: "요청사항 목록을 불러오는데 실패하였습니다.",
  },
});

export const orderListQueryOption = (tableNum: string) =>
  queryOptions({
    queryKey: ["orderList"],
    queryFn: () => getTableOrderList(Number(tableNum)),
    retry: 1,
    meta: {
      errorMessage: "주문 목록을 불러오는데 실패하였습니다.",
    },
  });

export const initOrderListQueryOption = (tableNum: string) =>
  queryOptions({
    queryKey: ["orderList"],
    queryFn: () => getTableOrderListSSR(Number(tableNum)),
    retry: 1,
    meta: {
      errorMessage: "주문 목록을 불러오는데 실패하였습니다.",
    },
  });
