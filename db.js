const sequelize_orm = require('sequelize')

const sequelize = new  sequelize_orm('cola', 'root', 'root', {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 8889,
    logging: false
})

module.exports = sequelize