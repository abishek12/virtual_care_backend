import { DataTypes, Model } from "sequelize";

import { sequelize } from "../../../lib/constants/database.js";

class ServiceModel extends Model {}

ServiceModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: { type: DataTypes.STRING, allowNull: false },
    featured_image: {
      type: DataTypes.TEXT,
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
    is_active: {
      type: DataTypes.TINYINT,
      defaultValue: 1,
    },
    is_deleted: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "services",
    tableName: "services",
    freezeTableName: true,
    timestamps: true,
  }
);

export default ServiceModel;
