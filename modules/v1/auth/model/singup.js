const SingupModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "Singup",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      username: {
        type: DataTypes.STRING(255),
      },
      phone: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user: {
        type: DataTypes.ENUM("Repoter", "visitor"),
        allowNull: false,
      },
      social: {
        type: DataTypes.ENUM("N", "F", "G", "A"),
        allowNull: true,
        defaultValue: "N",
      },
      social_id: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      token: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      city: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      indexes: [],
    }
  );
};

export default SingupModel;
