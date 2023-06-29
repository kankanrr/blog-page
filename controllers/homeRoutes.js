// vars
const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const sequelize = require("../config/connection");

// post route
router.get("/", async (req, res) => {
  try {
    // get post from our database
    const dbPostData = await Post.findAll({
      attributes: ["id", "title", "content", "created_at"],
      include: [
        {
          model: Comment,
          attributes: ["id", "comment", "postId", "userId", "created_at"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
        {
          model: User,
          attributes: ["username"],
        },
      ],
      order: [["created_at", "DESC"]],
    });
    // serialize data
    const posts = dbPostData.map((post) => post.get({ plain: true }));
    console.log(posts);
    res.render("homepage", {
      posts,
      loggedIn: req.session.loggedIn,
      username: req.session.username,
      userId: req.session.userId,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get post by id route
router.get("/post/:id", async (req, res) => {
  try {
    const dbPostData = await Post.findOne({
      where: { id: req.params.id },
      attributes: ["id", "content", "title", "created_at"],
      include: [
        {
          model: Comment,
          attributes: ["id", "comment", "postId", "userId", "created_at"],
          include: {
            model: User,
            attributes: ["username"],
          },
        },
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    if (dbPostData) {
      const post = dbPostData.get({ plain: true });
      console.log(post);
      res.render("single-post", {
        post,
        loggedIn: req.session.loggedIn,
        username: req.session.username,
      });
    } else {
      res.status(404).json({ message: "This id has no post." });
      return;
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// login route
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

// sign up route
router.get("/signup", async (req, res) => {
  res.render("signup");
});

module.exports = router;