import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../lib/constants/database.js";

class TestimonialModel extends Model {}

TestimonialModel.init(
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
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: { type: DataTypes.BIGINT, defaultValue: 3 },
    is_active: {
      type: DataTypes.TINYINT(1),
      defaultValue: 1,
    },
    is_deleted: {
      type: DataTypes.TINYINT(1),
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: "testimonials",
    modelName: "testimonials",
    freezeTableName: true,
    timestamps: true,
  }
);

export default TestimonialModel;
