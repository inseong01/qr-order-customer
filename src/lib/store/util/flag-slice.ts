import { SliceCreator } from "@/types/slice";

type InitialState = {
  flagState: {
    isClicked: boolean;
  };
};
const initialState: InitialState = {
  flagState: {
    isClicked: false,
  },
};

export interface FlagSlice {
  flagState: {
    isClicked: boolean;
  };
  resetflagState: () => void;
  setFlag: ({ isClicked }: { isClicked: boolean }) => void;
}

export const flagSlice: SliceCreator<FlagSlice> =
  process.env.NODE_ENV === "development"
    ? (set) => ({
        ...initialState,
        resetflagState: () =>
          set(initialState, undefined, "flagState/resetflagState"),
        setFlag: ({ isClicked }: { isClicked: boolean }) =>
          set(
            () => ({ flagState: { isClicked } }),
            undefined,
            "flagState/setflag",
          ),
      })
    : (set) => ({
        ...initialState,
        resetflagState: () => set(initialState),
        setFlag: ({ isClicked }: { isClicked: boolean }) =>
          set(() => ({ flagState: { isClicked } })),
      });
