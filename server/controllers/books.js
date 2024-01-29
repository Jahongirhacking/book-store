import { Book } from "../models/bookModel.js";
import mongoose from "mongoose";
const INVALID_ID = { message: "Invalid book ID", status: 400 };
const NOT_FOUND = { message: "Not Found", status: 404 };

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

export const getBook = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(INVALID_ID.status).json(INVALID_ID);
    }

    const book = await Book.findById(id);
    if (!book) {
      return res.status(NOT_FOUND.status).json(NOT_FOUND);
    }
    res.status(200).send(book);
  } catch (err) {
    console.error(err);
  }
};

export const updateBook = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(INVALID_ID.status).json(INVALID_ID);
    }

    const { author, publishYear, title } = req.body;
    if (!publishYear || !author || !title) {
      throw new Error("not enough fields");
    }
    const newBook = { author, title, publishYear };

    const book = await Book.findByIdAndUpdate(id, newBook);

    if (!book) {
      return res.status(404).json();
    }
    res.status(200).send({ message: "The book is successfully updated!" });
  } catch (err) {
    console.error(err);
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id))
      return res.status(INVALID_ID.status).send(INVALID_ID);
    const book = await Book.findByIdAndDelete(id);
    if (!book) return res.status(NOT_FOUND.status).send(NOT_FOUND);
    return res
      .status(200)
      .send({ message: "The book is successfully deleted!" });
  } catch (err) {
    console.error(err);
  }
};
