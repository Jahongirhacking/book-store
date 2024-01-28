import { createSlice } from "@reduxjs/toolkit";
import { IBook, IBooksList } from "../../types/book";
import { fetchAsyncData } from "./bookThunk";

export interface IState {
  isLoading: boolean;
  booksList: IBooksList;
}

const initialState: IState = {
  isLoading: false,
  booksList: {
    count: 0,
    books: [],
  },
};

const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    createBook: (state, action: { payload: IBook }): IState => {
      return {
        ...state,
        booksList: {
          count: state.booksList.count + 1,
          books: [...state.booksList.books, action.payload],
        },
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncData.pending, (state: IState) => {
        state.isLoading = true;
      })
      .addCase(fetchAsyncData.fulfilled, (state: IState, action) => {
        state.isLoading = false;
        if (!action.payload) return;
        state.booksList = {
          count: action.payload.count,
          books: action.payload.books,
        };
      })
      .addCase(fetchAsyncData.rejected, (state: IState) => {
        state.isLoading = false;
      });
  },
});

export const { createBook } = bookSlice.actions;

export default bookSlice.reducer;
