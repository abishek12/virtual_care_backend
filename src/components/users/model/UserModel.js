import { DataTypes, Model } from "sequelize";

import { sequelize } from "../../../lib/constants/database.js";

class UserModel extends Model {}

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_login: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    role: {
      type: DataTypes.ENUM(
        "administrator",
        "receptionist",
        "doctor",
        "nurse",
        "pharmacist",
        "subscriber"
      ),
      allowNull: false,
      defaultValue: "subscriber",
    },
    is_active: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 1,
    },
    is_deleted: {
      type: DataTypes.TINYINT,
      allowNull: true,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "users",
    tableName: "users",
    freezeTableName: true,
    timestamps: true,
    indexes: [
      { unique: true, fields: ["email"] },
      { unique: true, fields: ["username"] },
    ],
  }
);

export default UserModel;
