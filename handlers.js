const Product = require('./models/productModel.js')
const Purchase = require('./models/purchaseModel.js')
const { Op } = require('sequelize')

exports.createPurchase = async (req, res) => {
    const fields = ['quantity', 'pricePerPiece']
    const productId = req.params.productId
    if(!productId) return res.json({status: false, message: 'product id is required!'})
    for(field of fields){
        if(
            !Object.keys(req.body || {}).includes(field)
            || !req.body[field]
        ) {
            return res.json({ status: false, message: `${field} is required!` })
        }
    }
    const {quantity, pricePerPiece} = req.body
    if(isNaN(parseFloat(quantity)) || isNaN(parseFloat(quantity)) ){
        return res.json({status: false, message: "Invalid parameters!"})
    }

    let product = await Product.findByPk(productId)
    if(!product) return res.json({status: false, message: 'Product not found'})

    let created = await Purchase.create({
        product: product._id,
        puchased_quantity: quantity,
        purchased_price_per_peice: pricePerPiece
    })

    return res.json({
        status: true,
        message: "Successfully created!"
    })
}


exports.getAllProductDetails = async (req, res) => {
    const {
        date1,
        date2,
        startPosition,
        maxResults
    } = req.body
    var d1 = date1?.split(/[- :]/);
    var d2 = date2?.split(/[- :]/);

    d1 = d1 && new Date(Date.UTC(d1[0], d1[1]-1, d1[2], d1[3], d1[4], d1[5]));
    d2 = d2 && new Date(Date.UTC(d2[0], d2[1]-1, d2[2], d2[3], d2[4], d2[5]));
    console.log(d1, d2)

    try {
        let filters = {}
        if(date1) filters[Op.gt] = d1
        if(date2) filters[Op.lt] = d2

        let fil = Object.keys(filters).length ? {createdAt: fil} : {}

        let products = await Purchase.findAll({where: fil})

        let _prod = products.slice(startPosition || 0)
        _prod = _prod.slice(0, (maxResults || _prod.length))
        let results = []
        console.log('pppp ', products)
        console.log(_prod)
        for(let i=0; i<_prod.length;i++){
            let product = await Product.findByPk(_prod[i].dataValues.product)
            
            if(product){
                if(results.some(r => r._id == product._id)){
                    let pr = results.findIndex(r => r._id == product._id)
                    results[pr].purchaseResponseDtos.push(_prod[i].dataValues)
                } else {
                    results.push({
                        ...product.dataValues,
                        purchaseResponseDtos: [{..._prod[i].dataValues}]
                    })
                }
            }
            
        }
        let allProducts = await Product.findAll()
        let finalResult = []
        allProducts.forEach(p => {
            if(results.some(r => r._id == p._id)) return finalResult.push(results.find(r => r._id == p._id))
            return finalResult.push({
                ...p.dataValues,
                purchaseResponseDtos: []
            })
        })
        
        return res.json({
            model: finalResult,
            totalCount: finalResult.length,
            responseDto: {
                status: true,
                msg: "Success"
            }
        })

    } catch(e){
        console.log(e)
    }
}