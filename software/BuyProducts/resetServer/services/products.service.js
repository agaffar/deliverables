/**
 * Created by SB004 on 3/21/2017.
 */
var express = require('express');
var productModel = require('../models/productModel/productModel');
var commonUtil = require('./../utils/commonUtils');
var itemModel = require('../models/ItemModel/itemModel');
var billModel = require('../models/billModel/billModel');

var successResponse = require('../models/successResponse');
var errorResponse = require('../models/errorResponse');
var Q = require('q');
var products
products ={
    searchProduct : searchProduct,
    payBill : payBill,
    getBillDetails : getBillDetails

}
function searchProduct(req,res){

    var query = (req.query && req.query.q) ? JSON.parse(req.query.q) : req.body.q;

    var name = query.valueEntered;
    var regex = new RegExp(name,"i");
    productModel.find({name : regex}).exec(function(err,response){
        if(err){
            console.log(err);
            res.send(new errorResponse("error","no query formed properly",err));
        }
        else{
            if(!commonUtil.isEmpty(response)){
                var data = response;
                res.send(new successResponse("ok",data,{},"success"));
            }
            else{
                res.send(new errorResponse("error","no data found",err));
            }
        }
    });


}
function payBill(req,res){
    var query = (req.query && req.query.q) ? JSON.parse(req.query.q) : req.body.q;
    var listItems = query.listItems;
    var promises = [];
    var newBill = new billModel();
    newBill.purchasedBy = query.purchasedBy;
    newBill.purchasedOn = query.purchasedOn;
    newBill.total = query.totalBill;
    newBill.items = [];
    for(var i =0; i<listItems.length; i++){
        var eachItem = listItems[i];
        promises.push(insertEachItem(eachItem, newBill));
    }
    Q.allSettled(promises).then(function(response){
        newBill.save(function(err){
            if(err){
                console.log(err);
                res.send(new errorResponse("error","no query formed properly",err));
            }
            else{
                var data = newBill._id;
                res.send(new successResponse("ok",data,{},"success full bill created for your items"));
            }
        });
    });

}
function getBillDetails(req,res){

    var query = (req.query && req.query.q) ? JSON.parse(req.query.q) : req.body.q;

    var billId = query.billId
    billModel.findOne({_id : billId}).exec(function(err,response){
        if(err){
            console.log(err);
            res.send(new errorResponse("error","no query formed properly",err));
        }
        else{
            if(!commonUtil.isEmpty(response)){
                var data = response;
                res.send(new successResponse("ok",data,{},"success"));
            }
            else{
                res.send(new errorResponse("error","no data found",err));
            }
        }
    });
}
function insertEachItem(eachItem, newBill){
    var defered = Q.defer();
    var itemObj = new itemModel({product : eachItem.product,quantity : eachItem.quantity,
        totalCost : eachItem.totalCost});
    itemObj.save(function(err){
        if(err){
            defered.reject("error");
        }
        else {
            newBill.items.push(itemObj._id);
            defered.resolve();
        }
    })
    return defered.promise;

}


module.exports = products;