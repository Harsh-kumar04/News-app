export default (sequelize, DataTypes) => {
  const Comment = sequelize.define("Comment", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    content: { type: DataTypes.TEXT, allowNull: false },
    newsId: { type: DataTypes.INTEGER, allowNull: false }, // ✅ foreign key
    userId: { type: DataTypes.INTEGER, allowNull: false }, // ✅ foreign key
  });
  return Comment;
};
