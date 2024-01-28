import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { PORT, DB_PATH } from "./config.js";
import * as BookControllers from "./controllers/books.js";

const app = express();

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  return res.status(234).send("Welcome to the book-store project!");
});

app.post("/books", BookControllers.createBook);
app.get("/books", BookControllers.getBooks);

mongoose
  .connect(DB_PATH)
  .then(() => {
    console.log("App is connected to the Database");
    app.listen(PORT, () => {
      try {
        console.log(`Server is running on http://localhost:${PORT}`);
      } catch (err) {
        console.error(err);
      }
    });
  })
  .catch((err) => console.error(err));
