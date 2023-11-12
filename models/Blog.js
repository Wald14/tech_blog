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
    timeCreated: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
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