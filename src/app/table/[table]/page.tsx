import TableInitPage from "@/feature/table";
import { getQueryClient } from "@/lib/function/query/get-query-client";
import {
  initMenuCategoryListQueryOption,
  initMenuListQueryOption,
  initTableQueryOption,
} from "@/lib/function/query/query-option";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { redirect } from "next/navigation";

async function Page() {
  // useQuery prefetch
  const queryClient = getQueryClient();

  // parallel process
  await Promise.all([
    queryClient.prefetchQuery(initMenuListQueryOption),
    queryClient.prefetchQuery(initMenuCategoryListQueryOption),
    queryClient.prefetchQuery(initTableQueryOption),
  ]);

  return (
    <HydrationBoundary
      state={dehydrate(queryClient, {
        // dehydrate 에러 처리
        shouldDehydrateQuery: (query) => {
          if (query.state.status === "error") {
            return redirect("/not-found");
          }
          return true;
        },
      })}
    >
      <TableInitPage />
    </HydrationBoundary>
  );
}

export default Page;
