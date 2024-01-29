import { useDispatch, useSelector } from "react-redux"
import { IBook } from "../../types/book"
import { IStore } from "../../types/store"
import { useEffect } from "react";
import { AppDispatch } from "../../features/store";
import { fetchAsyncData } from "../../features/books/bookThunk";
import Book from "../Book";
import "./style.scss"

const BookContainer = () => {
    const thunkDispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        thunkDispatch(fetchAsyncData());
    }, [thunkDispatch])

    const storeBooks = useSelector((state: IStore) => state.storeBooks.booksList)
    return (
        <>
            Count: {storeBooks.count}
            <ul className="card-container">
                {
                    storeBooks.books.map((book: IBook) => (
                        <Book {...book} />
                    ))
                }
            </ul>
        </>
    )
}

export default BookContainer