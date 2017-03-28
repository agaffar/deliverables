/**
 * Created by SB004 on 3/28/2017.
 */
var personModel = require('../models/person/personModel');
var addressModel = require('../models/address/addressModel');
var errorResponse = require('../models/errorResponse');
var successResponse = require('../models/successResponse');
var userData = {
    getDataSearched : getDataSearched
}
function getDataSearched(req,res){
    var query = (req.query && req.query.q) ? JSON.parse(req.query.q) : req.body.q;
    console.log(query);
    var queryToPerform = [];
    var basicDet = [];
    if(query.fname)
    {
        var fnReg = new RegExp(query.fname,"i");
        basicDet.push({"firstName" : fnReg})
    }
    if(query.lname)
    {
        var lnReg = new RegExp(query.lname,"i");
        basicDet.push({"lastName" : lnReg})
    }
    if(query.dob)
    {
        basicDet.push({"dateOfBirth" : query.dob})
    }
    console.log(basicDet);
     queryToPerform.push({"$match":{ $or : basicDet}},{ "$unwind": "$addresses" },
         {"$lookup":{"from":"address","localField":"addresses","foreignField":"_id","as":"address"}});
    if(query.address){
        queryToPerform.push({"$match":{$or:[{"address.city":query.address}, {"address.street" : query.address},
            {"address.state" : query.address}]}})
    }
    console.log(queryToPerform);
    personModel.aggregate(queryToPerform).exec(function(err,users) {
        if (err) {
            console.log(err);
            res.send(new  errorResponse("error","failed dueto wrong query formation",err));
        } else {
            console.log("users",users)
            res.send(new successResponse("ok",users,{},"successfully data received"));
        }
    });

}
module.exports = userData;