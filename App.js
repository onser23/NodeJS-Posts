const express = require("express");
const mongoose = require("mongoose");
const Blog = require("./models/blogs");

const app = express();

const dbURL =
  "mongodb+srv://Samad:Kanada555@blogcluster.nvqhc0a.mongodb.net/Blogposts?retryWrites=true&w=majority";
mongoose
  .connect(dbURL, { useNewUrlParser: true })
  .then((res) => app.listen(3000))
  .catch((err) => console.log(err));

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  //
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "Ana Sehife", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "Haqqimizda" });
});

app.get("/login", (req, res) => {
  res.render("login", { title: "Daxil ol" });
});

app.get("/about-us", (req, res) => {
  res.render("/about.html", { title: "Ana Sehife" });
});

app.get("/blog/:id", (req, res) => {
  const id = req.params.id;

  Blog.findById(id)
    .then((result) => {
      res.render("blog", { blog: result, title: result.title });
    })
    .catch((err) => {
      res.status(404).render("404", { title: "Sehife Tapilmadi" });
    });
});

app.get("/admin", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("admin", { title: "Admin", blogs: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/admin/add", (req, res) => {
  res.render("add", { title: "Yazi elave et" });
});

app.post("/admin/add", (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => {
      res.redirect("/admin");
    })
    .catch((err) => {
      console.log(err);
    });
});

app.delete("/admin/delete/:id", (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ link: "/admin" });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use((req, res) => {
  res.status(404).render("404", { title: "Sehife Tapilmadi" });
});
