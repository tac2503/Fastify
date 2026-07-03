import {Sequelize} from 'sequelize';
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    logging: false,
    dialectOptions: {
        ssl: {
            requere: true,
            rejectUnauthorized: false
        }
    }
});

export default sequelize;

export async function initializeDatabase(){
    try {
        
        await import("../models/User.js");
        await import("../models/Otp.js");
        
        await sequelize.authenticate();
        console.log("conexion exitosa");

        await sequelize.sync({
            alter: true
        });
        console.log("tablas sincronizadas")
    } catch (error){
        console.error("Error:", error);
        process.exit(1);
    }
}


