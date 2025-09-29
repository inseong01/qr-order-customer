// 참고
// @tanstack\query-core\build\legacy\hydration-DpBMnFDT.d.ts

/*
  import 하지 않으면 오류 발생
  -> Module '"@tanstack/react-query"' has no exported member '<기능>'.ts(2305)
*/
import '@tanstack/react-query';

// meta 타입 설정 방법
interface MyMeta extends Record<string, unknown> {
  // meta: {} 감싸지 않아도 됨
  errorMessage: string;
}

// queryKey 타입 설정 방법
/*
  queryKey 일치하지 않으면 queryOptions에서 오류 발생
  기본) type QueryKey = [...ReadonlyArray<unknown>]
*/
type QueryKey = ['menuList' | 'menuCategory' | 'requestCategory' | 'orderList'];

declare module '@tanstack/react-query' {
  interface Register {
    queryKey: QueryKey;
    mutationKey: QueryKey;
    queryMeta: MyMeta;
    mutationMeta: MyMeta;
    defaultError: Error;
  }
}
