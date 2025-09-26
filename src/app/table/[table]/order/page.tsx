import { Params } from "@/types/common";
import OrderPage from "@/feature/table/(router)/order/order-index";

import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { table } = await params;

  return {
    title: `주문`,
    description: `${table}번 테이블 주문 페이지입니다.`,
    metadataBase: new URL(
      `https://qr-order-client.vercel.app/table/${table}/pickUpList`,
    ),
  };
}

export default function Page() {
  return <OrderPage />;
}
