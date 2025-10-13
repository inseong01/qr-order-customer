import { memo, ReactNode } from "react";

import HeaderBottom from "./bottom";
import HeaderMiddle from "./middle";
import HeaderTop from "./top";

function TableInitHeader() {
  return (
    <TableInitHeaderBox>
      <HeaderTop />
      <HeaderMiddle />
      <HeaderBottom />
    </TableInitHeaderBox>
  );
}

function TableInitHeaderBox({ children }: { children: ReactNode }) {
  return (
    <header
      className={
        "relative z-99 flex h-1/5 max-h-50 min-h-[200px] w-full flex-col justify-between bg-[#f4f4f4] px-6 py-4"
      }
    >
      {children}
    </header>
  );
}

export default memo(TableInitHeader);
