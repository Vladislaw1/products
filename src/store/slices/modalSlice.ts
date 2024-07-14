import {createSlice, Draft, PayloadAction} from "@reduxjs/toolkit";
import {Product} from "../../shared";

interface ModalState {
  isOpen: boolean;
  product: Product | null;
}

const initialState = {
    isOpen: false,
    product: null
}

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers:{
        openModal: (state: Draft<ModalState>,action: PayloadAction<Product | undefined>) => {
            state.isOpen = true;
            state.product = action?.payload || null
        },
        closeModal: (state) => {
            state.isOpen = false;
            state.product = null;
        }
    }
})

export const {openModal,closeModal} = modalSlice.actions
export default modalSlice.reducer;