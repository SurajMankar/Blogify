import express from "express";
import bodyParser from "body-parser";

const port = 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

let blogId = 0;

let allBlogs = [
  {
    blogId: 0,
    blogTitle: "Morning Bliss",
    blogAuthor: "John Doe",
    blogContent:
      "In the quiet dawn, sunlight gently spills through the window, casting a warm glow on the room. The peaceful morning invites calm reflection and a fresh start.",
  },
  {
    blogId: 1,
    blogTitle: "Today's Tech",
    blogAuthor: " Suraj Mankar",
    blogContent:
      "Rapid advancements in AI, blockchain, and quantum computing are reshaping industries. These technologies drive innovation, streamline processes, and offer unprecedented opportunities for growth in the digital age.",
  },
  {
    blogId: 2,
    blogTitle: "Programmer's Dilemma",
    blogAuthor: " Suraj Mankar",
    blogContent:
      "Why do programmers prefer dark mode? Because the light attracts bugs!😁 A simple shift in preference makes a world of difference in coding.",
  },
  {
    blogId: 3,
    blogTitle: "India Unveils Drones",
    blogAuthor: "BBC",
    blogContent:
      "India revealed Kamikaze drones with a 1,000 km range, showcasing advancements in indigenous defense technology​.",
  },
];

app.get("/", function (req, res) {
  res.render("index.ejs", { allBlogs, title: "Home" });
});

app.get("/about", (req, res) => {
  res.render("about.ejs", { title: "about" });
});

app.get("/contact", function (req, res) {
  res.render("contact.ejs", { title: "contact" });
});

app.get("/blogs/create", function (req, res) {
  res.render("create.ejs", { title: "New Blog" });
});

app.post("/create", (req, res) => {
  let newBlog = {
    blogId: blogId++,
    blogTitle: req.body["title"],
    blogAuthor: req.body["author"],
    blogContent: req.body["content"],
  };

  // console.log(newBlog);

  allBlogs.push(newBlog);
  res.redirect("/");
});

app.post("/blog/delete/:Id", (req, res) => {
  const blogIdToDelete = parseInt(req.params.Id);

  // Find the index of the blog with the specified blogId
  const blogIndex = allBlogs.findIndex(
    (blog) => blog.blogId === blogIdToDelete
  );

  if (blogIndex !== -1) {
    allBlogs.splice(blogIndex, 1);
  }

  res.redirect("/");
});

const port=process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
