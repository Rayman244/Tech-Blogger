const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Blog extends Model {}

// set up fields and rules for Product model
Blog.init(
  {
    // define columns
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      
     
    },
    blog_title:{
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: true,  
      }
    },
    blog_content:{
      type: DataTypes.TEXT,
      allowNull: false,
      validate:{
        notNull: true,  
      }
    },
    user_id:{
      type:DataTypes.INTEGER,
      references:{
        model:'user',
        key:'id'
      }
    }
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'blog',
  }
);
module.exports = Blog