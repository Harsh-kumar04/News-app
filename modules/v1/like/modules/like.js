export default (sequelize, DataTypes) => {
  const Like = sequelize.define("Like", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    newsId: { type: DataTypes.INTEGER, allowNull: false },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    type: { type: DataTypes.ENUM("like", "dislike"), allowNull: false }, // ✅ add
  });
  return Like;
};
