import { Sequelize } from "sequelize";
import banco from "../banco.js";

export default banco.define("autor", {
    idautor: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    autor: {
        type: Sequelize.STRING,
        allowNull: false
    }
});