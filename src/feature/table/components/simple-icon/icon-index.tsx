import { IconType } from "../count-button/types";

import { ReactNode } from "react";

export default function SimpleIcon({ type }: { type: IconType }) {
  switch (type) {
    case "arrow-left": {
      return (
        <SimpleIconBox>
          <span
            className={
              "inline-block translate-x-1 -translate-y-0.5 -rotate-45 border-t-[1px] border-l-[1px] border-[#c9c9c9] p-1"
            }
          ></span>
        </SimpleIconBox>
      );
    }
    case "plus": {
      return (
        <SimpleIconBox>
          <Bar rotate="rotate-90" />
          <Bar rotate="rotate-0" />
        </SimpleIconBox>
      );
    }
    case "minus": {
      return (
        <SimpleIconBox>
          <Bar rotate="rotate-0" />
        </SimpleIconBox>
      );
    }
  }
}

function Bar({ rotate }: { rotate: string }) {
  return (
    <span
      id="line"
      className={`rounded-1 absolute top-1/2 left-1/2 h-[1px] w-1/2 -translate-1/2 ${rotate} bg-[#222]`}
    ></span>
  );
}

function SimpleIconBox({ children }: { children: ReactNode }) {
  return <div className={"relative h-full w-full"}>{children}</div>;
}
