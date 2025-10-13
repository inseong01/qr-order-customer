import { requestListQueryOption } from "@/lib/function/query/query-option";
import RequestList from "./display-request";
import MainTagFrame from "../../components/frame/main/main-index";
import ExceptionMessage from "../../components/exception/show-message/message-index";
import VerticalStackGroup from "../../components/vertical-stack/stack-index";
import Divider from "../../components/line/line-index";

import { useQueryClient } from "@tanstack/react-query";

export default function CallPageMain() {
  const queryClient = useQueryClient();
  const request = queryClient.getQueryState(requestListQueryOption.queryKey);

  const isNotError = !!request && request.status !== "error";
  const title = isNotError ? "요청 항목을 선택해주세요" : "요청 목록 오류";

  return (
    <MainTagFrame>
      {/* 제목 */}
      <VerticalStackGroup tag="div" gap="gap-2.5">
        <p>{title}</p>

        <Divider />
      </VerticalStackGroup>

      {/* 요청 가능 목록 */}
      {isNotError ? (
        <RequestList data={request?.data ?? []} />
      ) : (
        <ExceptionMessage domain="call" />
      )}
    </MainTagFrame>
  );
}
