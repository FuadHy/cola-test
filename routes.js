const express = require('express')
const router = express.Router()
const handler = require('./handlers.js')


router.route('/create_purchases/:productId')
    .post(handler.createPurchase)

router.route('/get_all_product_details')
    .post(handler.getAllProductDetails)

module.exports = router