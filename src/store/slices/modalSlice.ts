import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name: "modal",
    initialState: {
        isOpen: false,
    },
    reducers:{
        openModal: (state,action: PayloadAction<string>) => {
            state.isOpen = true;
            state.product = action.payload
        },
        closeModal: (state) => {
            state.isOpen = false;
        }
    }
})

export const {openModal,closeModal} = modalSlice.actions
export default modalSlice.reducer;