import { SelectedMenu } from "@/types/common";
import { SliceCreator } from "@/types/slice";

type InitialState = {
  orderState: {
    isClicked: boolean;
    selectedMenu: SelectedMenu;
    list: SelectedMenu[];
  };
};

const initialState: InitialState = {
  orderState: {
    isClicked: false,
    selectedMenu: {
      name: "",
      price: 0,
      amount: 1,
      id: "",
    },
    list: [],
  },
};

export interface OrderSlice {
  orderState: {
    isClicked: boolean;
    selectedMenu: SelectedMenu;
    list: SelectedMenu[];
  };
  resetOrderState: () => void;
  clickMenu: ({
    name,
    price,
    id,
  }: {
    name: string;
    price: number;
    id: string;
  }) => void;
  selectClickedMenu: () => void;
  selectMenuInstantly: (menu: SelectedMenu) => void;
  removeSelectedMenu: ({ id }: { id: SelectedMenu["id"] }) => void;
  changeMenuAmount: ({ amount }: { amount: SelectedMenu["amount"] }) => void;
  changeMenuAmountInList: ({
    id,
    amount,
  }: {
    id: SelectedMenu["id"];
    amount: SelectedMenu["amount"];
  }) => void;
}

export const orderSlice: SliceCreator<OrderSlice> =
  process.env.NODE_ENV === "development"
    ? (set) => ({
        ...initialState,
        resetOrderState: () =>
          set(initialState, undefined, "orderState/resetPickUpState"),
        clickMenu: ({
          name,
          price,
          id,
        }: {
          name: string;
          price: number;
          id: string;
        }) =>
          set(
            (state) => {
              const { isClicked, selectedMenu } = state.orderState;
              const defaultMenuValue = {
                name,
                price,
                amount: 1,
                id,
              };
              const isSameMenuClickAgain = isClicked && selectedMenu.id === id;

              return {
                orderState: {
                  ...state.orderState,
                  selectedMenu: defaultMenuValue,
                  isClicked: !isSameMenuClickAgain,
                },
              };
            },
            undefined,
            "orderState/clickMenu",
          ),
        selectClickedMenu: () =>
          set(
            (state) => {
              const { list, selectedMenu } = state.orderState;
              const isAlreadyAddeddMenu = list.some(
                (item) => item.id === selectedMenu.id,
              );

              // 이미 추가된 메뉴인 경우
              if (isAlreadyAddeddMenu) {
                const updateMenuAmount = (list: SelectedMenu) => {
                  const isSameMenu = list.id === selectedMenu.id;

                  if (isSameMenu)
                    return { ...list, amount: selectedMenu.amount };

                  return list;
                };

                const updatedOrderArr = list.map(updateMenuAmount);

                return {
                  orderState: {
                    ...initialState.orderState,
                    list: updatedOrderArr,
                    isClicked: false,
                  },
                };
              }

              // 추가되지 않은 메뉴인 경우
              const updatedOrderArr = [...state.orderState.list, selectedMenu];

              return {
                orderState: {
                  ...initialState.orderState,
                  list: updatedOrderArr,
                  isClicked: false,
                },
              };
            },
            undefined,
            "orderState/selectClickedMenu",
          ),
        selectMenuInstantly: (menu: SelectedMenu) =>
          set(
            (state) => {
              const updatedOrderArr = [...state.orderState.list, menu];

              return {
                orderState: {
                  ...state.orderState,
                  list: updatedOrderArr,
                },
              };
            },
            undefined,
            "orderState/selectMenuInstantly",
          ),
        removeSelectedMenu: ({ id }: { id: SelectedMenu["id"] }) =>
          set(
            (state) => {
              const { list } = state.orderState;
              const updatedOrderArr = list.filter((list) => list.id !== id);

              return {
                orderState: {
                  ...state.orderState,
                  list: updatedOrderArr,
                },
              };
            },
            undefined,
            "orderState/removeSelectedMenu",
          ),
        // button, 수량 변경
        changeMenuAmount: ({ amount }: { amount: SelectedMenu["amount"] }) =>
          set(
            (state) => {
              const updatedMenuObj = {
                ...state.orderState.selectedMenu,
                amount,
              };

              return {
                orderState: {
                  ...state.orderState,
                  selectedMenu: updatedMenuObj,
                },
              };
            },
            undefined,
            "orderState/changeMenuAmount",
          ),
        // [table]/order, 메뉴 수량 변경
        changeMenuAmountInList: ({
          id,
          amount,
        }: {
          id: SelectedMenu["id"];
          amount: SelectedMenu["amount"];
        }) =>
          set(
            (state) => {
              const { list } = state.orderState;
              const updateMenuAmountInList = (list: SelectedMenu) => {
                const isSameMenu = list.id === id;
                if (isSameMenu) return { ...list, amount };
                return { ...list };
              };
              const updatedOrderArr = list.map(updateMenuAmountInList);

              return {
                orderState: {
                  ...state.orderState,
                  list: updatedOrderArr,
                },
              };
            },
            undefined,
            "orderState/changeMenuAmountInList",
          ),
      })
    : (set) => ({
        ...initialState,
        resetOrderState: () => set(initialState),
        clickMenu: ({
          name,
          price,
          id,
        }: {
          name: string;
          price: number;
          id: string;
        }) =>
          set((state) => {
            const { isClicked, selectedMenu } = state.orderState;
            const defaultMenuValue = {
              name,
              price,
              amount: 1,
              id,
            };
            const isSameMenuClickAgain = isClicked && selectedMenu.id === id;

            return {
              orderState: {
                ...state.orderState,
                selectedMenu: defaultMenuValue,
                isClicked: !isSameMenuClickAgain,
              },
            };
          }),
        selectClickedMenu: () =>
          set((state) => {
            const { list, selectedMenu } = state.orderState;
            const isAlreadyAddeddMenu = list.some(
              (item) => item.id === selectedMenu.id,
            );

            // 이미 추가된 메뉴인 경우
            if (isAlreadyAddeddMenu) {
              const updateMenuAmount = (list: SelectedMenu) => {
                const isSameMenu = list.id === selectedMenu.id;

                if (isSameMenu) return { ...list, amount: selectedMenu.amount };

                return list;
              };

              const updatedOrderArr = list.map(updateMenuAmount);

              return {
                orderState: {
                  ...initialState.orderState,
                  list: updatedOrderArr,
                  isClicked: false,
                },
              };
            }

            // 추가되지 않은 메뉴인 경우
            const updatedOrderArr = [...state.orderState.list, selectedMenu];

            return {
              orderState: {
                ...initialState.orderState,
                list: updatedOrderArr,
                isClicked: false,
              },
            };
          }),
        selectMenuInstantly: (menu: SelectedMenu) =>
          set((state) => {
            const updatedOrderArr = [...state.orderState.list, menu];

            return {
              orderState: {
                ...state.orderState,
                list: updatedOrderArr,
              },
            };
          }),
        removeSelectedMenu: ({ id }: { id: SelectedMenu["id"] }) =>
          set((state) => {
            const { list } = state.orderState;
            const updatedOrderArr = list.filter((list) => list.id !== id);

            return {
              orderState: {
                ...state.orderState,
                list: updatedOrderArr,
              },
            };
          }),
        // button, 메뉴 수량 변경
        changeMenuAmount: ({ amount }: { amount: SelectedMenu["amount"] }) =>
          set((state) => {
            const updatedMenuObj = {
              ...state.orderState.selectedMenu,
              amount,
            };

            return {
              orderState: {
                ...state.orderState,
                selectedMenu: updatedMenuObj,
              },
            };
          }),
        // [table]/order, 메뉴 수량 변경
        changeMenuAmountInList: ({
          id,
          amount,
        }: {
          id: SelectedMenu["id"];
          amount: SelectedMenu["amount"];
        }) =>
          set((state) => {
            const { list } = state.orderState;
            const updateMenuAmountInList = (list: SelectedMenu) => {
              const isSameMenu = list.id === id;
              if (isSameMenu) return { ...list, amount };
              return { ...list };
            };
            const updatedOrderArr = list.map(updateMenuAmountInList);

            return {
              orderState: {
                ...state.orderState,
                list: updatedOrderArr,
              },
            };
          }),
      });
