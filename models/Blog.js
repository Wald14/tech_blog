const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Blog extends Model {}

Blog.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    blog_content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    created_time: {
      type: DATETIME,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "User",
        key: "id",
      }
    },
  },

  {
    sequelize,
    timestamps: true,
    underscored: true,
    modelName: 'Blog'
  }
);

module.exports = Blog;