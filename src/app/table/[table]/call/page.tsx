import CallPage from "@/feature/table/(router)/call";
import { Params } from "@/feature/table/(router)/types";
import { getQueryClient } from "@/lib/function/query/get-query-client";
import { initRequestListQueryOption } from "@/lib/function/query/query-option";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { table } = await params;

  return {
    title: `요청`,
    description: `${table}번 테이블 요청 페이지입니다.`,
    metadataBase: new URL(
      `https://qr-order-client.vercel.app/table/${table}/call`,
    ),
  };
}

export default async function Page() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(initRequestListQueryOption);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CallPage />
    </HydrationBoundary>
  );
}
