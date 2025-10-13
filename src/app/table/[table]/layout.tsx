import { Params } from "@/feature/table/(router)/types";

import { Metadata } from "next";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { table } = await params;

  return {
    title: {
      template: `%s : 테이블 ${table}`,
      default: `메뉴 : 테이블 ${table}`,
    },
    description: `${table}번 테이블 메뉴 페이지입니다.`,
    metadataBase: new URL(`https://qr-order-client.vercel.app/table/${table}`),
  };
}

export default function TableLayout({ children }: Props) {
  return <>{children}</>;
}
