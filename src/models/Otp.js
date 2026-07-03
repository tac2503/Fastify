import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Otp = sequelize.define("Otp",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    otp: {
        type: DataTypes.STRING(6),
        allowNull: false
    },
    email:{
        type:DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName:"otps",
    timestamps:true,
    updatedAt:false
} );

export default Otp;