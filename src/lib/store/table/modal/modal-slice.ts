import { ModalType, SliceCreator } from "@/types/slice";

type InitialState = {
  modalState: {
    type: ModalType;
    isOpen: boolean;
  };
};

const initialState: InitialState = {
  modalState: {
    type: "",
    isOpen: false,
  },
};

export interface ModalSlice {
  modalState: {
    type: ModalType;
    isOpen: boolean;
  };
  setModalType: ({ type }: { type: ModalType }) => void;
  setModalOpen: ({ isOpen }: { isOpen: boolean }) => void;
}

export const modalSlice: SliceCreator<ModalSlice> =
  process.env.NODE_ENV === "development"
    ? (set) => ({
        ...initialState,
        setModalType: ({ type }: { type: ModalType }) =>
          set(
            (state) => ({ modalState: { ...state.modalState, type } }),
            undefined,
            "modalState/setModalType",
          ),
        setModalOpen: ({ isOpen }: { isOpen: boolean }) =>
          set(
            (state) => ({ modalState: { ...state.modalState, isOpen } }),
            undefined,
            "modalState/setModalOpen",
          ),
      })
    : (set) => ({
        ...initialState,
        setModalType: ({ type }: { type: ModalType }) =>
          set((state) => ({ modalState: { ...state.modalState, type } })),
        setModalOpen: ({ isOpen }: { isOpen: boolean }) =>
          set((state) => ({ modalState: { ...state.modalState, isOpen } })),
      });
