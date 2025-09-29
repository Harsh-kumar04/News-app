import { DataTypes } from "sequelize";
import sequelize from "../../../../database/db.js";

// Models
import SingupModel from "./singup.js";
import CategoryModel from "../../category/model/category.js";
import NewsModel from "../../news/models/news.js";
import CommentModel from "../../comment/modules/comment.js";
import LikeModel from "../../like/modules/like.js";

// Initialize models
const Singup = SingupModel(sequelize, DataTypes);
const Category = CategoryModel(sequelize, DataTypes);
const News = NewsModel(sequelize, DataTypes);
const Comment = CommentModel(sequelize, DataTypes);
const Like = LikeModel(sequelize, DataTypes); // ✅ initialize Like

// -------------------- Relations --------------------
// News belongs to a User (Reporter/Visitor)
Singup.hasMany(News, { foreignKey: "userId" });
News.belongsTo(Singup, { foreignKey: "userId" });

// News belongs to a Category
Category.hasMany(News, { foreignKey: "categoryId" });
News.belongsTo(Category, { foreignKey: "categoryId" });

News.hasMany(Comment, { foreignKey: "newsId" });
Comment.belongsTo(News, { foreignKey: "newsId" });

Singup.hasMany(Comment, { foreignKey: "userId" });
Comment.belongsTo(Singup, { foreignKey: "userId" });

News.hasMany(Like, { foreignKey: "newsId" });
Like.belongsTo(News, { foreignKey: "newsId" });

Singup.hasMany(Like, { foreignKey: "userId" });
Like.belongsTo(Singup, { foreignKey: "userId" });

// -------------------- Export DB --------------------
const db = {
  sequelize,
  Singup,
  Category,
  News,
  Comment,
  Like,
};

export default db;
