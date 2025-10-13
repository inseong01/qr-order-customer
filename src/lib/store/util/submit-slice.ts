import { SliceCreator } from "@/types/slice";
import { Status } from "@/types/common";

type InitialState = {
  submitState: {
    isSubmit: boolean;
    status: Status;
    isNext: boolean;
    isSuccess: boolean;
  };
};

const initialState: InitialState = {
  submitState: {
    isSubmit: false,
    status: "",
    isNext: false,
    isSuccess: false,
  },
};

export interface SubmitSlice {
  submitState: {
    isSubmit: boolean;
    status: Status;
    isNext: boolean;
    isSuccess: boolean;
  };
  resetSubmitState: () => void;
  setNexPageEnable: ({ isNext }: { isNext: boolean }) => void;
  setFetchSucceeded: ({ isSuccess }: { isSuccess: boolean }) => void;
}

export const submitSlice: SliceCreator<SubmitSlice> =
  process.env.NODE_ENV === "development"
    ? (set, get) => ({
        ...initialState,
        resetSubmitState: () =>
          set(initialState, undefined, "submitState/resetSubmitState"),
        setNexPageEnable: ({ isNext }: { isNext: boolean }) =>
          set(
            (state) => ({ submitState: { ...state.submitState, isNext } }),
            undefined,
            "submitState/setNexPageEnable",
          ),
        setFetchSucceeded: ({ isSuccess }: { isSuccess: boolean }) =>
          set(
            (state) => ({
              submitState: { ...state.submitState, isSuccess },
            }),
            undefined,
            "submitState/setFetchSucceeded",
          ),
      })
    : (set) => ({
        ...initialState,
        resetSubmitState: () => set(initialState),
        setNexPageEnable: ({ isNext }: { isNext: boolean }) =>
          set((state) => ({ submitState: { ...state.submitState, isNext } })),
        setFetchSucceeded: ({ isSuccess }: { isSuccess: boolean }) =>
          set((state) => ({
            submitState: { ...state.submitState, isSuccess },
          })),
      });
