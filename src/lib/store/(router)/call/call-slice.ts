import { Request } from "@/types/common";
import { SliceCreator } from "@/types/slice";

type InitialState = {
  callState: {
    isClicked: boolean;
    selectedRequests: Request[];
  };
};

const initialState: InitialState = {
  callState: {
    isClicked: false,
    selectedRequests: [],
  },
};

export interface CallSlice {
  callState: {
    isClicked: boolean;
    selectedRequests: Request[];
  };
  resetCallState: () => void;
  selectRequest: ({ id, title, quantity }: Request) => void;
  changeRequestAmount: ({
    id,
    quantity,
  }: {
    id: Request["id"];
    quantity: Request["quantity"];
  }) => void;
}

export const callSlice: SliceCreator<CallSlice> =
  process.env.NODE_ENV === "development"
    ? (set) => ({
        ...initialState,
        resetCallState: () =>
          set(initialState, undefined, "callState/resetCallState"),
        selectRequest: ({ id, title, quantity }: Request) =>
          set(
            (state) => {
              const { selectedRequests } = state.callState;
              const isIncludedSameItem = selectedRequests.some(
                (item) => item.id === id,
              );

              if (isIncludedSameItem) {
                const prevRequestArr = selectedRequests.filter(
                  (item) => item.id !== id,
                );
                const isEmptyArr = prevRequestArr.length === 0;

                if (isEmptyArr) return initialState;

                return {
                  callState: {
                    ...state.callState,
                    selectedRequests: prevRequestArr,
                  },
                };
              }

              const updatedRequestArr = [
                ...selectedRequests,
                { id, title, quantity },
              ];
              return {
                callState: {
                  isClicked: true,
                  selectedRequests: updatedRequestArr,
                },
              };
            },
            undefined,
            "callState/selectRequest",
          ),
        changeRequestAmount: ({
          id,
          quantity,
        }: {
          id: Request["id"];
          quantity: Request["quantity"];
        }) =>
          set(
            (state) => {
              const { selectedRequests } = state.callState;
              const changeItemAmount = (item: Request) => {
                const isSameItem = item.id === id;

                if (isSameItem) return { ...item, quantity };

                return { ...item };
              };

              const updatedRequestArr = [...selectedRequests].map(
                changeItemAmount,
              );

              return {
                callState: {
                  ...state.callState,
                  selectedRequests: updatedRequestArr,
                },
              };
            },
            undefined,
            "callState/changeItemAmount",
          ),
      })
    : (set) => ({
        ...initialState,
        resetCallState: () => set(initialState),
        selectRequest: ({ id, title, quantity }: Request) =>
          set((state) => {
            const { selectedRequests } = state.callState;
            const isIncludedSameItem = selectedRequests.some(
              (item) => item.id === id,
            );

            if (isIncludedSameItem) {
              const prevRequestArr = selectedRequests.filter(
                (item) => item.id !== id,
              );
              const isEmptyArr = prevRequestArr.length === 0;

              if (isEmptyArr) return initialState;

              return {
                callState: {
                  ...state.callState,
                  selectedRequests: prevRequestArr,
                },
              };
            }

            const updatedRequestArr = [
              ...selectedRequests,
              { id, title, quantity },
            ];
            return {
              callState: {
                isClicked: true,
                selectedRequests: updatedRequestArr,
              },
            };
          }),
        changeRequestAmount: ({
          id,
          quantity,
        }: {
          id: Request["id"];
          quantity: Request["quantity"];
        }) =>
          set((state) => {
            const { selectedRequests } = state.callState;
            const changeItemAmount = (item: Request) => {
              const isSameItem = item.id === id;

              if (isSameItem) return { ...item, quantity };

              return { ...item };
            };

            const updatedRequestArr = [...selectedRequests].map(
              changeItemAmount,
            );

            return {
              callState: {
                ...state.callState,
                selectedRequests: updatedRequestArr,
              },
            };
          }),
      });
