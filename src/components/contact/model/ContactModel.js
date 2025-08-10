import { DataTypes, Model } from "sequelize";

import { sequelize } from "../../../lib/constants/database.js";

class ContactModel extends Model {}

ContactModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    subject: { type: DataTypes.STRING, allowNull: false },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("pending", "read", "unread", "archive"),
      defaultValue: "pending",
    },
  },
  {
    sequelize,
    timestamps: true,
    modelName: "contacts",
    tableName: "contacts",
    freezeTableName: true,
  }
);

export default ContactModel;
