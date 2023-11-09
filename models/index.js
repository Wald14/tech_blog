const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comment');


// ==============================
// Blog & User relationship
// ==============================
Blog.belongsTo(User, {
  foreignKey: 'user_id',
})

User.hasMany(Blog, {
  foreignKey: 'user_id'
})

// ==============================
// Comment & User relationship
// ==============================
Comment.belongsTo(User, {
  foreignKey: 'user_id',
})

User.hasMany(Comment, {
  foreignKey: 'user_id'
})

// ==============================
// Comment & Blog relationship
// ==============================
Comment.belongsTo(Blog, {
  foreignKey: 'blog_id',
})

Blog.hasMany(Comment, {
  foreignKey: 'blog_id'
})


module.exports = { User, Blog, Comment }