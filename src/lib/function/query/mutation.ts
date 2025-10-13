import postOrderList from "@/lib/supabase/function/post-order-list";
import postRequestList from "@/lib/supabase/function/post-request-list";

import { useMutation } from "@tanstack/react-query";

// 주문
export function useOrderMutationQuery() {
  return useMutation({
    mutationFn: postOrderList,
    onError(err) {
      console.error(err);
    },
  });
}

// 요청
export function useRequestMutationQuery() {
  return useMutation({
    mutationFn: postRequestList,
    onError(err) {
      console.error(err);
    },
  });
}
