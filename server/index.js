import express from "express";
import cors from "cors";

const PORT = 5000;

const app = express();

app.use(cors());

app.listen(PORT, () => {
  try {
    console.log(`Server is running on ${PORT}`);
  } catch (err) {
    console.error(err);
  }
});
