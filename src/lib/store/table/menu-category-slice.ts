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
  selectMenuCategoryTitle: ({ title }: { title: string }) => void;
}

export const menuCategorySlice: SliceCreator<MenuCategorySlice> =
  process.env.NODE_ENV === "development"
    ? (set) => ({
        ...initialState,
        selectMenuCategoryTitle: ({ title }: { title: string }) =>
          set(
            () => ({ categoryState: { title: title } }),
            undefined,
            "categoryState/selectMenuCategoryTitle",
          ),
      })
    : (set) => ({
        ...initialState,
        selectMenuCategoryTitle: ({ title }: { title: string }) =>
          set(() => ({ categoryState: { title: title } })),
      });
