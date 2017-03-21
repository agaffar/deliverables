/**
 * Created by SB004 on 3/21/2017.
 */
var async = require('async');
var mongoose = require('mongoose')
require('mongoose-double')(mongoose);
var fs = require("fs");
var ProductModel=require('./models/productModel/productModel');
var Q = require('q');
mongoose.connect('mongodb://localhost/buyProducts');
var db = mongoose.connection;
var dbCollection = db.collections;
console.log("connected and collections are : "+dbCollection);
//console.log(dbCollection);
console.log("\n *STARTING* \n");
// Get content from file
var contents = fs.readFileSync("./dataset.json");
// Define to JSON type
var jsonContent = JSON.parse(contents);
console.log("length = "+jsonContent.length);
var allProducts = [];
for(var i = 0; i<jsonContent.length; i++){
    var eachProd = jsonContent[i];
    insertProductToModel(eachProd);
}
function insertProductToModel(eachProduct) {
    var newProduct = {};
    //console.log(eachProduct);
    console.log("prod id " + eachProduct.name);
    newProduct.name = eachProduct.name
    newProduct.category = eachProduct.category;
    newProduct.price = eachProduct.price;
    var product = ProductModel(newProduct);
    //console.log(newProduct);
    product.save(function (err) {
        if (err) {
            console.log(err);
            //return err;
        }
        else {
            console.log("products saved");
        }
    });
}