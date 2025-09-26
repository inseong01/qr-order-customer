import Loading from "@/feature/components/loading/loading-index";
import QueryProvider from "./QueryProvider";
import "./globals.css";

import { Inter } from "next/font/google";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode } from "react";
import { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "QR 오더",
  description: "언제나 주문의 간편함을 추구합니다.",
  metadataBase: new URL("https://qr-order-client.vercel.app/"),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

const inter = Inter({
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body className={`${inter.className} scrollbar-hidden h-dvh w-full`}>
        <QueryProvider>
          <Loading type={"link"} />
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryProvider>
      </body>
    </html>
  );
}
