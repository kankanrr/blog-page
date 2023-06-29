// vars
const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const userAuth = require("../utils/auth.js");
const sequelize = require("../config/connection.js");

// post route

router.get("/", userAuth, (req, res) => {
  Post.findAll({
    where: {
      userId: req.session.userId,
    },
    attributes: ["id", "title", "content", "created_at"],
    order: [["created_at", "DESC"]],
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
  })
    .then((dbPostData) => {
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      res.render("dashboard", {
        posts,
        loggedIn: true,
        username: req.session.username,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get route
router.get("/edit/:id", userAuth, (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "title", "content", "created_at"],
    include: [
      {
        model: User,
        attributes: ["username"],
      },
      {
        model: Comment,
        attributes: ["id", "comment", "postId", "userId", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
    ],
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "Invalid post id." });
        return;
      }
      const post = dbPostData.get({ plain: true });
      res.render("edit-post", {
        post,
        loggedIn: true,
        username: req.session.username,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// get new post
router.get("/new", userAuth, (req, res) => {
  res.render("new-post", { username: req.session.username });
});

module.exports = router;
