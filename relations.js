const Product = require('./models/productModel.js')
const Purchase = require('./models/purchaseModel.js')

module.exports = function(){
    Purchase.belongsTo(Product, {foreignKey: 'product', onDelete: 'CASCADE', onUpdate: 'CASCADE'})
}