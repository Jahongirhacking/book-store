import { Book } from "../models/bookModel.js";

export const getBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(200).send(books);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

export const createBook = async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send("Send all required fields");
    }

    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    const book = await Book.create(newBook);
    res.status(201).send(book);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
};
