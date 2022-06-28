const sequelize = require('../db')
const { Sequelize, DataTypes } = require('sequelize');

module.exports = sequelize.define('Product', {
    _id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    quantity_on_stock: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
})