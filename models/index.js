const User = require("./User");
const Comment = require("./Comment");
const Post = require("./Post");

User.hasMany(Post, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

User.hasMany(Comment, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

Comment.belongsTo(User, {
  foreignKey: "userId",
});

Comment.belongsTo(Post, {
  foreignKey: "postId",
});

Post.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

Post.hasMany(Comment, {
  foreignKey: "postId",
  onDelete: "CASCADE",
});

module.exports = { User, Comment, Post };
