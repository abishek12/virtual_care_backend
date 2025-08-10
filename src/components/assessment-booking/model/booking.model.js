import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../lib/constants/database.js";

class BookingModel extends Model {}

BookingModel.init(
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date_of_visit: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    type_of_service: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message_notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("pending", "read", "unread", "archive"),
      defaultValue: "pending",
    },
    is_deleted: {
      type: DataTypes.TINYINT,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "booking",
    tableName: "appointment_booking",
    freezeTableName: true,
    timestamps: true,
  }
);

export default BookingModel;
