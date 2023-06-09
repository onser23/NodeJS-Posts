const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const adminRoutes = require("./routes/adminRoutes");
const blogRoutes = require("./routes/blogRoutes");
const authRoutes = require("./routes/authRoutes");
const { requireAuth, checkUser } = require("./middleware/authMiddleware");

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
app.use(cookieParser());

app.get("*", checkUser);
app.get("/", (req, res) => {
  //
  res.redirect("/blog");
});

app.use("/", authRoutes);
app.use("/blog", blogRoutes);
app.use("/admin", requireAuth, adminRoutes);

app.get("/about", (req, res) => {
  res.render("about", { title: "Haqqimizda" });
});

app.get("/about-us", (req, res) => {
  res.render("/about.html", { title: "Ana Sehife" });
});

app.use((req, res) => {
  res.status(404).render("404", { title: "Sehife Tapilmadi" });
});
