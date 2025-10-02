import BillPage from "@/feature/table/(router)/bill";
import { getQueryClient } from "@/lib/function/query/get-query-client";
import { orderListQueryOption } from "@/lib/function/query/query-option";
import { Params } from "@/types/common";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { table } = await params;

  return {
    title: `계산서`,
    description: `${table}번 테이블 계산서 페이지입니다.`,
    metadataBase: new URL(
      `https://qr-order-client.vercel.app/table/${table}/bill`,
    ),
  };
}

export default async function Page({ params }: { params: Params }) {
  const paramsObj = await params;

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(orderListQueryOption(paramsObj.table));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BillPage />
    </HydrationBoundary>
  );
}
