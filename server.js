import express from "express";
import cors from "cors";
import booksData from "./data/books.json";

const port = process.env.PORT || 8080;
const app = express();


app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {


  res.json({responeseMessage: "API about books!"});
});

app.get("/books", (req, res) => {
  res.status(200).json({booksData})
});

app.get("/books/reversed", (req, res) => {
  const booksDataReversed = booksData.reverse()
  res.status(200).json({booksDataReversed})
});

app.get("/books/:bookID", (req, res) => {
  const singleBook = booksData.find((book) => {
    return book.bookID === +req.params.bookID;

  });
  if(singleBook) {
    res.status(200).json({
      success: true,
      message: "OK",
      body: {
        booksData: singleBook
      }
    });
  } else {
    res.status(404).json({
      success: false,
      message: "Not found",
      body: {}
    });
  }

});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});