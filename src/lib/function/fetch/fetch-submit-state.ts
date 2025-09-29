import { SelectedMenu, Status } from "@/types/common";
import postOrderList from "../../supabase/function/post-order-list";
import postRequestList from "../../supabase/function/post-request-list";
import { AllSlices, useBoundStore } from "../../store/use-bound-store";
import { SubmitSlice } from "../../store/util/submit-slice";

/* TODO: query mutation 적용 */
export const postSubmitState =
  process.env.NODE_ENV === "development"
    ? async ({
        orderList,
        requestStr,
        submitError,
        set,
        get,
      }: {
        orderList?: SelectedMenu[];
        requestStr?: string;
        submitError?: boolean;
        set: typeof useBoundStore.setState;
        get: () => SubmitSlice;
      }) => {
        let result;
        let status: Status = "pending";
        let isSubmit = true;
        const getAll = get() as AllSlices;
        const setFetchMode = getAll.setFetchMode;

        // fetchMode 설정
        const fetchMode = orderList ? "order" : "request";
        setFetchMode({ mode: fetchMode });

        // GetTableOrderList 에러 발생, 메뉴 전달 이전 반환
        if (submitError) {
          status = "rejected";
          isSubmit = false;

          set(
            (state) => ({
              submitState: { ...state.submitState, isSubmit, status },
            }),
            undefined,
            `submitState/${fetchMode}/${status}`,
          );

          return;
        }

        // 유형 별 패치 분류
        const tableName = getAll.tableState.tableName;

        if (orderList) {
          result = await postOrderList(Number(tableName), orderList);
        } else if (requestStr) {
          result = await postRequestList(Number(tableName), requestStr);
        }

        // pending
        set(
          (state) => ({
            submitState: { ...state.submitState, isSubmit, status },
          }),
          undefined,
          `submitState/${fetchMode}/${status}`,
        );

        // fulfilled
        status = "fulfilled";
        isSubmit = false;

        // rejected
        if (result?.error) {
          status = "rejected";
          isSubmit = false;
        }

        // result 따른 상태 변화
        set(
          (state) => ({
            submitState: { ...state.submitState, isSubmit, status },
          }),
          undefined,
          `submitState/${fetchMode}/${status}`,
        );

        // 마지막 단계 처리
        const setModalOpen = getAll.setModalOpen;

        if (requestStr) {
          setModalOpen({ isOpen: true });
        }
      }
    : async ({
        orderList,
        requestStr,
        submitError,
        set,
        get,
      }: {
        orderList?: SelectedMenu[];
        requestStr?: string;
        submitError?: boolean;
        set: typeof useBoundStore.setState;
        get: () => SubmitSlice;
      }) => {
        let result;
        let status: Status = "pending";
        let isSubmit = true;
        const getAll = get() as AllSlices;
        const setFetchMode = getAll.setFetchMode;

        const fetchMode = orderList ? "order" : "request";
        setFetchMode({ mode: fetchMode });

        if (submitError) {
          status = "rejected";
          isSubmit = false;

          set(
            (state) => ({
              submitState: { ...state.submitState, isSubmit, status },
            }),
            undefined,
            `submitState/${fetchMode}/${status}`,
          );

          return;
        }

        const tableName = getAll.tableState.tableName;

        if (orderList) {
          result = await postOrderList(Number(tableName), orderList);
        } else if (requestStr) {
          result = await postRequestList(Number(tableName), requestStr);
        }

        set((state) => ({
          submitState: { ...state.submitState, isSubmit, status },
        }));

        status = "fulfilled";
        isSubmit = false;

        if (result?.error) {
          status = "rejected";
          isSubmit = false;
        }

        set((state) => ({
          submitState: { ...state.submitState, isSubmit, status },
        }));

        const setModalOpen = getAll.setModalOpen;

        if (requestStr) {
          setModalOpen({ isOpen: true });
        }
      };
