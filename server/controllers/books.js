import { Book } from "../models/bookModel.js";

export const createBook = async (req, res) => {
  try {
    const { author, publishYear, title } = req.body;
    if (!publishYear || !author || !title) {
      throw new Error("not enough fields");
    }
    const newBook = { author, title, publishYear };
    const book = await Book.create(newBook);
    return res.status(201).json(book);
  } catch (err) {
    console.error(err);
    res.status(400).send("Cannot create a book");
  }
};

export const getBooks = async (_, res) => {
  try {
    const books = await Book.find({});
    res.status(200).json({
      count: books.length,
      books,
    });
  } catch (err) {
    res.status(400).send("Cannot get a book");
  }
};
