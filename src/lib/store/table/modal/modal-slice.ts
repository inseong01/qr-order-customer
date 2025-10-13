import { SliceCreator } from "@/types/slice";

type InitialState = {
  modalState: {
    isOpen: boolean;
  };
};

const initialState: InitialState = {
  modalState: {
    isOpen: false,
  },
};

export interface ModalSlice {
  modalState: {
    isOpen: boolean;
  };
  setModalOpen: ({ isOpen }: { isOpen: boolean }) => void;
}

export const modalSlice: SliceCreator<ModalSlice> =
  process.env.NODE_ENV === "development"
    ? (set) => ({
        ...initialState,
        setModalOpen: ({ isOpen }: { isOpen: boolean }) =>
          set(
            (state) => ({ modalState: { ...state.modalState, isOpen } }),
            undefined,
            "modalState/setModalOpen",
          ),
      })
    : (set) => ({
        ...initialState,
        setModalOpen: ({ isOpen }: { isOpen: boolean }) =>
          set((state) => ({ modalState: { ...state.modalState, isOpen } })),
      });
