import HistoryPage from "@/feature/table/(router)/history";
import { Params } from "@/feature/table/(router)/types";
import { getQueryClient } from "@/lib/function/query/get-query-client";
import { initOrderListQueryOption } from "@/lib/function/query/query-option";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { table } = await params;

  return {
    title: `주문내역`,
    description: `${table}번 테이블 주문내역 페이지입니다.`,
    metadataBase: new URL(
      `https://qr-order-client.vercel.app/table/${table}/history`,
    ),
  };
}

export default async function Page({ params }: { params: Params }) {
  const paramsObj = await params;
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(initOrderListQueryOption(paramsObj.table));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HistoryPage />
    </HydrationBoundary>
  );
}
