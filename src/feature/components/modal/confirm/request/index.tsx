import { useBoundStore } from "@/lib/store/use-bound-store";

import {
  Button,
  DialogBackDrop,
  DialogFrame,
  ModalHeadTitle,
} from "../modal-type";
import Link from "next/link";

type RequestConfirmProps = {};

export default function RequestConfirmModal({}: RequestConfirmProps) {
  const isModalOpen = useBoundStore((state) => state.modalState.isOpen);
  const isSuccess = useBoundStore((state) => state.submitState.isSuccess);
  const tableNumber = useBoundStore((state) => state.tableState.number);
  const isSubmit = useBoundStore((state) => state.submitState.isSubmit);
  const resetCallState = useBoundStore((state) => state.resetCallState);
  const setMenuCategory = useBoundStore((state) => state.selectMenuCategory);

  const title = isSuccess
    ? "요청되었습니다!"
    : `오류가 발생했습니다. 직원을 불러주세요.`;

  function onClickContinue() {
    if (isSubmit) return;
    setMenuCategory({ title: "전체메뉴" });
    resetCallState();
  }

  return (
    <>
      <DialogFrame id="request" isOpen={isModalOpen}>
        <ModalHeadTitle title={title} />

        <Link
          href={`/table/${tableNumber}`}
          replace={true}
          className={"flex h-2/5 w-full border-t-[1px] border-[#e6e6e6]"}
        >
          <Button title="확인" onClick={onClickContinue} />
        </Link>
      </DialogFrame>

      {isModalOpen && <DialogBackDrop key={"DialogBackDrop"} />}
    </>
  );
}
