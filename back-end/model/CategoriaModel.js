import { Sequelize } from "sequelize";
import banco from "../banco.js";

export default banco.define("categoria", {
    idcategoria: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    categoria: {
        type: Sequelize.STRING,
        allowNull: false
    }
});