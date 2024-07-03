import { Sequelize } from "sequelize";
import banco from "../banco.js";

export default banco.define("editora", {
    ideditora: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    editora: {
        type: Sequelize.STRING,
        allowNull: false
    }
});