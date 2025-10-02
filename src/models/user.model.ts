import { Model, Optional, DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

interface userAttributes{
    id: number,
    username: string,
    email: string,
    password: string
}

interface userCreationAttributes extends Optional<userAttributes, "id">{}

export class User extends Model<userAttributes, userCreationAttributes>
    implements userAttributes{
        public id!: number
        public username!: string
        public email!: string
        public password!: string
    }

User.init(
    {

        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }

    },
    {
    modelName: "User",
    tableName: "users",
    sequelize
    }
)
