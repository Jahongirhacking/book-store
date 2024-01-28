import { useSelector, useDispatch } from "react-redux"
import { IStore } from "./types/store"
import { IBook } from "./types/book"
import { AppDispatch } from "./features/store"
import { createBook } from "./features/books/bookSlice"
import { ChangeEvent, useEffect, useState } from "react"
import { fetchAsyncData } from "./features/books/bookThunk"
import { v4 as uuidv4 } from "uuid";
import "./style.scss"

const BOOKS_API_URL = process.env.REACT_APP_BOOKS_API_URL;

const App = () => {
  const storeBooks = useSelector((state: IStore) => state.storeBooks.booksList)
  const thunkDispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    thunkDispatch(fetchAsyncData());
  }, [thunkDispatch])

  const initialFormInputs = {
    title: "",
    author: "",
    publishYear: "",
  }

  const [formInputs, setFormInputs] = useState(initialFormInputs)

  const addBook = async () => {
    const publishYear = Number.parseInt(formInputs.publishYear);
    if (!formInputs.author || !formInputs.title || !publishYear) return;
    // server
    fetch(`${BOOKS_API_URL}/books`, {
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({ ...formInputs, publishYear })
    })
    // client
    thunkDispatch(createBook({
      _id: uuidv4(),
      title: formInputs.title,
      author: formInputs.author,
      publishYear
    }))
    //  clear
    setFormInputs(initialFormInputs)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormInputs({ ...formInputs, [name]: value })
  }

  return (
    <main className="container">
      <form className="form" onSubmit={(e) => { e.preventDefault() }}>
        <label>
          Title
          <input
            onChange={handleChange}
            name="title"
            value={formInputs.title}
            type="text"
            placeholder="Text..."
            autoComplete="off"
          />
        </label>
        <label>
          Author
          <input
            onChange={handleChange}
            name="author"
            value={formInputs.author}
            type="text"
            placeholder="Text..."
            autoComplete="off"
          />
        </label>
        <label>
          Publish year
          <input
            onChange={handleChange}
            name="publishYear"
            value={formInputs.publishYear}
            type="text"
            placeholder="Number..."
            autoComplete="off"
          />
        </label>
        <button onClick={addBook}>Submit</button>
      </form>
      <hr />

      Count: {storeBooks.count}
      <ul className="card-container">
        {
          storeBooks.books.map((book: IBook) => (
            <li className="card" key={book._id}>
              <h2>{book.title}</h2>
              <p>{book.author}</p>
              <p>{book.publishYear}</p>
            </li>
          ))
        }
      </ul>
    </main>
  )
}

export default App