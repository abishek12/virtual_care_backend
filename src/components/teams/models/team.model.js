import { DataTypes, Model } from "sequelize";

import { sequelize } from "../../../lib/constants/database.js";

class TeamModel extends Model {}

TeamModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    designation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profile_image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active",
    },
  },
  {
    sequelize,
    modelName: "team",
    tableName: "teams",
    freezeTableName: true,
    timestamps: true,
  }
);

export { TeamModel };
