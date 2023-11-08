const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
  {
    // -------------------------------------------------------------
    // Check if there is a more appropriate type for longer string
    // -------------------------------------------------------------
    comment_content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "User",
        key: "id",
      }
    },
    blog_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Blog",
        key: "id",
      }
    },
  },

  {
    sequelize,
    timestamps: true,
    underscored: true,
    modelName: 'Comment'
  }
);

module.exports = Comment;