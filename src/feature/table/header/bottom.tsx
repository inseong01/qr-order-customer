import { useRouter } from "next/navigation";
import { ReactNode } from "react";

import { useBoundStore } from "@/lib/store/use-bound-store";

type RouterCategory = "call" | "history" | "bill";

export default function HeaderBottom() {
  const number = useBoundStore((state) => state.tableState.number);
  const requestIsClicked = useBoundStore((state) => state.flagState.isClicked);
  const setFlag = useBoundStore((state) => state.setFlag);

  const router = useRouter();

  function onClickRouterOnce(category: RouterCategory) {
    return () => {
      if (requestIsClicked) return;
      setFlag({ isClicked: true });
      router.push(`${number}/${category}`);
    };
  }

  return (
    <ul
      className={
        "flex w-full max-w-[350px] items-center justify-between text-sm"
      }
    >
      <Category
        onClickFn={onClickRouterOnce("call")}
        icon={<CallIcon_SVG />}
        text={"직원호출"}
      />
      <Category
        onClickFn={onClickRouterOnce("history")}
        icon={<HistoryIcon_SVG />}
        text={"주문내역"}
      />
      <Category
        onClickFn={onClickRouterOnce("bill")}
        icon={<BillIcon_SVG />}
        text={"계산서"}
      />
    </ul>
  );
}

function Category({
  onClickFn,
  icon,
  text,
}: {
  onClickFn: () => void;
  icon: ReactNode;
  text: string;
}) {
  return (
    <li
      className={"flex h-5 cursor-pointer items-center gap-2"}
      onClick={onClickFn}
    >
      <div className={"flex h-[14px] w-[14px]"}>{icon}</div>
      <p className={"leading-5"}>{text}</p>
    </li>
  );
}

function CallIcon_SVG() {
  return (
    <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M 216 64 c -13.3 0 -24 10.7 -24 24 s 10.7 24 24 24 l 16 0 l 0 33.3 
            C 119.6 157.2 32 252.4 32 368 l 448 0 c 0 -115.6 -87.6 -210.8 -200 -222.7 
            l 0 -33.3 l 16 0 c 13.3 0 24 -10.7 24 -24 s -10.7 -24 -24 -24 l -40 0 l -40 0 Z 
            M 24 400 c -13.3 0 -24 10.7 -24 24 s 10.7 24 24 24 l 464 0 c 13.3 0 24 -10.7 
            24 -24 s -10.7 -24 -24 -24 L 24 400 Z"
        fill="currentColor"
      />
    </svg>
  );
}
function HistoryIcon_SVG() {
  return (
    <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M 40 48 C 26.7 48 16 58.7 16 72 l 0 48 c 0 13.3 10.7 24 24 24 l 48 0 c 13.3 0 24 -10.7 24 -24 l 0 -48 c 0 -13.3 -10.7 -24 -24 -24 L 40 48 Z 
             M 192 64 c -17.7 0 -32 14.3 -32 32 s 14.3 32 32 32 l 288 0 c 17.7 0 32 -14.3 32 -32 s -14.3 -32 -32 -32 L 192 64 Z 
             m 0 160 c -17.7 0 -32 14.3 -32 32 s 14.3 32 32 32 l 288 0 c 17.7 0 32 -14.3 32 -32 s -14.3 -32 -32 -32 l -288 0 Z 
             m 0 160 c -17.7 0 -32 14.3 -32 32 s 14.3 32 32 32 l 288 0 c 17.7 0 32 -14.3 32 -32 s -14.3 -32 -32 -32 l -288 0 Z 
             M 16 232 l 0 48 c 0 13.3 10.7 24 24 24 l 48 0 c 13.3 0 24 -10.7 24 -24 l 0 -48 c 0 -13.3 -10.7 -24 -24 -24 l -48 0 c -13.3 0 -24 10.7 -24 24 Z 
             M 40 368 c -13.3 0 -24 10.7 -24 24 l 0 48 c 0 13.3 10.7 24 24 24 l 48 0 c 13.3 0 24 -10.7 24 -24 l 0 -48 c 0 -13.3 -10.7 -24 -24 -24 l -48 0 Z"
        fill="currentColor"
      />
    </svg>
  );
}
function BillIcon_SVG() {
  return (
    <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M 14 2.2 C 22.5 -1.7 32.5 -0.3 39.6 5.8 L 80 40.4 L 120.4 5.8 c 9 -7.7 22.3 -7.7 31.2 0 
             L 192 40.4 L 232.4 5.8 c 9 -7.7 22.3 -7.7 31.2 0 L 304 40.4 L 344.4 5.8 c 7.1 -6.1 17.1 -7.5 
             25.6 -3.6 s 14 12.4 14 21.8 l 0 464 c 0 9.4 -5.5 17.9 -14 21.8 s -18.5 2.5 -25.6 -3.6 
             L 304 471.6 l -40.4 34.6 c -9 7.7 -22.3 7.7 -31.2 0 L 192 471.6 l -40.4 34.6 c -9 7.7 
             -22.3 7.7 -31.2 0 L 80 471.6 L 39.6 506.2 c -7.1 6.1 -17.1 7.5 -25.6 3.6 S 0 497.4 0 488 
             L 0 24 C 0 14.6 5.5 6.1 14 2.2 Z 
             M 96 144 c -8.8 0 -16 7.2 -16 16 s 7.2 16 16 16 l 192 0 c 8.8 0 16 -7.2 16 -16 s -7.2 -16 
             -16 -16 L 96 144 Z 
             M 80 352 c 0 8.8 7.2 16 16 16 l 192 0 c 8.8 0 16 -7.2 16 -16 s -7.2 -16 -16 -16 L 96 336 
             c -8.8 0 -16 7.2 -16 16 Z 
             M 96 240 c -8.8 0 -16 7.2 -16 16 s 7.2 16 16 16 l 192 0 c 8.8 0 16 -7.2 16 -16 s -7.2 -16 
             -16 -16 L 96 240 Z"
        fill="currentColor"
      />
    </svg>
  );
}
