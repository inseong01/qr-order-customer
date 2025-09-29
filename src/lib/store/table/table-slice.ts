import { SliceCreator } from "@/types/slice";

type InitialState = {
  tableState: {
    tableName: string;
  };
};

const initialState: InitialState = {
  tableState: {
    tableName: "",
  },
};

export interface TableSlice {
  tableState: {
    tableName: string;
  };
  setTableName: ({ table }: { table: string }) => void;
}

export const tableSlice: SliceCreator<TableSlice> =
  process.env.NODE_ENV === "development"
    ? (set) => ({
        ...initialState,
        setTableName: ({ table }: { table: string }) =>
          set(
            () => ({ tableState: { tableName: table } }),
            undefined,
            "tableState/setTableName",
          ),
      })
    : (set) => ({
        ...initialState,
        setTableName: ({ table }: { table: string }) =>
          set(() => ({ tableState: { tableName: table } })),
      });
