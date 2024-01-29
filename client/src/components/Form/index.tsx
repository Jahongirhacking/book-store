import { ChangeEvent, useState } from "react";
import { createBook } from "../../features/books/bookSlice";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { BOOKS_API_URL } from "../../routes";
import "./style.scss"

const Form = () => {
    const dispatch = useDispatch()

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
        dispatch(createBook({
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
    )
}

export default Form