import { SliceCreator } from "@/types/slice";

type InitialState = {
  tableState: {
    id: string | undefined;
    meta?: {};
    number: number | undefined;
  };
};

const initialState: InitialState = {
  tableState: {
    id: undefined,
    meta: {},
    number: undefined,
  },
};

export interface TableSlice {
  tableState: {
    id: string | undefined;
    meta?: {};
    number: number | undefined;
  };
  setTableInfo: (info: InitialState) => void;
}

export const tableSlice: SliceCreator<TableSlice> =
  process.env.NODE_ENV === "development"
    ? (set) => ({
        ...initialState,
        setTableInfo: (info) =>
          set(
            (state) => ({
              ...state,
              tableState: {
                ...state.tableState,
                ...info,
              },
            }),
            false,
            "tableState/setTableInfo",
          ),
      })
    : (set) => ({
        ...initialState,
        setTableInfo: (info) =>
          set((state) => ({
            ...state,
            tableState: {
              ...state.tableState,
              ...info,
            },
          })),
      });
