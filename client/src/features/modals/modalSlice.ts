import { createSlice } from "@reduxjs/toolkit";
import { IModal } from "../../types/modal";

const initialState: IModal = {
  isActive: false,
  title: "",
  content: "",
  buttons: [],
};

const modal = createSlice({
  name: "modal",
  initialState,
  reducers: {
    closeModal: (state) => {
      state.isActive = false;
    },
    closeModalAfterAction: (state, action) => {
      action.payload();
      state.isActive = false;
    },
    openModal: (state) => {
      state.isActive = true;
    },
    setButtons: (state, action) => {
      state.buttons = action.payload;
    },
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setContent: (state, action) => {
      state.content = action.payload;
    },
  },
});

export const {
  closeModal,
  closeModalAfterAction,
  openModal,
  setButtons,
  setContent,
  setTitle,
} = modal.actions;

export default modal.reducer;
