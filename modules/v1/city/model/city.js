export default (sequelize, DataTypes) => {
  return sequelize.define("City", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    city: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  });
};
