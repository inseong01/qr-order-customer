import { SliceCreator } from "@/types/slice";

type InitialState = {
  categoryState: {
    title: string;
  };
};

const initialState: InitialState = {
  categoryState: {
    title: "전체메뉴",
  },
};

export interface MenuCategorySlice {
  categoryState: {
    title: string;
  };
  selectMenuCategory: ({ title }: { title: string }) => void;
}

export const menuCategorySlice: SliceCreator<MenuCategorySlice> =
  process.env.NODE_ENV === "development"
    ? (set) => ({
        ...initialState,
        selectMenuCategory: ({ title }: { title: string }) =>
          set(
            () => ({ categoryState: { title: title } }),
            undefined,
            "categoryState/selectMenuCategory",
          ),
      })
    : (set) => ({
        ...initialState,
        selectMenuCategory: ({ title }: { title: string }) =>
          set(() => ({ categoryState: { title: title } })),
      });
