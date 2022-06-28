const sequelize = require('../db')
const { Sequelize, DataTypes } = require('sequelize');

module.exports = sequelize.define('Purchase', {
    _id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    puchased_quantity: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    purchased_price_per_peice: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
})