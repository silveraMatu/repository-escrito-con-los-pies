import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
    "practica_ts", "root", "", 
    {
        host:"locahost",
        dialect: "mysql"
    } 
)

export const connectDB = async()=>{
    try {
        await sequelize.authenticate()
        console.log("conectado a la db");
        await sequelize.sync()
        console.log("modelos sincronizados");
        
    } catch (e) {
        console.log("error al conectar con la base de datos:", e);
    }
}