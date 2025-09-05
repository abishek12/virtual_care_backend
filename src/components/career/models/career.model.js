import { DataTypes, Model } from "sequelize";

import { sequelize } from "../../../lib/constants/database.js";

class CareerRecepientModel extends Model {}

CareerRecepientModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
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
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    position_applied: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    experience_level: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    suburb: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_driver: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    resume: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cover_letter: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    supporting_document: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM,
      values: ["pending", "contact", "hired", "rejected"],
      defaultValue: "pending",
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "career_recepient",
    tableName: "career_recepients",
    freezeTableName: true,
    timestamps: true,
  }
);

export default CareerRecepientModel;
