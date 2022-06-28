const Product = require('./models/productModel.js')
const Purchase = require('./models/purchaseModel.js')

module.exports = function(){
    Product.belongsTo(Purchase, {foreignKey: 'product', onDelete: 'CASCADE', onUpdate: 'CASCADE'})
}