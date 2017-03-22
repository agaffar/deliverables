/**
 * Created by SB004 on 3/21/2017.
 */
var express = require('express');
var router = express.Router();
var products = require('../services/products.service.js')

/* GET users listing. */
router.get('/api/products/searchProduct',products.searchProduct);
router.get('/api/products/getBillDetails',products.getBillDetails);
router.post('/api/products/payBill',products.payBill);

module.exports = router;
