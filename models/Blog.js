const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Blog extends Model {}

Blog.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // -------------------------------------------------------------
    // Check if there is a more appropriate type for longer string
    // -------------------------------------------------------------
    blog_content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    // -------------------------------------------------------------
    // Can I just access the timestamp from below???
    // -------------------------------------------------------------
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