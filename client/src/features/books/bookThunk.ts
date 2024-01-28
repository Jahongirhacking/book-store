import { createAsyncThunk } from "@reduxjs/toolkit";
// import { IBooksList } from "../../types/book";

const BOOKS_API_URL = process.env.REACT_APP_BOOKS_API_URL as string;

export const fetchAsyncData = createAsyncThunk("get books", async () => {
  try {
    const res = await fetch(`${BOOKS_API_URL}/books`);
    if (!res.ok) throw new Error("not enough data");
    const booksList = await res.json();
    return booksList;
  } catch (err) {
    console.error(err);
  }
});
