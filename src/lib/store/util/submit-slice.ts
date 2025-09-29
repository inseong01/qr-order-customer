import { SliceCreator } from "@/types/slice";
import { SelectedMenu, Status } from "@/types/common";

import { postSubmitState } from "../../function/fetch/fetch-submit-state";

type FetchMode = "order" | "request" | "";

type InitialState = {
  submitState: {
    isSubmit: boolean;
    status: Status;
    isNext: boolean;
    fetchMode: FetchMode;
  };
};

const initialState: InitialState = {
  submitState: {
    isSubmit: false,
    status: "",
    isNext: false,
    fetchMode: "",
  },
};

export interface SubmitSlice {
  submitState: {
    isSubmit: boolean;
    status: Status;
    isNext: boolean;
    fetchMode: FetchMode;
  };
  resetSubmitState: () => void;
  fetchOrderArr: ({
    orderList,
    submitError,
  }: {
    orderList: SelectedMenu[];
    submitError: boolean;
  }) => void;
  fetchRequest: ({ requestStr }: { requestStr: string }) => void;
  setNexPageEnable: ({ isNext }: { isNext: boolean }) => void;
  setFetchMode: ({ mode }: { mode: FetchMode }) => void;
}

/*
  주문 패치 결과 (fulfilled)
  {
    "error": null,
    "data": [...],
    "count": null,
    "status": 201,
    "statusText": ""
  }
*/

export const submitSlice: SliceCreator<SubmitSlice> =
  process.env.NODE_ENV === "development"
    ? (set, get) => ({
        ...initialState,
        resetSubmitState: () =>
          set(initialState, undefined, "submitState/resetSubmitState"),
        fetchOrderArr: ({
          orderList,
          submitError,
        }: {
          orderList: SelectedMenu[];
          submitError: boolean;
        }) => {
          postSubmitState({ orderList, submitError, set, get });
        },
        fetchRequest: ({ requestStr }: { requestStr: string }) => {
          postSubmitState({ requestStr, set, get });
        },
        setNexPageEnable: ({ isNext }: { isNext: boolean }) =>
          set(
            (state) => ({ submitState: { ...state.submitState, isNext } }),
            undefined,
            "submitState/setNexPageEnable",
          ),
        setFetchMode: ({ mode }: { mode: FetchMode }) =>
          set(
            (state) => ({
              submitState: { ...state.submitState, fetchMode: mode },
            }),
            undefined,
            "submitState/setFetchMode",
          ),
      })
    : (set, get) => ({
        ...initialState,
        resetSubmitState: () => set(initialState),
        fetchOrderArr: ({
          orderList,
          submitError,
        }: {
          orderList: SelectedMenu[];
          submitError: boolean;
        }) => {
          postSubmitState({ orderList, submitError, set, get });
        },
        fetchRequest: ({ requestStr }: { requestStr: string }) => {
          postSubmitState({ requestStr, set, get });
        },
        setNexPageEnable: ({ isNext }: { isNext: boolean }) =>
          set((state) => ({ submitState: { ...state.submitState, isNext } })),
        setFetchMode: ({ mode }: { mode: FetchMode }) =>
          set((state) => ({
            submitState: { ...state.submitState, fetchMode: mode },
          })),
      });
