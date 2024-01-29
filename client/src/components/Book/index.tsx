import { useDispatch } from "react-redux"
import { IBook } from "../../types/book"
import { removeBook } from "../../features/books/bookSlice";
import { BOOKS_API_URL } from "../../routes";
import { closeModal, closeModalAfterAction, openModal, setButtons, setContent, setTitle } from "../../features/modals/modalSlice";
import "./style.scss"

const Book = (book: IBook) => {
    const { _id, title, author, publishYear } = book;

    const dispatch = useDispatch();

    const handleRemoveBook = async (_id: string | undefined) => {
        try {
            // server
            await fetch(`${BOOKS_API_URL}/books/${_id}`, {
                method: "DELETE"
            })
            // client
            dispatch(removeBook(_id))
        } catch (err) {
            alert(err);
        }
    }

    const modalRemoveBook = (book: IBook) => {
        dispatch(setTitle("Remove Book"));
        dispatch(setContent(`Are you agree to remove ${book.title} by ${book.author}?`))
        dispatch(setButtons([
            <button className="no-btn" onClick={() => dispatch(closeModal())}>Cancel</button>,
            <button
                className="yes-btn"
                onClick={() => dispatch(closeModalAfterAction(
                    () => { handleRemoveBook(book._id) }))}>
                I agree</button>,
        ]))
        dispatch(openModal());
    }

    return (
        <li className={`card card-${_id}`}>
            <h2>{title}</h2>
            <p>{author}</p>
            <p>{publishYear}</p>
            <button className="update-btn">update</button>
            <button className="remove-btn" onClick={() => modalRemoveBook(book)}>remove</button>
        </li>
    )
}

export default Book