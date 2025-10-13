import {
  QueryCache,
  QueryClient,
  defaultShouldDehydrateQuery,
  isServer,
} from "@tanstack/react-query";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // 프리패칭 데이터 만료 시간 지정
        staleTime: 0,
        refetchOnWindowFocus: false,
      },
      dehydrate: {
        // SSR, pending 데이터도 dehydrate 처리
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === "pending",
      },
    },
    queryCache: new QueryCache({
      // 쿼리 에러 통합 처리
      onError: (error, query) => {
        if (query?.meta?.errorMessage) {
          console.error(query.meta.errorMessage);
        }
      },
    }),
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}
