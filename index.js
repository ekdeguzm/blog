import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

// Data Center
let posts = [];

// Post Constructor
function Post(title, content) {
  this.title = title;
  this.content = content;
  this.rawDate = new Date();
  this.date = this.rawDate.toLocaleString();
}

// Add Post
function addPost(title, content) {
  let post = new Post(title, content);
  posts.push(post);
}

// Delete Post
function deletePost(index) {
  posts.splice(index, 1);
}
// Edit Post
function editPost(index, title, content) {
  posts[index] = new Post(title, content);
}


// Middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Home
app.get("/", (req, res) => {
  res.render("index.ejs", { posts: posts });
});

// View Post
app.get("/view/:id", (req, res) => {
  let index = req.params.id;
  let post = posts[index];
  res.render("view.ejs", {
    postId: index,
    title: post.title,
    content: post.content,
    posts: posts,
  });
});

// Search function
app.post("/search", (req, res) => {
  const searchInfo = req.body.info.toLowerCase(); // Convert search info to lowercase for case-insensitive search
  const filteredPosts = posts.filter(post => post.title.toLowerCase().includes(searchInfo));

  // search if searchInfo is in the posts array.

  res.render("search.ejs", {
    searchInfo: searchInfo,
    posts: filteredPosts
  });
});

// Create post
app.get("/post", (req, res) => {
  res.render("post.ejs", {});
});

// Delete Post
app.post("/delete", (req, res) => {
  let index = req.body["postId"];
  deletePost(index);
  res.redirect("/");
});

// Edit Post Page
app.get("/edit/:id", (req, res) => {
  let index = req.params.id;
  let post = posts[index];
  res.render("post.ejs", {
    postId: index,
    title: post.title,
    content: post.content,
  });
});

// Save Post
app.post("/save", (req, res) => {
  let title = req.body["title"];
  let content = req.body["content"];

  addPost(title, content);
  res.redirect("/");
});

// Update
app.post("/update", (req, res) => {
  let title = req.body["title"];
  let content = req.body["content"];
  let index = req.body["index"];
  editPost(index, title, content);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
  addPost(
    "Mushrooms: The Hidden Gems of the Bog",
    "Bogs are unique ecosystems rich with hidden treasures, including the fascinating world of mushrooms. These fungi play a crucial role in maintaining the health of bogs by breaking down decaying organic matter, which recycles essential nutrients back into the soil. This process supports plant growth and sustains the delicate balance of the ecosystem. In bogs, mushrooms often form symbiotic relationships with plants, such as Sphagnum moss, enhancing their ability to retain water and absorb nutrients. Additionally, mushrooms serve as a food source for various animals, contributing to the biodiversity of the habitat. Their presence is a testament to the intricate and interconnected nature of bog ecosystems."
  );
  addPost(
    "Foraging for Food in a Bog",
    "Exploring a bog offers unique foraging opportunities. Look for cranberries, which are abundant and can be eaten raw or cooked. Blueberries are another common find, adding a sweet touch to your foraging basket. Cattails are versatile; their shoots can be eaten raw or cooked, and their roots can be ground into flour. Wild rice, often found in wetter areas, can be harvested and cooked for a nutritious meal. Remember to forage responsibly, ensuring plant populations remain sustainable for future adventurers. Always confirm plant identification to avoid poisonous varieties. Happy foraging!"
  );
});
