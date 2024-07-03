import { Sequelize } from "sequelize";
import banco from "../banco.js";

export default banco.define("livroautor", {
    idlivroautor: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    idlivro: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    idautor: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});