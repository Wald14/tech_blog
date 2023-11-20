// Import models
const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comment');


// ==============================
// Blog & User relationship
// ==============================
// A User can have many Blogs
User.hasMany(Blog, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
})

// A Blog belongs to one User
Blog.belongsTo(User, {
  foreignKey: 'user_id',
})


// ==============================
// Comment & Blog relationship
// ==============================
Blog.hasMany(Comment, {
  foreignKey: 'blog_id',
  onDelete: 'CASCADE',
})

Comment.belongsTo(Blog, {
  foreignKey: 'blog_id',
})


// ==============================
// Comment & User relationship
// ==============================
User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
})

Comment.belongsTo(User, {
  foreignKey: 'user_id',
})


module.exports = { User, Blog, Comment }