export default (sequelize, DataTypes) => {
  const News = sequelize.define("News", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    heading: { type: DataTypes.STRING(255), allowNull: false },
    tag: { type: DataTypes.STRING(100), allowNull: false },
    imageUrl: { type: DataTypes.STRING, allowNull: true },
    content: { type: DataTypes.TEXT, allowNull: false },
    total_comments_count: { type: DataTypes.INTEGER, defaultValue: 0 }, // ✅ add
    total_likes_count: { type: DataTypes.INTEGER, defaultValue: 0 }, // ✅ add
  });
  return News;
};
