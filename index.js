import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", {
    year: new Date().getFullYear(),
  });
});

app.get("/post", (req, res) => {
  res.render("post.ejs", {
    year: new Date().getFullYear(),
  });
});

app.post("/submit", (req, res) => {
  res.render("index.ejs", {
    title: blogTitle,
    post: blogPost,
    year: new Date().getFullYear(),
  });
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
})
