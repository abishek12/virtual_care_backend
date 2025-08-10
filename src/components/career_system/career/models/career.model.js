import { DataTypes, Model } from "sequelize";

import { sequelize } from "../../../lib/constants/database.js";

class CareerModel extends Model {}

CareerModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tags: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    short_description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    responsibilities: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    requirements: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    author_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "career",
    tableName: "career",
    freezeTableName: true,
    timestamps: true,
  }
);

export default CareerModel;
